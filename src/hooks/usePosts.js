import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import axios from 'axios';

// 1. Get Posts
const getPosts = () => {
  return axios.get('https://jsonplaceholder.typicode.com/posts');
};

export const useGetPosts = (
  enabled = true,
  onSuccess = null,
  onError = null
) => {
  return useQuery('posts', getPosts, {
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

// 2. Add Post
const addPost = (post) => {
  return axios.post('https://jsonplaceholder.typicode.com/posts', post);
};

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation(addPost, {
    onSuccess: (data) => {
      toast.success('Added new Post!');
      queryClient.invalidateQueries('posts');
      console.log(data);
    },
    onError: (error) => {
      toast.error('Could not add new Post...');
      console.log(error);
    },
  });
};
