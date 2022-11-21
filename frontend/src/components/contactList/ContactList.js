import React from "react";
import { UserContext } from "../contexts/context";
import { useSelector, useDispatch } from "react-redux";
import { getContactsAsync } from "../redux/contactsSlice.js";
import "../contactList/ContactList.scss";

function ContactList() {
  const dispatch = useDispatch();
  const getContactsState = useSelector((state) => state.contacts);

  /* Organizando em ordem alfabética pra exibição */
  const contacts = [...getContactsState].sort((contactA, contactB) =>
    contactA.name.localeCompare(contactB.name)
  );

  const {
    addContact,
    revealInformations,
    changeInformationsElements,
    filterContacts,
  } = React.useContext(UserContext);

  const [navbarOpen, setNavBarOpen] = addContact;
  const [menuInformations, setMenuInformations] = revealInformations;
  const [contactsInfo, setContactsInfo] = changeInformationsElements;
  const [getContactstoFilter, setContactstoFilter] = filterContacts;

  React.useEffect(() => {
    dispatch(getContactsAsync());
  }, [dispatch]);

  const handleMenuInformations = (e) => {
    setMenuInformations(!menuInformations);

    const idContact = e.currentTarget.id;

    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id === idContact) {
        const editedContact = {
          id: contacts[i].id,
          firstName: contacts[i].name,
          secondaryName: contacts[i].secondaryName,
          numberContact: contacts[i].number,
          emailContact: contacts[i].email,
        };
        setContactsInfo(editedContact);
      }
    }
  };

  return (
    <div
      className={`box-app__contacts ${
        navbarOpen || menuInformations ? "contacts--overflow-remove" : ""
      }`}
    >
      {getContactstoFilter.length > 0
        ? getContactstoFilter.map((contact) => {
            return (
              <div
                key={contact.id}
                className="box-app__contacts__list"
                id={contact.id}
                onClick={handleMenuInformations}
              >
                <div className="box-app__contacts__initialname">
                  {contact.name[0].toUpperCase()}
                </div>
                <div className="box-app__contacts__name">{contact.name}</div>
              </div>
            );
          })
        : contacts.map((contact) => {
            return (
              <div
                key={contact.id}
                className="box-app__contacts__list"
                id={contact.id}
                onClick={handleMenuInformations}
              >
                <div className="box-app__contacts__initialname">
                  {contact.name[0].toUpperCase()}
                </div>
                <div className="box-app__contacts__name">{contact.name}</div>
              </div>
            );
          })}
    </div>
  );
}

export default ContactList;
