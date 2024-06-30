import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';

const ComposeEmail = () => {
  const initialValues = {
    to: '',
    subject: '',
    body: ''
  };

  const validationSchema = Yup.object().shape({
    to: Yup.string().email('Invalid email').required('Required'),
    subject: Yup.string().required('Required'),
    body: Yup.string().required('Required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await api.post('/emails', values);
      setSubmitting(false);
      resetForm();
      // Handle success (e.g., show success message)
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitting(false);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Compose Email</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="to" placeholder="To" />
            <ErrorMessage name="to" component="div" />

            <Field type="text" name="subject" placeholder="Subject" />
            <ErrorMessage name="subject" component="div" />

            <Field as="textarea" name="body" placeholder="Body" />
            <ErrorMessage name="body" component="div" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ComposeEmail;