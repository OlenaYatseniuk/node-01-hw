const getContacts = require("./contacts");

const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      getContacts.listContacts();
      break;

    case "get":
      getContacts.getContactById(id);
      break;

    case "add":
      getContacts.addContact(name, email, phone);
      break;

    case "remove":
      getContacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

//getContacts.getContactById('7');
