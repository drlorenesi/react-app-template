import { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { startOfMonth, differenceInDays } from 'date-fns';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Form Inputs
import DateField from '../../components/formInputs/DateField';

export default function FormTemplate() {
  const [result, setResult] = useState(null);
  const [values, setValues] = useState(null);

  // Sum up to 12
  const labelSize = 3;
  const inputSize = 9;

  const initialValues = {
    startDate: startOfMonth(new Date()),
    endDate: new Date(),
  };
  const validationSchema = Yup.object({
    startDate: Yup.string().required('Required').nullable(),
    endDate: Yup.string().required('Required').nullable(),
  });
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setResult(differenceInDays(values.endDate, values.startDate));
      setValues(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  return (
    <>
      <h1>Form Template</h1>
      <Row>
        <Col lg={4} md={6} sm={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            // enableReinitialize
            // validateOnBlur={false}
            // validateOnMount={true}
          >
            {(formik) => (
              <FormikForm noValidate>
                {/* Start Date */}
                <Form.Group as={Row} className='mb-2'>
                  <Form.Label column sm={labelSize}>
                    Start Date:
                  </Form.Label>
                  <Col sm={inputSize}>
                    <DateField name='startDate' />
                  </Col>
                </Form.Group>
                {/* End Date */}
                <Form.Group as={Row} className='mb-2'>
                  <Form.Label column sm={labelSize}>
                    End Date:
                  </Form.Label>
                  <Col sm={inputSize}>
                    <DateField name='endDate' />
                  </Col>
                </Form.Group>
                {/* Submit */}
                <Form.Group as={Row} className='mb-2'>
                  <Col sm={{ span: inputSize, offset: labelSize }}>
                    <Button
                      variant='primary'
                      type='submit'
                      block='true'
                      disabled={formik.isSubmitting || !formik.isValid}
                    >
                      {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </Col>
                </Form.Group>
              </FormikForm>
            )}
          </Formik>
          <hr />
        </Col>
        <Col lg={4} md={6}>
          <p>The difference in days is: {result}</p>
          <p>The received values were:</p>
          <pre>
            <i>{values}</i>
          </pre>
        </Col>
      </Row>
    </>
  );
}
