import createHttpError from 'http-errors';
import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} from '../services/contacts.js';

import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

// отримую всі контакти
export const getAllContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user.id;

    const contacts = await getAllContacts({
        page, perPage, sortBy, sortOrder, filter, userId,
    });

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
            data: contacts,
    });
};

// отримую контакт по ID
export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId, req.user.id);
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    };

// новий контакт
export const createContactController = async (req, res) => {
    const photo = req.file;
    let photoUrl = null;
    if (photo) {
            photoUrl = await saveFileToCloudinary(photo);
    }
    const contact = await createContact({...req.body, userId: req.user.id, photo: photoUrl, });
    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
    });
};

// оновлюю (PATCH) контакт
export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const photo = req.file;
    let photoUrl;
    if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
    }
    //   дозволені поля
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
       const updateData = {
           name,
           phoneNumber,
           email,
           isFavourite,
           contactType,
           photo
       };

    if (photoUrl) {
      updateData.photo = photoUrl;
    }
    const result = await updateContact(contactId, updateData, req.user.id);
    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.json({
        status: 200,
	message: "Successfully patched a contact!",
	data: result,
    });
};

// видаляю контакт
export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId, req.user.id);
    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

// import createHttpError from 'http-errors';
// import {
//     getAllContacts,
//     getContactById,
//     createContact,
//     updateContact,
//     deleteContact
// } from '../services/contacts.js';

// import { parsePaginationParams } from "../utils/parsePaginationParams.js";
// import { parseSortParams } from "../utils/parseSortParams.js";
// import { parseFilterParams } from "../utils/parseFilterParams.js";

// import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

// // отримую всі контакти
// export const getAllContactsController = async (req, res) => {
//     const { page, perPage } = parsePaginationParams(req.query);
//     const { sortBy, sortOrder } = parseSortParams(req.query);
//     const filter = parseFilterParams(req.query);
//     const userId = req.user.id;

//     const contacts = await getAllContacts({
//         page, perPage, sortBy, sortOrder, filter, userId,
//     });

//     res.json({
//         status: 200,
//         message: 'Successfully found contacts!',
//             data: contacts,
//     });
// };

// // отримую контакт по ID
// export const getContactByIdController = async (req, res) => {
//     const { contactId } = req.params;
//     const contact = await getContactById(contactId, req.user.id);
//     if (!contact) {
//         throw createHttpError(404, 'Contact not found');
//     }
//         res.status(200).json({
//             status: 200,
//             message: `Successfully found contact with id ${contactId}!`,
//             data: contact,
//         });
//     };

// // новий контакт
// export const createContactController = async (req, res) => {
//     const photo = req.file;
//     let photoUrl = null;
//     if (photo) {
//             photoUrl = await saveFileToCloudinary(photo);
//     }
//     const contact = await createContact({...req.body, userId: req.user.id, photo: photoUrl, });
//     res.status(201).json({
//         status: 201,
//         message: `Successfully created a contact!`,
//         data: contact,
//     });
// };

// // оновлюю (PATCH) контакт
// export const patchContactController = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const photo = req.file;

//     let photoUrl = null;
//     if (photo) {
//       photoUrl = await saveFileToCloudinary(photo);
//     }

//     const updateData = {
//       ...req.body,
//     };

//     if (photoUrl) {
//       updateData.photo = photoUrl;
//     }

//     const updatedContact = await updateContact(contactId, updateData);

//     if (!updatedContact) {
//       return next(createHttpError(404, 'Contact not found'));
//     }

//     res.json({
//       status: 200,
//       message: "Successfully patched a contact!",
//       data: updatedContact,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // видаляю контакт
// export const deleteContactController = async (req, res, next) => {
//     const { contactId } = req.params;
//     const contact = await deleteContact(contactId, req.user.id);
//     if (!contact) {
//         next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   res.status(204).send();
// };

