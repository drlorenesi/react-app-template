import { useNavigate } from 'react-router-dom';
import {
  useGetAlbums,
  useAddAlbum,
  useDeleteAlbum,
} from '../../hooks/useAlbums';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import DataTable from '../../components/DataTable';
import { formatDate } from '../../utils/formatUtils';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import swal from 'sweetalert';
// Bootstrap
import Button from 'react-bootstrap/Button';

export default function Albums() {
  const navigate = useNavigate();

  const {
    isLoading,
    isFetching,
    refetch,
    data,
    dataUpdatedAt,
    isError,
    // isSuccess,
    error,
  } = useGetAlbums(false);
  const { mutate: addAlbum } = useAddAlbum();
  const { mutate: deleteAlbum } = useDeleteAlbum();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  // Add Album
  const handleAdd = () => {
    addAlbum({
      userId: 1,
      title: 'quidem molestiae enim',
    });
  };

  // Edit
  const handleEdit = (id) => {
    navigate(`/albums/${id}`);
  };

  // Delete
  const handleDelete = (id, row) => {
    // Delete without confirmation
    // deleteAlbum(id);
    // Confirm delete
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this resource!',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteAlbum(id);
        swal(`Imaginary resource with id:${id} has been deleted!`, {
          icon: 'success',
        });
      }
    });
  };

  // Data Table
  const columns = [
    { Header: 'Id', accessor: 'id' },
    { Header: 'UserId', accessor: 'userId' },
    { Header: 'Title', accessor: 'title' },
    {
      Header: 'Actions',
      accessor: 'none',
      Cell: (props) => {
        return (
          <div className='text-nowrap' style={{ textAlign: 'center' }}>
            <Button
              size='sm'
              variant='primary'
              onClick={() => handleEdit(props.row.original.id)}
            >
              <FaEdit />
            </Button>{' '}
            <Button
              size='sm'
              variant='danger'
              onClick={() => handleDelete(props.row.original.id, props.row)}
            >
              <FaTrashAlt />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className='d-flex'>
        <div className='me-auto'>
          <h1>Albums</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* <Link to={'/albumbs/new'}> */}
          <Button variant='success' onClick={() => handleAdd()}>
            <FaPlus /> Add Album
          </Button>
          {/* </Link> */}
        </div>
      </div>
      <Button
        variant='primary'
        onClick={refetch}
        disabled={isFetching ? true : null}
      >
        {isFetching ? 'Getting Albums...' : 'Get Albums'}
      </Button>
      {dataUpdatedAt ? (
        <p>
          <i>Última actualización: {formatDate(dataUpdatedAt)}</i>
        </p>
      ) : null}
      {data && <DataTable columns={columns} data={data.data} />}
    </>
  );
}
