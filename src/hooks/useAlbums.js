import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import api from '../api/apiService';

// 1. Get Albums
const getAlbums = () => {
  return api.get('/albums');
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

// 2. Get Album
const getAlbum = (id) => {
  return api.get(`albums/${id}`);
};

export const useGetAlbum = (
  id,
  enabled = true,
  onSuccess = null,
  onError = null
) => {
  return useQuery(['album', id], () => getAlbum(id), {
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

// 3. Add Album
const addAlbum = (album) => {
  return api.post('/albums', album);
};

export const useAddAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation(addAlbum, {
    // Option A - Traditional
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries('posts');
    //   toast.success('Added new Post!');
    //   console.log(data);
    // },
    // onError: (error) => {
    //   toast.error('Could not add new Album...');
    //   console.log(error);
    // },
    // NOTE: Options B & C will only work if 'albums' has been "populated"
    // Option B - Update 'onSuccess' without sending and additional network request
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
    onMutate: async (data) => {
      await queryClient.cancelQueries('albums');
      const previousData = queryClient.getQueryData('albums');
      queryClient.setQueryData('albums', (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, { id: oldData?.data?.length + 1, ...data }],
        };
      });
      return {
        previousData,
      };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData('albums', context.previousData);
      toast.error('Could not add new Album...');
      console.log(error, data);
    },
    onSettled: () => {
      queryClient.invalidateQueries('albums');
      toast.success('Added new Album!');
    },
  });
};

// 4. Delete Album
const deleteAlbum = (id) => {
  return api.delete(`/albums/${id}`);
};

export const useDeleteAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAlbum, {
    // Option A - Traditional
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries('albums');
    //   toast.success('Album deleted!');
    //   console.log(data);
    // },
    // onError: (error) => {
    //   toast.error('Could not delete Album...');
    //   console.log(error);
    // },
    // NOTE: Options B & C will only work if 'albums' has been "populated"
    // Option B - Update 'onSuccess' without sending and additional network request
    // onSuccess: (data) => {
    //   queryClient.setQueryData('albums', (oldData) => {
    //     return {
    //       ...oldData,
    //       data: [...oldData.data.filter((album) => album.id !== data)],
    //     };
    //   });
    // },
    // onError: (error) => {
    //   toast.error('Could not delete Album...');
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
      toast.error('Could not delete Album...');
      console.log(error, data);
    },
    onSettled: () => {
      queryClient.invalidateQueries('albums');
    },
  });
};
