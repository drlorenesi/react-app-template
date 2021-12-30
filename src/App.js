import { Route, Routes } from 'react-router-dom';
// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
// Context
import { useSession } from './context/SessionContext';
// Pages
import Posts from './pages/posts/Posts';
import PostDetails from './pages/posts/PostDetails';
import Albums from './pages/albums/Albums';
import AlbumDetails from './pages/albums/AlbumDetails';
import Users from './pages/Users';
import HorizontalForm from './pages/formularios/HorizontalForm';
import SampleForm from './pages/formularios/SampleForm';
import FormTemplate from './pages/formularios/FormTemplate';
import Charts from './pages/Charts';
import Acerca from './pages/Acerca';
import Perfil from './pages/Perfil';
import Pass from './pages/Pass';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
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
        <Navigation />
        <Container className='flex-shrink-0 mb-3' fluid>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/posts/:id' element={<PostDetails />} />
            <Route path='/albums' element={<Albums />} />
            <Route path='/albums/:id' element={<AlbumDetails />} />
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
            <Route path='*' element={<NotFound />} />
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
