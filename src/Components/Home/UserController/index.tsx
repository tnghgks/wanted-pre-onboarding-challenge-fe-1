import { useNavigate } from "react-router-dom";
import { Container, LogoutBtn } from "./style";

export default function UserController() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container>
      <LogoutBtn onClick={handleLogout}>๋ก๊ทธ์์</LogoutBtn>
    </Container>
  );
}
