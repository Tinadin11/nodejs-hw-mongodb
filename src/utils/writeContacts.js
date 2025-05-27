import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';


export const writeContacts = async (updatedContacts) => {
  fs.writeFile(PATH_DB, JSON.stringify(updatedContacts, null, 2));
};
