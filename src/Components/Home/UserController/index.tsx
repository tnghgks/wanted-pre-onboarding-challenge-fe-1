import { Container, LogoutBtn } from "./style";

export default function UserController({ handleLogout }: { handleLogout: () => void }) {
  return (
    <Container>
      <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
    </Container>
  );
}
