import { useGetProfile } from '../../hooks/useProfile';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

export default function Profile() {
  const onSuccess = (data) => {
    console.log('onSuccess:', data);
  };

  const onError = (error) => {
    console.log('onError:', error);
  };

  const {
    isLoading,
    // isFetching,
    // data,
    isError,
    error,
    // refetch,
    // dataUpdatedAt,
  } = useGetProfile(onSuccess, onError);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <h1>Profile</h1>
      <p>User profile</p>
    </>
  );
}
