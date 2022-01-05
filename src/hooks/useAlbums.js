import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import axios from 'axios';

// 1. Obtener Albums
const getAlbums = () => {
  return axios.get('https://jsonplaceholder.typicode.com/albums');
};

export const useGetAlbums = (
  enabled = true,
  onSuccess = null,
  onError = null
) => {
  return useQuery('albums', getAlbums, {
    enabled, // Default: true
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

// 2. Obtener Album
const getAlbum = (id) => {
  return axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`);
};

export const useGetAlbum = (
  id,
  enabled = true,
  onSuccess = null,
  onError = null
) => {
  return useQuery(['albums', id], () => getAlbum(id), {
    enabled, // Default: true
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
    retry: (failureCount, err) =>
      err?.response?.status === 404 && failureCount < 1 ? true : false,
    // Maintain Data from last successful fetch
    // keepPreviousData: true
  });
};

// 3. Actualizar Album (invalidateQueries 'albums'????)
const putAlbum = ({ id, values }) => {
  return axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`, values);
};

export const usePutAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation(putAlbum, {
    // Opcion A - Tradicional
    onSuccess: (data) => {
      queryClient.invalidateQueries(['albums', `${data.data.id}`]);
      toast.success('Album actualizado!');
    },
    onError: (error) => {
      toast.error('No fue posible actualizar album.');
    },
    // NOTA: Opciones B & C serviran únicamente si el 'recurso' ha sido "poblado"
    // Opción B - Actualizar después de 'onSuccess' (sin enviar una solicitud de red adicional)
    // onSuccess: (data) => {
    //   queryClient.setQueryData(['albums', `${data.data.id}`], (oldData) => {
    //     return {
    //       ...oldData,
    //       data: data.data,
    //     };
    //   });
    //   toast.success('Album actualizado!');
    // },
    // onError: (error) => {
    //   toast.error('No fue posible actualizar album.');
    // },
    // Opción C - Optimistic update
    // Usa valores pasados a 'updateAlbum({ id, values })'
    // onMutate: async (data) => {
    //   await queryClient.cancelQueries(['albums', `${data.id}`]);
    //   const previousData = queryClient.getQueryData(['albums', `${data.id}`]);
    //   queryClient.setQueryData(['albums', `${data.id}`], (oldData) => {
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
    //   queryClient.setQueryData(['albums', `${data.id}`], context.previousData);
    //   toast.error('No fue posible actualizar album.'); // revisar cual va primero
    // },
    // onSettled: (data) => {
    //   queryClient.invalidateQueries(['albums', `${data.data.id}`]);
    //   toast.success('Album actualizado!');
    // },
  });
};

// 4. Agregar Album
const addAlbum = (album) => {
  return axios.post('https://jsonplaceholder.typicode.com/albums/', album);
};

export const useAddAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation(addAlbum, {
    // Option A - Traditional
    onSuccess: (data) => {
      queryClient.invalidateQueries('posts');
      toast.success('Added new Album!');
    },
    onError: (error) => {
      toast.error('Could not add new Album...');
    },
    // NOTA: Opciones B & C serviran únicamente si el 'recurso' ha sido "poblado"
    // Opción B - Actualizar después de 'onSuccess' (sin enviar una solicitud de red adicional)
    // onSuccess: (data) => {
    //   queryClient.setQueryData('albums', (oldData) => {
    //     return {
    //       ...oldData,
    //       data: [...oldData.data, data.data],
    //     };
    //   });
    //   toast.success('Added new Album!');
    // },
    // onError: (error) => {
    //   toast.error('Could not add new Album...');
    //   console.log(error);
    // },
    // Option C - Optimistic update
    // onMutate: async (data) => {
    //   await queryClient.cancelQueries('albums');
    //   const previousData = queryClient.getQueryData('albums');
    //   queryClient.setQueryData('albums', (oldData) => {
    //     return {
    //       ...oldData,
    //       data: [...oldData.data, { id: oldData?.data?.length + 1, ...data }],
    //     };
    //   });
    //   return {
    //     previousData,
    //   };
    // },
    // onError: (error, data, context) => {
    //   queryClient.setQueryData('albums', context.previousData);
    //   toast.error('No fue posible agregar album.');
    //   console.log(error, data);
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries('albums');
    //   toast.success('Nuevo album agregado!');
    // },
  });
};

// 5. Eliminar Album
const deleteAlbum = (id) => {
  return axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
};

export const useDeleteAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAlbum, {
    // Option A - Traditional
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries('albums');
    //   toast.success('Album eliminado!');
    //   console.log(data);
    // },
    // onError: (error) => {
    //   toast.error('No fue posible eliminar album.');
    //   console.log(error);
    // },
    // NOTA: Opciones B & C serviran únicamente si el 'recurso' ha sido "poblado"
    // Opción B - Actualizar después de 'onSuccess' (sin enviar una solicitud de red adicional)
    // onSuccess: (data) => {
    //   queryClient.setQueryData('albums', (oldData) => {
    //     return {
    //       ...oldData,
    //       data: [...oldData.data.filter((album) => album.id !== data)],
    //     };
    //   });
    // },
    // onError: (error) => {
    //   toast.error('No fue posible eliminar album.');
    //   console.log(error);
    // },
    // Option C - Optimistic delete
    onMutate: async (data) => {
      await queryClient.cancelQueries('albums');
      const previousData = queryClient.getQueryData('albums');
      queryClient.setQueryData('albums', (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data.filter((album) => album.id !== data)],
        };
      });
      return {
        previousData,
      };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData('albums', context.previousData);
      toast.error('No fue posible eliminar album.');
    },
    onSettled: () => {
      queryClient.invalidateQueries('albums');
    },
  });
};
