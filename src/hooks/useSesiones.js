import { useQuery } from 'react-query';
import api from '../api/auth-api';

// 1. Obtener Sesiones
const getSesiones = () => {
  return api.get('/admin/sesiones');
};

export const useGetSesiones = (
  // enabled = true,
  onSuccess = null,
  onError = null
) => {
  return useQuery('sesiones', getSesiones, {
    enabled: true, // Default: true
    cacheTime: 1000 * 60 * 5, // Default: 5 mins
    staleTime: 0, // Default: 0 seconds
    refetchOnMount: true, // Default: true
    refetchOnWindowFocus: true, // Default: true
    // Polling Properties
    refetchInterval: false, // Default: false
    refetchIntervalInBackground: false, // Default: false
    // Success and Error Callbacks
    onSuccess,
    onError,
    // Maintain Data from last successful fetch
    // keepPreviousData: true
  });
};

// 2. Obtener Sesión
const getSesion = (id) => {
  return api.get(`/admin/usuarios/${id}`);
};

export const useGetSesion = (id, onSuccess = null, onError = null) => {
  return useQuery(['sesiones', id], () => getSesion(id), {
    enabled: true, // Default: true
    cacheTime: 1000 * 60 * 5, // Default: 5 mins
    staleTime: 0, // Default: 0 seconds
    refetchOnMount: true, // Default: true
    refetchOnWindowFocus: true, // Default: true
    // Polling Properties
    refetchInterval: false, // Default: false
    refetchIntervalInBackground: false, // Default: false
    // Success and Error Callbacks
    onSuccess,
    onError,
  });
};
