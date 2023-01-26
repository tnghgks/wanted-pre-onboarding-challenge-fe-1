import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/index";
import Login from "../Components/Login/index";
import Register from "../Components/Register/index";
import ToDoDetail from "../Components/ToDoDetail/index";
import ProtectedRoute from "../Components/HOC/ProtectedRoute";
import useTokenCheck from "../Hooks/Auth/useTokenCheck";
import { GlobalStyled } from "../Components/GlobalStyled";

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
