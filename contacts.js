const fs = require("fs").promises;
const path = require("path")
const { uid } = require("uid")

const contactsPath = path.join("./db/contacts.json")

async function listContacts() {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
}

async function getContactById(contactId) {
    const id = contactId.toString();
    const contacts = await listContacts();
    const contactByID = contacts.find((contact) => contact.id === id)
    return contactByID || null
}

async function removeContact(contactId) {
    const id = contactId.toString();
    
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    const newContactsJson = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, newContactsJson);
    return result;
}

async function addContact({ name, email, phone }) {
    const contacts = await listContacts();
    const newContact = {
        id: uid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    const newContactsJson = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, newContactsJson)
    return newContact;
}

const contacts = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}

module.exports = contacts;