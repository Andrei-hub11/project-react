import React from "react";
import { UserContext } from "../contexts/context";
import { useSelector, useDispatch } from "react-redux";
import { getContactsAsync } from "../redux/contactsSlice.js";
import "../contactList/ContactList.scss";

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  console.log(contacts);

  const { revealInformations, changeInformationsElements } =
    React.useContext(UserContext);

  const [menuInformations, setMenuInformations] = revealInformations;
  const [contactsInfo, setContactsInfo] = changeInformationsElements;

  /* problema a resolver!! contatos não re-renderizam após patch req */
  React.useEffect(() => {
    dispatch(getContactsAsync());
  }, [dispatch]);

  const handleMenuInformations = (e) => {
    setMenuInformations(!menuInformations);

    const idContact = e.currentTarget.id;
    console.log(idContact);
    console.log(menuInformations);

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
    <div className="box-app__contacts">
      {contacts.map((contact) => {
        console.log(contact);
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
