import { useParams } from 'react-router-dom';
import { useGetAlbum } from '../../hooks/useAlbums';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import Button from 'react-bootstrap/Button';

export default function PostDetails() {
  const { id } = useParams();

  const { isLoading, data, isError, error } = useGetAlbum(id);

  // const userId = data?.data.userId;

  // const { data: user } = useQuery(['user', userId], () => fetchUser(userId), {
  //   enabled: !!userId,
  // });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <h1>Album Details</h1>
      <div>
        <b>User Id</b>: {data?.data.userId}
      </div>
      <div>
        <b>Id</b>: {data?.data.id}
      </div>
      <div>
        <b>Title</b>: {data?.data.title}
      </div>
      <br />
      <Link to='/albums'>
        <Button variant='primary'>Regresar</Button>
      </Link>
    </>
  );
}
