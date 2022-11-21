import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getContactsAsync = createAsyncThunk(
  "contacts/getContactsAsync",
  async () => {
    const resp = await fetch("http://localhost:7000/v1/contatos");
    if (resp.ok) {
      const contacts = await resp.json();
      return { contacts };
    }
  }
);

export const addContactAsync = createAsyncThunk(
  "contacts/addContactAsync",
  async (payload) => {
    const resp = await fetch("http://localhost:7000/v1/contatos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: payload.firstName,
        secondaryName: payload.secondaryName,
        numberContact: payload.numberContact,
        emailContact: payload.emailContact,
      }),
    });

    if (resp.ok) {
      const contact = await resp.json();
      return { contact };
    }
  }
);

export const updateContactAsync = createAsyncThunk(
  "contacts/updateContactAsync",
  async (payload) => {
    const resp = await fetch(
      `http://localhost:7000/v1/contatos/${payload.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: payload.firstName,
          secondaryName: payload.secondaryName,
          numberContact: payload.numberContact,
          emailContact: payload.emailContact,
        }),
      }
    );

    if (resp.ok) {
      const contact = await resp.json();
      console.log(contact);
      return { contact };
    }
  }
);

export const deleteContactAsync = createAsyncThunk(
  "contacts/deleteContactAsync",
  async (payload) => {
    const resp = await fetch(
      `http://localhost:7000/v1/contatos/${payload.id}`,
      {
        method: "DELETE",
      }
    );

    if (resp.ok) {
      return { id: payload.id };
    }
  }
);

export const contactSlice = createSlice({
  name: "contacts",
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      /* const contact = {
        firstName: action.payload.firstName,
        secondaryName: action.payload.secondaryName,
        numberContact: action.payload.numberContact,
        emailContact: action.payload.emailContact,
      };
      state.push(contact); */

      return [...state, action.payload];
    },
    updateContact: (state, action) => {
      const { id, name, secondaryName, email, number } = action.payload.contact;

      const index = state.findIndex(
        (contacts) => contacts.id === action.payload.id
      );

      state[index].name = name;
      state[index].secondaryName = secondaryName;
      state[index].number = number;
      state[index].email = email;
    },
    deleteContact: (state, action) => {
      console.log(action.payload);
      return state.filter((contact) => contact.id !== action.payload);
    },
  },
  extraReducers: {
    [getContactsAsync.fulfilled]: (state, action) => {
      return action.payload.contacts;
    },
    [addContactAsync.fulfilled]: (state, action) => {
      state.push(action.payload.contact);
    },
    [updateContactAsync.fulfilled]: (state, action) => {
      const { id, name, secondaryName, email, number } = action.payload.contact;
      const index = state.findIndex(
        (contact) => contact.id === action.payload.contact.id
      );
      state[index].name = name;
      state[index].secondaryName = secondaryName;
      state[index].number = number;
      state[index].email = email;
    },
    [deleteContactAsync.fulfilled]: (state, action) => {
      return state.filter((contact) => contact.id !== action.payload.id);
    },
  },
});

export const { addContact, updateContact, deleteContact } =
  contactSlice.actions;

export default contactSlice.reducer;
