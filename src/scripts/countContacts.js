// export const countContacts = async () => {};

// console.log(await countContacts());
import { readContacts } from '../utils/readContacts.js';

export const countContacts = async () => {
  const contactsList = await readContacts();
  return contactsList.length;
};

console.log(await countContacts());
