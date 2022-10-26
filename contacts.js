import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./db/contacts.json");

async function readContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function writeContacts(newContacts) {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
}

// console the table with all contacts
export async function listContacts() {
  try {
    const contacts = await readContacts();
    console.table(contacts);
  } catch (err) {
    console.error(err.message);
  }
}

// console contact by chosen id
export async function getContactById(contactId) {
  try {
    const contacts = await readContacts();
    const chosenContacts = contacts.find(
      ({ id }) => contactId === id
    );
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
export async function removeContact(contactId) {
  try {
    const contacts = await readContacts();
    const filteredContacts = contacts.filter(
      ({ id }) => contactId !== id
    );
    if (filteredContacts.length === contacts.length) {
      console.log(`Contact with id ${contactId} doesn't exist!`);
      return;
    }
    await writeContacts(filteredContacts);
    console.log(`Contact with id ${contactId} was successfully remowed!`);
    console.table(filteredContacts);
  } catch (err) {
    console.error(err.message);
  }
}

// add new contact
export async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts();
    const isSameContact = contacts.some(
      ({ email: oldEmail }) => oldEmail === email
    );
    if (!isSameContact) {
      const contactToAdd = {
        id: nanoid(),
        name,
        email,
        phone,
      };
      const newContacts = [...contacts, contactToAdd];
      await writeContacts(newContacts);
      console.table(newContacts);
    } else {
      console.error("Error! Such contact has already exist!");
      return;
    }
  } catch (err) {
    console.error(err.message);
  }
}
