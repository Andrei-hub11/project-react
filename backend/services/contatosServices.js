const uuid = require("uuid");

const listadeContatos = [
  {
    id: uuid.v4(),
    name: "and",
    secondaryName: "rodri",
    email: "and@gmail.com",
    number: "43657123",
  },
  {
    id: uuid.v4(),
    name: "Deise",
    secondaryName: "dfdbdb",
    email: "deise@gmail.com",
    number: "536753",
  },
  {
    id: uuid.v4(),
    name: "José",
    secondaryName: "rodri",
    email: "and@gmail.com",
    number: "43657234",
  },
  {
    id: uuid.v4(),
    name: "Bruno",
    secondaryName: "aaadaf",
    email: "bruno2018@gmail.com",
    number: "38576396",
  },
  {
    id: uuid.v4(),
    name: "Z",
    secondaryName: "mãe",
    email: "zhatake22@gmail.com",
    number: "4658786",
  },
  {
    id: uuid.v4(),
    name: "gandalf",
    secondaryName: "aaadaf",
    email: "gandalf@gmail.com",
    number: "3435534",
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
