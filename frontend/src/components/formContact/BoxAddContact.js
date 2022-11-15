import React from "react";
import { UserContext } from "../contexts/context";
import { useFormik } from "formik";
import { basicSchema } from "../../schemas/schemas";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addContactAsync, updateContactAsync } from "../redux/contactsSlice.js";
import "../formContact/BoxAddContact.scss";

function BoxAddContact() {
  const { addContact, changeInformationsElements } =
    React.useContext(UserContext);
  const navigate = useNavigate();

  const [navbarOpen, setNavBarOpen] = addContact;
  const [contactsInfo, setContactsInfo] = changeInformationsElements;
  /* const [menuClose, setCloseMenu] = React.useContext(UserContext); */

  const { id, firstName, secondaryName, numberContact, emailContact } =
    contactsInfo;

  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    if (id) {
      dispatch(
        updateContactAsync({
          id: id,
          firstName: values.name,
          secondaryName: values.secondaryname,
          numberContact: values.phonenumber,
          emailContact: values.email,
        })
      );

      setContactsInfo("");
    } else {
      dispatch(
        addContactAsync({
          firstName: values.name,
          secondaryName: values.secondaryname,
          numberContact: values.phonenumber,
          emailContact: values.email,
        })
      );

      setContactsInfo("");
    }
    setNavBarOpen(!navbarOpen);
    actions.resetForm();
  };

  const handleCloseMenu = () => {
    setNavBarOpen(!navbarOpen);
    setContactsInfo("");
    console.log(contactsInfo);
    errors.name = "";
    errors.secondaryname = "";
    errors.phonenumber = "";
    errors.email = "";
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      secondaryname: "",
      phonenumber: "",
      email: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  console.log(errors.phonenumber);

  return (
    <>
      <div
        className={`box-app__add-contact openmenu ${navbarOpen ? "show" : ""}`}
      >
        <div className="box-nav">
          <div className="menu" onClick={handleCloseMenu}>
            <div className="menu__box">
              <span className="menu__box__line-1"></span>
              <span className="menu__box__line-2"></span>
              <span className="menu__box__line-3"></span>
            </div>
          </div>
          <p className="box-nav__text">
            {id ? "Editar contato" : "Criar contato"}
          </p>

          <button
            className="btn-save"
            id="btn"
            type="submit"
            value="submit"
            form="form1"
            disabled={isSubmitting}
          >
            Salvar
          </button>
        </div>
        <form className="box-app__form" id="form1" onSubmit={handleSubmit}>
          <div className="one box-app__form__control">
            <input
              type="text"
              className="name input-contact"
              id="name"
              placeholder="Nome"
              value={firstName ? (values.name = firstName) : (values.name = "")}
              onChange={
                (handleChange,
                (e) =>
                  setContactsInfo({
                    id: id,
                    firstName: e.currentTarget.value,
                    secondaryName: secondaryName,
                    numberContact: numberContact,
                    emailContact: emailContact,
                  }))
              }
              onBlur={handleBlur}
            />
            <label>Nome</label>
            <small
              className={`box-app__form__control-error ${
                errors.name && touched.name ? "small-error" : ""
              }`}
            >
              {firstName ? errors.name : errors.name}
            </small>
          </div>
          <div className="two box-app__form__control">
            <input
              type="text"
              className="sname input-contact"
              id="secondaryname"
              placeholder="Segundo nome"
              value={`${
                secondaryName
                  ? (values.secondaryname = secondaryName)
                  : (values.secondaryname = "")
              }`}
              onChange={
                (handleChange,
                (e) =>
                  setContactsInfo({
                    id: id,
                    firstName: firstName,
                    secondaryName: e.currentTarget.value,
                    numberContact: numberContact,
                    emailContact: emailContact,
                  }))
              }
              onBlur={handleBlur}
            />
            <label>Segundo nome</label>
            <small
              className={`box-app__form__control-error ${
                errors.secondaryname && touched.secondaryname
                  ? "small-error"
                  : ""
              }`}
            >
              {secondaryName ? errors.secondaryname : errors.secondaryname}
            </small>
          </div>
          <div className="two box-app__form__control">
            <input
              type="number"
              className="number input-contact"
              id="phonenumber"
              placeholder="Número"
              value={`${
                numberContact
                  ? (values.phonenumber = numberContact)
                  : (values.phonenumber = "")
              }`}
              onChange={
                (handleChange,
                (e) =>
                  setContactsInfo({
                    id: id,
                    firstName: firstName,
                    secondaryName: secondaryName,
                    numberContact: e.currentTarget.value,
                    emailContact: emailContact,
                  }))
              }
              onBlur={handleBlur}
            />
            <label>Número</label>
            <small
              className={`box-app__form__control-error ${
                errors.phonenumber && touched.phonenumber ? "small-error" : ""
              }`}
            >
              {numberContact ? errors.phonenumber : errors.phonenumber}
            </small>
          </div>
          <div className="two box-app__form__control">
            <input
              type="email"
              className="email input-contact"
              id="email"
              placeholder="E-mail"
              value={`${
                emailContact
                  ? (values.email = emailContact)
                  : (values.email = "")
              }`}
              onChange={
                (handleChange,
                (e) =>
                  setContactsInfo({
                    firstName: firstName,
                    secondaryName: secondaryName,
                    numberContact: numberContact,
                    emailContact: e.currentTarget.value,
                  }))
              }
              onBlur={handleBlur}
            />
            <label>E-mail</label>
            <small
              className={`box-app__form__control-error ${
                errors.email && touched.email ? "small-error" : ""
              }`}
            >
              {emailContact ? errors.email : errors.email}
            </small>
          </div>
        </form>
      </div>
    </>
  );
}

export default BoxAddContact;
