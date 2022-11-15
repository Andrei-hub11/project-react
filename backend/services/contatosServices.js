const uuid = require("uuid");

const listadeContatos = [
  {
    id: uuid.v4(),
    name: "and",
    secondaryName: "rodri",
    email: "and@gmail.com",
    number: "43657123",
  },
];

const getAllContacts = () => {
  return listadeContatos;
};

const getContactById = (contactId) => {
  return new Promise((resolve, reject) => {
    const user = listadeContatos.find((contact) => contact.id === contactId);
    user
      ? resolve(user)
      : reject({ msg: `Contato com id ${contactId} não foi encontrado` });
  });
};

const addNewContact = (body) => {
  return new Promise((resolve, reject) => {
    const {
      firstName: newContactName,
      secondaryName: secondaryNameUpdate,
      numberContact: newContactNumber,
      emailContact: newContactEmail,
    } = body;
    const newContact = {
      id: uuid.v4(),
      name: newContactName,
      secondaryName: secondaryNameUpdate,
      email: newContactEmail,
      number: newContactNumber,
    };

    if (!newContactName || !newContactEmail) {
      reject({
        msg: `Não foi possível realizar a solicitação. Por favor, verifique se preencheu os campos de nome e email.`,
      });
    } else {
      listadeContatos.push(newContact);

      /*  organizar em ordem alfabética */
      listadeContatos.sort((a, b) => a.name.localeCompare(b.name));
      resolve(newContact);
    }
  });
};

const modifyContactById = (contactId, body) => {
  return new Promise((resolve, reject) => {
    const index = listadeContatos.findIndex(
      (contact) => contact.id === contactId
    );

    for (let i = 0; i < listadeContatos.length; i++) {
      if (listadeContatos[i].id === contactId) {
        const {
          firstName: nameUpdate,
          secondaryName: secondaryNameUpdate,
          numberContact: numberUpdate,
          emailContact: emailUpdate,
        } = body;
        listadeContatos[i].name = nameUpdate
          ? nameUpdate
          : listadeContatos[i].name;
        listadeContatos[i].secondaryName = secondaryNameUpdate
          ? secondaryNameUpdate
          : listadeContatos[i].secondaryName;
        listadeContatos[i].number = numberUpdate
          ? numberUpdate
          : listadeContatos[i].number;
        listadeContatos[i].email = emailUpdate
          ? emailUpdate
          : listadeContatos[i].email;

        /*  organizar em ordem alfabética */
        listadeContatos.sort((a, b) => a.name.localeCompare(b.name));
        resolve(listadeContatos[index]);
      } else if (i === listadeContatos.length - 1) {
        reject({ msg: `Contato com id ${contactId} não foi encontrado` });
      }
    }
  });
};

const deletecontactById = (contactId) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < listadeContatos.length; i++) {
      if (listadeContatos[i].id === contactId) {
        listadeContatos.splice(i, 1);
        listadeContatos.sort((a, b) => a.name.localeCompare(b.name));
        resolve(`Contato deletado com sucesso`);
      } else if (i === listadeContatos.length - 1) {
        reject({ msg: `Contato com id ${contactId} não foi encontrado` });
      }
    }
  });
};

module.exports = {
  getAllContacts,
  getContactById,
  addNewContact,
  modifyContactById,
  deletecontactById,
};
