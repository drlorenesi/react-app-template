import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa';
// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// Services
import login from '../api/loginService';
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
            <NavDropdown title='Forms'>
              <NavDropdown.Item as={NavLink} to='/forms/sample-form'>
                Sample Form
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/forms/horizontal-form'>
                Horizontal Form
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to='/forms/form-template'>
                Form Template
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to='/charts'>
              Charts
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to='/about'>
              About
            </Nav.Link>
            <NavDropdown align='end' title={<FaUserCircle size={21} />}>
              <NavDropdown.Item as={NavLink} to='/profile'>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/pass'>
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
