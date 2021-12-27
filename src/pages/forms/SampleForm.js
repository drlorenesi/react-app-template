import { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// Form Inputs
import DateField from '../../components/formInputs/DateField';
import InputField from '../../components/formInputs/InputField';
import TextareaField from '../../components/formInputs/TextareaField';
import SelectField from '../../components/formInputs/SelectField';
import RadioField from '../../components/formInputs/RadioField';
import CheckboxGroupField from '../../components/formInputs/CheckboxGroupField';
import CheckboxField from '../../components/formInputs/CheckboxField';

export default function FormikContainer() {
  const [values, setValues] = useState(null);

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
    checkbox: '',
  };

  const validationSchema = Yup.object({
    date: Yup.string().required('Required').nullable(),
    email: Yup.string().email('Invalid email address').required('Required'),
    description: Yup.string().required('Please share a brief description'),
    selectOption: Yup.string().required('Please select a dropdown option'),
    radioOption: Yup.string().required('Please select a radio option'),
    checkboxOption: Yup.array().min(1, 'Please select one or more options'),
    checkbox: Yup.boolean()
      .required('Required')
      .oneOf([true], 'You must accept the terms and conditions.'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setValues(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  return (
    <>
      <h1>Sample Form</h1>
      <Row>
        <Col sm={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            // enableReinitialize
            validateOnBlur={false}
            // validateOnMount={true}
          >
            {(formik) => (
              <FormikForm noValidate>
                <fieldset className='border p-2'>
                  <legend className='w-auto'>Form</legend>
                  {/* Date */}
                  <Form.Group className='mb-2'>
                    <Form.Label>Date</Form.Label>
                    <DateField name='date' />
                  </Form.Group>
                  {/* Email */}
                  <Form.Group className='mb-2'>
                    <Form.Label>Email</Form.Label>
                    <InputField
                      type='email'
                      name='email'
                      placeholder='Enter email'
                      formText="We'll never share your email with anyone else."
                    />
                  </Form.Group>
                  {/* Textarea */}
                  <Form.Group className='mb-2'>
                    <Form.Label>Description</Form.Label>
                    <TextareaField
                      name='description'
                      placeholder='Tell us about yourself...'
                      formText="We'll never share your info with anyone else."
                    />
                  </Form.Group>
                  {/* Select */}
                  <Form.Group className='mb-2'>
                    <Form.Label>Select</Form.Label>
                    <SelectField
                      name='selectOption'
                      options={dropDownOptions}
                    />
                  </Form.Group>
                  {/* Radio */}
                  <Form.Group className='mb-2'>
                    <Form.Label>Radios</Form.Label>
                    <RadioField
                      name='radioOption'
                      options={radioOptions}
                      formText='Please select one.'
                    />
                  </Form.Group>
                  {/* Checkbox Group */}
                  <Form.Group className='mb-2'>
                    <Form.Label>Checkboxes</Form.Label>
                    <br />
                    <CheckboxGroupField
                      name='checkboxOption'
                      options={checkboxOptions}
                      formText='Please select one or more options.'
                    />
                  </Form.Group>
                  {/* Checkbox Field */}
                  <Form.Group className='mb-2'>
                    <CheckboxField
                      name='checkbox'
                      label='I agree to the terms and conditions'
                    />
                  </Form.Group>
                  {/* Submit */}
                  <Button
                    variant='primary'
                    type='submit'
                    block='true'
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </fieldset>
              </FormikForm>
            )}
          </Formik>
        </Col>
        <Col sm={6}>
          <fieldset className='border p-2'>
            <legend className='w-auto'>Results</legend>
            <p>The received values were:</p>
            <pre>
              <i>{values}</i>
            </pre>
          </fieldset>
        </Col>
      </Row>
    </>
  );
}
