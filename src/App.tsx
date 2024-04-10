import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Private } from './pages/Private';
import { useContext } from 'react';
import { AuthContext } from './contexts/Auth/AuthContext';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';

function App() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
    window.location.href = window.location.href;
  }

  return (
    <div className="App">
      <header className="navbar navbar-expand-lg navbar-light bg-light" id="header"
      >
        <div className="1">
          <Navbar.Brand href="#home">
            <img
              src="https://img.freepik.com/free-vector/branding-ident…rate-logo-vector-design-template_460848-13935.jpg"
              height="50"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
        </div>

        <div className="2">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/private">Pagina Privada</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>

        <div className="3">
          <Button onClick={handleLogout} variant="danger">
            Sair
          </Button>
        </div>
      </header>
      <div id="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/private" element={<Private />} />
        </Routes>
      </div>

      <footer className="footer mt-auto py-3 bg-light">
        <Container>
          <span className="text-muted">{auth.user?.fullName}</span>
        </Container>
      </footer>
    </div>
  );
}

export default App;
