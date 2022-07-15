const fs = require('fs');

const dirPath = './data'; // Membuat folder
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json'; // Membuat file
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// Menampilakn data contact
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
};

// Menampilkan detail contact
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    );
    return contact;
};

// Menimpa contacts.json dengan yang baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
};

// Menambah contact baru
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
};

// Cek nama duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama);
};

// Hapus contact
const deleteContact = (nama) => {
    const contacts = loadContact();
    const filteredContacts = contacts.filter(
        (contact) => contact.nama !== nama
    );
    saveContacts(filteredContacts);
};

// Mengubah contact
const updateContacts = (contactBaru) => {
    const contacts = loadContact();
    const filteredContacts = contacts.filter(
        (contact) => contact.nama !== contactBaru.oldNama
    );
    delete contactBaru.oldNama;
    filteredContacts.push(contactBaru);
    saveContacts(filteredContacts);
};

module.exports = {
    loadContact,
    findContact,
    addContact,
    cekDuplikat,
    deleteContact,
    updateContacts,
};
