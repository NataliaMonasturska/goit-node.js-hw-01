console.log("Welcome to Hell");
const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            contacts.listContacts();
            break;

        case "get":
            contacts.getContactById(id);
            break;

        case "add":
            contacts.addContact(name, email, phone);
            break;

        case "remove":
            contacts.removeContact(id)
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

// invokeAction(argv); 

// contacts.listContacts();
// contacts.getContactById(1);
// // contacts.addContact('Артём', 'natalia.mail@meta.ua', '099-244-23-97');
// contacts.removeContact("729a24f10a4")