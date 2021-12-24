import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

function Header() {
    return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand> Zot4Plan </Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="/home"> 
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about"> 
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
    );
  }

export default Header