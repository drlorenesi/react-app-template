import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
});

api.interceptors.response.use(null, (error) => {
  // Handle unexpected errors
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError && !axios.isCancel(error)) {
    // Send error info to logger
    console.error('Enviando información a logger externo...', error);
    // Display error message to user
    toast.error('Se ha producido un error inesperado 😖');
  }
  // Handle expected errors
  // 1. Unauthenticated requests
  if (error.response.status === 401) {
    toast.error('Por favor inicia sesión ⛔');
  }
  // 2. Unauthorized requests
  if (error.response.status === 403) {
    toast.error('No tienes permiso para acceder al recurso 😲');
  }
  return Promise.reject(error);
});

export default api;
