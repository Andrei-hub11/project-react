import React from "react";
import { UserProvider } from "./components/contexts/context";
import MainContainer from "./components/mainContainer/MainContainer";
import AppVideo from "./components/appVideo/AppVideo";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <>
        <Routes>
          <Route path="/" element={<MainContainer />}></Route>
          <Route path="/video" element={<AppVideo />}></Route>
        </Routes>
      </>
    </UserProvider>
  );
}

export default App;
