import { useQuery } from 'react-query';
// import toast from 'react-hot-toast';
import auth from '../api/auth-api';

// 1. Get Roles
const getRoles = () => {
  return auth.get('/roles');
};

export const useGetRoles = (
  // enabled = true,
  onSuccess = null,
  onError = null
) => {
  return useQuery('roles', getRoles, {
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
