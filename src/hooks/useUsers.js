import { useQuery } from 'react-query';
// import toast from 'react-hot-toast';
import axios from 'axios';

// 1. Get Users
const getUsers = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
};

export const useGetUsers = (
  enabled = true,
  onSuccess = null,
  onError = null
) => {
  return useQuery('users', getUsers, {
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

// 2. Get User
const getUser = (id) => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
};

export const useGetUser = (id, onSuccess = null, onError = null) => {
  return useQuery(['user', id], () => getUser(id), {
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
