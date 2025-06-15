import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contact.js';
import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);
router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post('/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController));
router.patch('/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController));
router.delete('/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController));

export default router;



// import express from 'express';
// export const contactsRouter = express.Router();

// // GET all contacts
// contactsRouter.get('/', ctrlWrapper(getAllContactsController));

// // GET contact by ID with ID validation
// contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

// // POST new contact with body validation
// contactsRouter.post(
//   '/',
//   validateBody(createContactSchema),
//   ctrlWrapper(createContactController)
// );

// // PATCH contact with ID and body validation
// contactsRouter.patch(
//   '/:contactId',
//   isValidId,
//   validateBody(updateContactSchema),
//   ctrlWrapper(patchContactController)
// );

// // DELETE contact by ID with ID validation
// contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));