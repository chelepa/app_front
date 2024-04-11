import { useContext } from 'react';
import styles from './Header.module.css'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { NavbarLink } from '../form/NavbarLink';

export const Header = ({ handleLogout }: { handleLogout: any }) => {
    const auth = useContext(AuthContext);

    return (
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <img
              src="https://img.freepik.com/free-vector/branding-ident…rate-logo-vector-design-template_460848-13935.jpg"
              height="50"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavbarLink to="/" value="Home"/>
              {auth.hasPermission(["ADM"]) && <NavbarLink to="/usuarios" value="Usuarios"/>}
              {auth.hasPermission(["ADM"]) && <NavbarLink to="/group" value="Grupo de Permissão"/>}
              {auth.hasPermission(["ADM"]) && <NavbarLink to="/permission" value="Permissao"/>}
              
              {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogout}>Sair Do Sistema</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}