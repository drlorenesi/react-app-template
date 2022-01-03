import { Route, Routes } from 'react-router-dom';
// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PrivateOutlet from './components/PrivateOutlet';
// Context
import { useSession } from './context/SessionContext';
// Pages
import Posts from './pages/posts/Posts';
import PostDetails from './pages/posts/PostDetails';
import Albums from './pages/albums/Albums';
import AlbumDetalles from './pages/albums/AlbumDetalles';
import Users from './pages/Users';
import HorizontalForm from './pages/formularios/HorizontalForm';
import SampleForm from './pages/formularios/SampleForm';
import FormTemplate from './pages/formularios/FormTemplate';
import Charts from './pages/Charts';
import Acerca from './pages/Acerca';
import Usuarios from './pages/admin/Usuarios';
import Usuario from './pages/admin/Usuario';
import Sesiones from './pages/admin/Sesiones';
import Perfil from './pages/Perfil';
import Pass from './pages/Pass';
import NoExiste from './pages/NoExiste';
import Inicio from './pages/Inicio';
// Login
import Registro from './pages/login/Registro';
import Gracias from './pages/login/Gracias';
import Verificar from './pages/login/Verificar';
import Login from './pages/login/Login';
import Solicitar from './pages/login/Solicitar';
import Reinicio from './pages/login/Reinicio';
import Enviado from './pages/login/Enviado';
import Exito from './pages/login/Exito';
// Bootstrap
import Container from 'react-bootstrap/Container';

export default function App() {
  const { session } = useSession();

  if (session) {
    return (
      <div className='d-flex flex-column min-vh-100'>
        <Navigation session={session} />
        <Container className='flex-shrink-0 mb-3' fluid>
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/posts/:id' element={<PostDetails />} />
            <Route path='/albums' element={<Albums />} />
            <Route path='/albums/:id' element={<AlbumDetalles />} />
            <Route path='/users' element={<Users />} />
            <Route path='/charts' element={<Charts />} />
            <Route path='/formularios/sample-form' element={<SampleForm />} />
            <Route
              path='/formularios/horizontal-form'
              element={<HorizontalForm />}
            />
            <Route
              path='/formularios/form-template'
              element={<FormTemplate />}
            />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/pass' element={<Pass />} />
            <Route path='/acerca' element={<Acerca />} />
            <Route path='/reinicio' element={<Reinicio />} />
            {/* Private Routes */}
            <Route
              path='/admin'
              element={<PrivateOutlet session={session} roles={[1]} />}
            >
              <Route path='usuarios' element={<Usuarios />} />
              <Route path='usuarios/:id' element={<Usuario />} />
              <Route path='sesiones' element={<Sesiones />} />
            </Route>
            {/* -------------- */}
            <Route path='*' element={<NoExiste />} />
          </Routes>
        </Container>
        <footer className='mt-auto py-3 bg-light'>
          <Footer />
        </footer>
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path='/registro' element={<Registro />} />
        <Route path='/gracias' element={<Gracias />} />
        <Route path='/verificar' element={<Verificar />} />
        <Route path='/login' element={<Login />} />
        <Route path='/solicitar' element={<Solicitar />} />
        <Route path='/enviado' element={<Enviado />} />
        <Route path='/reinicio' element={<Reinicio />} />
        <Route path='/exito' element={<Exito />} />
        <Route path='*' element={<Login />} />
      </Routes>
    );
  }
}
