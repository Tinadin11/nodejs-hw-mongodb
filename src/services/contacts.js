import { ContactsCollection } from '../models/contacts.js';
import createError from 'http-errors';

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    // console.log('contacts from DB:', contacts);
    return contacts;
};
export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (contactData) => {
  const newContact = await ContactsCollection.create(contactData);
  return newContact;
};

export const updateContact = async (contactId, updateData) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    updateData,
    { new: true }
  );
  if (!updatedContact) {
    throw createError(404, 'Contact not found... 😑');
  }
  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await ContactsCollection.findByIdAndDelete(contactId);
  if (!deletedContact) {
    throw createError(404, 'Contact not found... 😑');
  }
    return deletedContact;
};
