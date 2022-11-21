import React from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [navOpen, setNavOpen] = React.useState(false);
  const [informations, setInformations] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [element, setElement] = React.useState("");
  const [contactData, setContactData] = React.useState({
    id: "",
    firstName: "",
    secondaryName: "",
    numberContact: "",
    emailContact: "",
  });
  const [filter, setFilter] = React.useState([]);

  return (
    <UserContext.Provider
      value={{
        addContact: [navOpen, setNavOpen],
        revealInformations: [informations, setInformations],
        revealSecondaryMenu: [secondary, setSecondary],
        getElementMenuSecondary: [element, setElement],
        changeInformationsElements: [contactData, setContactData],
        filterContacts: [filter, setFilter],
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
