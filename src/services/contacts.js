import { ContactsCollection } from '../models/contacts.js';
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";
import createError from 'http-errors';

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
  sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
  filter = {},
  userId,
}) => {

    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find({userId});
    // if (filter.isFavourite) {
    //     contactsQuery.where('isFavourite').equals(filter.isFavourite);
    // }

  if (filter.isFavourite !== undefined) {
  contactsQuery.where('isFavourite').equals(filter.isFavourite);
}

    // if (filter.contactType) {
    //     contactsQuery.where('contactType').equals(filter.contactType);
    // }
  if (filter.contactType !== undefined) {
  contactsQuery.where('contactType').equals(filter.contactType);
}

    const [contactsCount, contacts] = await Promise.all([
        ContactsCollection.find().merge(contactsQuery).countDocuments(),
        contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec(),
    ]);
        const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };
};
export const getContactById = async (contactId, userId) => {
    const contact = await ContactsCollection.findOne({ _id: contactId, userId });
    return contact;
};

export const createContact = async (contactData) => {
  const newContact = await ContactsCollection.create(contactData);
  return newContact;
};

export const updateContact = async (contactId, updateData, userId ) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate({ _id: contactId, userId },
    updateData,
    { new: true }
  );

  if (!updatedContact) {
    throw createError(404, 'Contact not found... 😑');
  }
  return updatedContact;
};

export const deleteContact = async (contactId, userId) => {
  const deletedContact = await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
  if (!deletedContact) {
    throw createError(404, 'Contact not found... 😑');
  }
    return deletedContact;
};

