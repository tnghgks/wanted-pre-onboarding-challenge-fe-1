import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/index";
import Login from "../Pages/Login/index";
import Register from "../Pages/Register/index";
import ToDoDetail from "../Pages/ToDoDetail/index";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import ProtectedRoute from "../Utils/ProtectedRoute";
import useTokenCheck from "../Hooks/useTokenCheck";

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
  const { isToken } = useTokenCheck();

  return (
    <BrowserRouter>
      <GlobalStyled />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute isToken={isToken}>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path=":id" element={<ToDoDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
