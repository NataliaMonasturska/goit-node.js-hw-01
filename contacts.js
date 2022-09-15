const fs = require("fs").promises;
const path = require("path")
const { uid } = require("uid")

// Создай переменную contactsPath и запиши в нее путь к файле contacts.json. Для составления пути используй методы модуля path.



const contactsPath = "./db/contacts.json";



// TODO: задокументировать каждую функцию
async function listContacts() {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    console.log(contacts);
    return contacts;
}

async function getContactById(contactId) {
    const id = contactId.toString();
    const contacts = await fs.readFile(contactsPath, "utf-8");
    // console.log(JSON.parse(contacts));
    const contactByID = JSON.parse(contacts).filter((contact) => contact.id === id)
    console.log(contactByID);
    return contactByID
}

async function removeContact(contactId) {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    console.log(contacts);
    const contactsParse = JSON.parse(contacts);
    console.log(contactsParse );
    const newContacts = contactsParse.filter((contact) => contact.id !== contactId);
    console.log(newContacts);
    const cotactsNew = await fs.writeFile(contactsPath, newContacts)
}

async function addContact(name, email, phone) {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const contactsParse = JSON.parse(contacts);
    const newContact = {
        id: uid(),
        name,
        email,
        phone
    };
    const newContacts = [...contactsParse, newContact]
    const newContactsJson = JSON.stringify(newContacts);
    const cotactsNew = await fs.writeFile(contactsPath, newContactsJson)
}



const contacts = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}


module.exports = contacts;