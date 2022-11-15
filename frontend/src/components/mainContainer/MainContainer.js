import React from "react";
import ContactInformations from "../contactInformations/ContactInformations";
import ContactList from "../contactList/ContactList";
import { UserContext } from "../contexts/context";
import { useSelector, useDispatch } from "react-redux";
import { filterContact, deleteContactAsync } from "../redux/contactsSlice.js";
import BoxAddContact from "../formContact/BoxAddContact";
import "../mainContainer/mainContainer.scss";

function MainContainer() {
  const dispatch = useDispatch();
  const {
    addContact,
    revealInformations,
    revealSecondaryMenu,
    getElementMenuSecondary,
    changeInformationsElements,
  } = React.useContext(UserContext);

  const contacts = useSelector((state) => state.contacts);

  const [navbarOpen, setNavBarOpen] = addContact;
  const [menuInformations, setMenuInformations] = revealInformations;
  const [contactsInfo, setContactsInfo] = changeInformationsElements;
  const [menuSecondary, setMenuSecondary] = revealSecondaryMenu;
  const [elementMenuSecondary, setElementMenuSecondary] =
    getElementMenuSecondary;

  const { id } = contactsInfo;

  const handleToggle = () => {
    setNavBarOpen(!navbarOpen);
  };

  const handleDeleteContact = () => {
    dispatch(
      deleteContactAsync({
        id,
      })
    );
    setMenuInformations(!menuInformations);
    setContactsInfo("");
  };
  console.log(contacts);

  document.addEventListener("click", (e) => {
    console.log(elementMenuSecondary);
    if (elementMenuSecondary === "") {
      return;
    }
    const isCloset = e.composedPath().includes(elementMenuSecondary);
    if (!isCloset) {
      setMenuSecondary(!menuSecondary);
      setElementMenuSecondary("");
    }
  });

  return (
    <>
      <section className={"mainBox"}>
        <div
          className={`box-app ${
            navbarOpen || menuInformations ? "remove--overflow" : ""
          }`}
        >
          <div className="box-app__modal">
            <input className="box-app__modal-input" type="text" />
          </div>
          <BoxAddContact />
          <ContactList />
          <ContactInformations />
          <div className="box-app__button-add" onClick={handleToggle}>
            +
          </div>
          <div
            className={`second-menu__informations ${
              menuSecondary ? "show-menu__information " : ""
            }`}
          >
            <ul className="nav">
              <li className="nav__li" onClick={handleDeleteContact}>
                Excluir contato
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainContainer;
