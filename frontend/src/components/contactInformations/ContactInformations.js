import React from "react";
import { UserContext } from "../contexts/context";

import { Link } from "react-router-dom";
import IconArrow from "../images/bx-left-arrow-alt.svg";
import IconPencil from "../images/bxs-pencil.svg";
import IconDots from "../images/bx-dots-vertical-rounded.svg";
import IconPhone from "../images/bx-phone.svg";
import IconMessage from "../images/bxs-chat.svg";
import IconVideo from "../images/bx-video.svg";
import "../contactInformations/ContactInformations.scss";

function ContactInformations() {
  const {
    addContact,
    revealInformations,
    changeInformationsElements,
    revealSecondaryMenu,
    getElementMenuSecondary,
  } = React.useContext(UserContext);

  const [navbarOpen, setNavBarOpen] = addContact;
  const [menuInformations, setMenuInformations] = revealInformations;
  const [contactsInfo, setContactsInfo] = changeInformationsElements;
  const [menuSecondary, setMenuSecondary] = revealSecondaryMenu;
  const [elementMenuSecondary, setElementMenuSecondary] =
    getElementMenuSecondary;

  console.log(menuInformations);

  const { id, firstName, secondaryName, numberContact, emailContact } =
    contactsInfo;

  const handleMenuInformations = () => {
    setMenuInformations(!menuInformations);
    setContactsInfo("");
  };

  const handleMenuSecondary = (e) => {
    setMenuSecondary(!menuSecondary);
    const IconDots = e.target;
    setElementMenuSecondary(IconDots);
  };

  const handleEditContact = () => {
    setNavBarOpen(!navbarOpen);
    setMenuInformations(!menuInformations);
    setContactsInfo(contactsInfo);
  };

  return (
    <div
      className={`box-app__informations ${
        menuInformations ? "showInformations" : ""
      }`}
    >
      <div className=" box-app__informations__container" id={id}>
        <div className="menu" id="menu2">
          <img
            src={IconArrow}
            alt=""
            className="icon--styles"
            onClick={handleMenuInformations}
          />
        </div>
        <div className="box-icon">
          <img
            src={IconPencil}
            alt=""
            className="icon--styles"
            onClick={handleEditContact}
          />
          <img
            src={IconDots}
            alt=""
            className="icon--styles"
            onClick={handleMenuSecondary}
          />
        </div>
      </div>
      <div className="box-app__informations__container-name">
        {firstName ? firstName[0].toUpperCase() : ""}
      </div>
      <div className="box-app__informations__container-option">
        <div className="box-app__informations__container-optionIcons">
          <img src={IconPhone} alt="" className="icon--styles" />
          <p className="box-app__informations__container-optionP">Chamada</p>
        </div>
        <div className="box-app__informations__container-optionIcons">
          <img src={IconMessage} alt="" className="icon--styles" />
          <p className="box-app__informations__container-optionP">Sms</p>
        </div>
        <div className="box-app__informations__container-optionicons">
          <Link to="/video">
            {" "}
            <img src={IconVideo} alt="" className="icon--styles" />
          </Link>
          <p className="box-app__informations__container-optionP">Vídeo</p>
        </div>
      </div>
      <div className="box-app__informations__contact">
        <p className="box-app__informations__contactP">
          Informações do contato
        </p>
        <div className="box-app__informations__contactIcons">
          <div className="box-app__informations__modals">
            <img
              src={IconPhone}
              alt=""
              className="icon--styles icon--smaller"
            />
            <p className=" box-app__informations__modalsP number-info ">
              {numberContact}
            </p>
          </div>
          <div className="box-app__informations__modals">
            <img
              src={IconMessage}
              alt=""
              className="icon--styles icon--smaller"
            />
            <p className="box-app__informations__modalsP email-info">
              {emailContact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInformations;
