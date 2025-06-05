import { ContactsCollection } from '../models/contacts.js';

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    // console.log('contacts from DB:', contacts);
    return contacts;
};
export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};