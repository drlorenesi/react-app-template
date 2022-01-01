import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Form Inputs
import InputField from '../../components/formInputs/InputField';
import SelectField from '../../components/formInputs/SelectField';

import { useGetUsers } from '../../hooks/useUsers';
import { useGetAlbum, usePutAlbum, useAddAlbum } from '../../hooks/useAlbums';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

export default function AlbumDetalles() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: users } = useGetUsers();
  const options = users?.data.map((user) => {
    return { key: user.name, value: user.id };
  });

  // Do not run query if 'id' equals 'new'
  let runQuery = id !== 'new';
  const onError = (error) => {
    if (error?.response.status === 404)
      navigate('/not-found', { replace: true });
  };

  const { isLoading, data, isError, error } = useGetAlbum(
    id,
    runQuery,
    null,
    onError
  );
  const { mutateAsync: updateAlbum } = usePutAlbum();
  const { mutateAsync: addAlbum } = useAddAlbum();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error.message} />;
  }

  const initialValues = {
    title: data?.data.title || '',
    userId: data?.data.userId || '',
  };

  const validationSchema = Yup.object({
    title: Yup.string(),
    userId: Yup.number(),
  });

  const onSubmit = async (values) => {
    if (id !== 'new') {
      await updateAlbum({ id, values });
    } else {
      await addAlbum(values);
      navigate('/albums');
    }
  };

  return (
    <>
      <h1>{id === 'new' ? 'Nuevo Album' : 'Detalles de Album - ' + id}</h1>
      <Row>
        <Col lg={4} md={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            validateOnBlur={false}
            // validateOnMount={true}
          >
            {(formik) => (
              <FormikForm noValidate>
                {/* Title */}
                <Form.Group className='mb-3'>
                  <Form.Label>Title</Form.Label>
                  <InputField type='text' name='title' />
                </Form.Group>
                {/* Select */}
                <Form.Group className='mb-2'>
                  <Form.Label>Author</Form.Label>
                  <SelectField name='userId' options={options} />
                </Form.Group>
                {/* Submit */}
                <Button
                  variant='primary'
                  type='submit'
                  block='true'
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {formik.isSubmitting ? 'Guardando...' : 'Guardar'}
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
      <hr />
      <Link to='/albums'>
        <Button variant='outline-primary'>&laquo; Regresar</Button>
      </Link>
    </>
  );
}
