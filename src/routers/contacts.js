import express from 'express';
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

export const contactsRouter = express.Router();

// GET all contacts
contactsRouter.get('/', ctrlWrapper(getAllContactsController));

// GET contact by ID with ID validation
contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

// POST new contact with body validation
contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);

// PATCH contact with ID and body validation
contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)
);

// DELETE contact by ID with ID validation
contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));