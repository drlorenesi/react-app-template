import { useGetUsers } from '../hooks/useUsers';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { formatDate } from '../utils/formatUtils';
// Bootstrap
import Button from 'react-bootstrap/Button';

export default function Users() {
  const onSuccess = (data) => {
    console.log('Success!', data);
  };

  const onError = (error) => {
    console.log('Error!', error);
  };

  const {
    isLoading,
    isFetching,
    data,
    isError,
    error,
    refetch,
    dataUpdatedAt,
  } = useGetUsers(onSuccess, onError);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <h1>Users</h1>
      <Button
        variant='primary'
        onClick={refetch}
        disabled={isFetching ? true : null}
      >
        {isFetching ? 'Updating...' : 'Update'}
      </Button>
      {dataUpdatedAt ? (
        <p>
          <i>Última actualización: {formatDate(dataUpdatedAt)}</i>
        </p>
      ) : null}
      {data?.data.map((user) => {
        return (
          <div key={user.id}>
            {user.id} - {user.name}
          </div>
        );
      })}
    </>
  );
}
