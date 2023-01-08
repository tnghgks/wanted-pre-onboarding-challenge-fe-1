import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ToDoDetail from "../Pages/ToDoDetail/ToDoDetail";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyled = createGlobalStyle`
${reset}

button{
  border:none;
  border-radius: 10px;
  background-color: #008CBA;
  color:white;
  padding: 10px 10px;
  font-weight: 700;
  cursor: pointer;
}
a{
  color:inherit;
}
a:hover{
  color:#FFE5F1;
}
`;

export default function Router() {
  return (
    <BrowserRouter>
      <GlobalStyled />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Home />}>
          <Route path=":id" element={<ToDoDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
