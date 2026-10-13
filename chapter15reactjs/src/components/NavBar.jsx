import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-success">
          🌿 Orchid Management V5
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Danh sách Lan</Nav.Link>
          <Nav.Link as={Link} to="/orchids/new">Thêm mới</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
