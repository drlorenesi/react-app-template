import axios from 'axios';
import toast from 'react-hot-toast';

const auth = axios.create({
  baseURL: process.env.REACT_APP_AUTH,
  withCredentials: true,
});

auth.interceptors.response.use(null, (error) => {
  // Manejar errores inesperados
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError && !axios.isCancel(error)) {
    // Mostrar menaje de error al usuario
    toast.error('Lo sentimos, ocurrió un error inesperado 😖');
    // Enviar información de error a administrador
    console.error('Enviando error a administrador...', error);
  }
  // Manejar errores esperados
  // 1. Solicitudes no autenticadas
  if (error.response.status === 401) {
    toast.error('Por favor inicia sesión');
    setTimeout(() => {
      localStorage.removeItem('sessionInfo');
      window.location.assign('/login');
    }, 1000);
  }
  // 2. Solicitudes no autorizadas
  if (error.response.status === 403) {
    toast.error('No tienes permiso para acceder al recurso');
    setTimeout(() => {
      window.location.assign('/');
    }, 1000);
  }
  return Promise.reject(error);
});

export default auth;
