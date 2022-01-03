import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import api from '../api/auth-api';

// 1. Obtener Usuarios
const getUsuarios = () => {
  return api.get('/admin/usuarios');
};

export const useGetUsuarios = (
  // enabled = true,
  onSuccess = null,
  onError = null
) => {
  return useQuery('usuarios', getUsuarios, {
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

// 2. Obtener Usuario
const getUsuario = (id) => {
  return api.get(`/admin/usuarios/${id}`);
};

export const useGetUsuario = (id, onSuccess = null, onError = null) => {
  return useQuery(['usuarios', id], () => getUsuario(id), {
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

// 3. Actualizar Usuario (invalidateQueries 'usuarios'????)
const putUsuario = ({ id, values }) => {
  return api.put(`/admin/usuarios/${id}`, values);
};

export const usePutUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation(putUsuario, {
    // Opcion A - Tradicional
    onSuccess: (data) => {
      queryClient.invalidateQueries(['usuarios', `${data.data.id}`]);
      toast.success('Usuario actualizado!');
    },
    onError: (error) => {
      toast.error('No fue posible actualizar a usuario.');
    },
    // NOTA: Opciones B & C serviran únicamente si el 'recurso' ha sido "poblado"
    // Opción B - Actualizar después de 'onSuccess' (sin enviar una solicitud de red adicional)
    // onSuccess: (data) => {
    //   queryClient.setQueryData(['usuarios', `${data.data.id}`], (oldData) => {
    //     return {
    //       ...oldData,
    //       data: data.data,
    //     };
    //   });
    //   toast.success('Album actualizado!');
    // },
    // onError: (error) => {
    //   toast.error('No fue posible actualizar a usuario.');
    // },
    // Opción C - Optimistic update
    // Usa valores pasados a 'updateUsuario({ id, values })'
    // onMutate: async (data) => {
    //   await queryClient.cancelQueries(['usuarios', `${data.id}`]);
    //   const previousData = queryClient.getQueryData(['usuarios', `${data.id}`]);
    //   queryClient.setQueryData(['usuarios', `${data.id}`], (oldData) => {
    //     return {
    //       ...oldData,
    //       data: data.values,
    //     };
    //   });
    //   return {
    //     previousData,
    //   };
    // },
    // onError: (error, data, context) => {
    //   queryClient.setQueryData(['usuarios', `${data.id}`], context.previousData);
    //   toast.error('No fue posible actualizar a usuario.'); // revisar cual va primero
    // },
    // onSettled: (data) => {
    //   queryClient.invalidateQueries(['usuarios', `${data.data.id}`]);
    //   toast.success('Usuario actualizado!');
    // },
  });
};
