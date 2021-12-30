import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa';
// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// Services
import login from '../api/login-api';
// Test Login
import { useSession } from '../context/SessionContext';

export default function Navigation() {
  const { setSession } = useSession();

  const navigate = useNavigate();

  const handleLogout = async () => {
    setSession(null);
    await login.get('/logout');
    navigate('/login');
  };

  return (
    <Navbar
      bg='light'
      expand='sm'
      sticky='top'
      className='shadow-sm rounded mb-2'
    >
      <Container fluid>
        {/* "Link" in brand component since no stlying is needed */}
        <Navbar.Brand as={Link} to='/'>
          <FaHome />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to='/posts'>
              Posts
            </Nav.Link>
            <Nav.Link as={NavLink} to='/albums'>
              Albums
            </Nav.Link>
            <Nav.Link as={NavLink} to='/users'>
              Users
            </Nav.Link>
            <NavDropdown title='Formularios'>
              <NavDropdown.Item as={NavLink} to='/formularios/sample-form'>
                Sample Form
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/formularios/horizontal-form'>
                Horizontal Form
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to='/formularios/form-template'>
                Form Template
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to='/charts'>
              Charts
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to='/acerca'>
              Acerca de
            </Nav.Link>
            <NavDropdown align='end' title={<FaUserCircle size={21} />}>
              <NavDropdown.Item as={NavLink} to='/perfil'>
                Mi Perfil
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/pass'>
                Cambiar Contraseña
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
