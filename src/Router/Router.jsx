import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ToDoDetail from "../Pages/ToDoDetail/ToDoDetail";

export default function Router() {
  return (
    <BrowserRouter>
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
