import axios from 'axios';
import toast from 'react-hot-toast';

const login = axios.create({
  baseURL: process.env.REACT_APP_AUTH,
  withCredentials: true,
});

login.interceptors.response.use(null, (error) => {
  // Handle unexpected errors
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError && !axios.isCancel(error)) {
    toast.error('Se ha producido un error inesperado 😖');
    // Send info to logger
    console.log('Enviando información a registro...', error);
  }
  return Promise.reject(error);
});

export default login;
