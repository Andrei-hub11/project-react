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

  return (
    <UserContext.Provider
      value={{
        addContact: [navOpen, setNavOpen],
        revealInformations: [informations, setInformations],
        revealSecondaryMenu: [secondary, setSecondary],
        getElementMenuSecondary: [element, setElement],
        changeInformationsElements: [contactData, setContactData],
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
