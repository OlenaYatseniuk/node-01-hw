const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function readContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

// console the table with all contacts
async function listContacts() {
  try {
    const contacts = await readContacts();
    console.table(contacts);
  } catch (err) {
    console.error(err.message);
  }
}

// console contact by chosen id
async function getContactById(contactId) {
  try {
    const contacts = await readContacts();
    const chosenContacts = contacts.find(({ id }) => contactId.toString() === id);
    if (chosenContacts) {
      console.table(chosenContacts);
      return chosenContacts;
    } else {
      console.error("Such contact doesn't exist!");
    }
  } catch (err) {
    console.error(err.message);
  }
}

// remove contact by id
function removeContact(contactId) {
  // ...твой код
}
// add new contact
function addContact(name, email, phone) {
  // ...твой код
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
