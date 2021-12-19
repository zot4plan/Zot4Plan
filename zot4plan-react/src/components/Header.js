import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from 'react-bootstrap';

function Header() {
    return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          Zot4Plan
        </Navbar.Brand>
      </Container>
    </Navbar>
    );
  }

export default Header