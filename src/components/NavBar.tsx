import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";

const NavBar = () => {
  return <>
    <Navbar className="bg-body-primary">
      <Container>
        <Navbar.Brand>Brand</Navbar.Brand>
        <Button className="btn btn-primary">click me</Button>
      </Container>
    </Navbar>
  </>
}

export default NavBar;
