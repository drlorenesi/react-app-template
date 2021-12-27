import { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// Form Inputs
import DateField from '../../components/formInputs/DateField';
import InputField from '../../components/formInputs/InputField';
import TextareaField from '../../components/formInputs/TextareaField';
import SelectField from '../../components/formInputs/SelectField';
import RadioField from '../../components/formInputs/RadioField';
import CheckboxGroupField from '../../components/formInputs/CheckboxGroupField';
import CheckboxField from '../../components/formInputs/CheckboxField';

export default function HorizontalForm() {
  const [values, setValues] = useState(null);

  const labelSize = 3;
  const inputSize = 9;

  const dropDownOptions = [
    { key: '-Select-', value: '' },
    { key: 'Option 1', value: '1' },
    { key: 'Option 2', value: '2' },
    { key: 'Option 3', value: '3' },
  ];
  const radioOptions = [
    { key: 'Option 1', value: '1' },
    { key: 'Option 2', value: '2' },
    { key: 'Option 3', value: '3' },
  ];
  const checkboxOptions = [
    { key: 'Option 1', value: '1' },
    { key: 'Option 2', value: '2' },
    { key: 'Option 3', value: '3' },
  ];

  const initialValues = {
    date: new Date(),
    email: '',
    description: '',
    selectOption: '',
    radioOption: '',
    checkboxOption: [],
    checkbox: false,
  };

  const validationSchema = Yup.object({
    date: Yup.string().required('Required').nullable(),
    email: Yup.string().email('Invalid email address').required('Required'),
    description: Yup.string().required('Please share a brief description'),
    selectOption: Yup.string().required('Please select a dropdown option'),
    radioOption: Yup.string().required('Please select a radio option'),
    checkboxOption: Yup.array().min(1, 'Please select one or more options'),
    checkbox: Yup.boolean(),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setValues(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  return (
    <>
      <h1>Horizontal Form</h1>
      <Row>
        <Col sm={6}>
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
                {/* Date */}
                <Form.Group as={Row} className='mb-2'>
                  <Form.Label column sm={labelSize}>
                    Date
                  </Form.Label>
                  <Col sm={inputSize}>
                    <DateField name='date' />
                  </Col>
                </Form.Group>
                {/* Email */}
                <Form.Group as={Row} className='mb-2'>
                  <Form.Label column sm={labelSize}>
                    Email
                  </Form.Label>
                  <Col sm={inputSize}>
                    <InputField
                      type='email'
                      name='email'
                      placeholder='Enter email'
                      formText="We'll never share your email with anyone else."
                    />
                  </Col>
                </Form.Group>
                {/* Textarea */}
                <Form.Group as={Row} className='mb-2'>
                  <Form.Label column sm={labelSize}>
                    Description
                  </Form.Label>
                  <Col sm={inputSize}>
                    <TextareaField
                      name='description'
                      placeholder='Tell us about yourself...'
                      formText="We'll never share your info with anyone else."
                    />
                  </Col>
                </Form.Group>
                {/* Select */}
                <Form.Group as={Row} className='mb-2'>
                  <Form.Label column sm={labelSize}>
                    Select
                  </Form.Label>
                  <Col sm={inputSize}>
                    <SelectField
                      name='selectOption'
                      options={dropDownOptions}
                    />
                  </Col>
                </Form.Group>
                {/* Radio */}
                <fieldset>
                  <Form.Group as={Row} className='mb-2'>
                    <Form.Label as='legend' column sm={labelSize}>
                      Radios
                    </Form.Label>
                    <Col sm={inputSize}>
                      <RadioField
                        name='radioOption'
                        options={radioOptions}
                        formText='Please select one.'
                      />
                    </Col>
                  </Form.Group>
                </fieldset>
                {/* Checkbox Group */}
                <fieldset>
                  <Form.Group as={Row} className='mb-2'>
                    <Form.Label as='legend' column sm={labelSize}>
                      Checkboxes
                    </Form.Label>
                    <Col sm={inputSize}>
                      <CheckboxGroupField
                        name='checkboxOption'
                        options={checkboxOptions}
                        formText='Please select one or more options.'
                      />
                    </Col>
                  </Form.Group>
                </fieldset>
                {/* Check */}
                <Form.Group as={Row} className='mb-2'>
                  <Col sm={{ span: inputSize, offset: labelSize }}>
                    <CheckboxField name='checkbox' label='Remember me' />
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
        <Col sm={6}>
          <p>The received values were:</p>
          <pre>
            <i>{values}</i>
          </pre>
        </Col>
      </Row>
    </>
  );
}
