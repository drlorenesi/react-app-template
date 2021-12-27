import { useQuery } from 'react-query';

import auth from '../api/authService';

// 1. Get Profile
const getPerfil = () => {
  return auth.get('/perfil');
};

export const useGetProfile = (
  // enabled = true,
  onSuccess = null,
  onError = null
) => {
  return useQuery('perfil', getPerfil, {
    // enabled, // Default: true
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
      err?.response?.status === (401 && 403) && false,
    // Maintain Data from last successful fetch
    // keepPreviousData: true
  });
};
