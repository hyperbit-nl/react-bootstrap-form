import React, { useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { RBArrayAssignProps, RBCustomAssignProps, RBFieldAssignProps, RBFormObjectRecursiveAssignProps } from './FieldCommon';
import { RBField } from './Field';
import { RBFieldArray } from './FieldArray';

const createSubmitSpinner = () => (
  <Spinner className="ml-2 align-middle" animation="border" variant="primary" role="status">
    <span className="sr-only">Waiting for response</span>
  </Spinner>
);

const createSubmit = (sendText, {isLoadingSubmit, errorSubmit, successSubmit, didSubmbit, isValid, validationErrorText}) => (
  <div>
    <Button disabled={isLoadingSubmit} variant="primary" type="submit">{sendText}</Button>
    {isLoadingSubmit && createSubmitSpinner()}
    {!errorSubmit && !successSubmit && didSubmbit && !isValid ? (
      <span className="ml-2 rbf-text-red" role="status">{validationErrorText}</span>
    ) : !isLoadingSubmit ? (
      errorSubmit && (
        <span className="ml-2 rbf-text-red" role="status">{errorSubmit}</span>
      )
    ) ?? (
      successSubmit && (
        <span className="ml-2 rbf-text-green" role="status">{successSubmit}</span>
      )
    ) : null}
  </div>
);

const getSubmit = (customSubmit, props) => {
  if (customSubmit) {
    if (typeof customSubmit === 'string') {
      return createSubmit(customSubmit, props);
    }

    const {isLoadingSubmit, successSubmit, errorSubmit} = props;
    return customSubmit(isLoadingSubmit, successSubmit, errorSubmit);
  }

  return createSubmit('Send', props);
};

export const RBBuilder = ({
  form: {
    validateForm,
    handleSubmit,
    values,
    setFieldValue: handleChange,
    errors,
    setErrors,
    submitCount,
    isValid
  },
  validationSchema,
  initialValues,
  customSubmit,
  isLoadingSubmit,
  errorSubmit,
  fieldErrorSubmit,
  successSubmit,
  validationErrorText = 'Error',
  children
}) => {
  const didSubmbit = submitCount > 0;

  useEffect(() => {
    if (didSubmbit) {
      validateForm();
    }
  }, [didSubmbit, validateForm, validationSchema]);

  useEffect(() => {
    if (fieldErrorSubmit) {
      setErrors(fieldErrorSubmit);
    }
  });

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
    >
      {RBFormObjectRecursiveAssignProps(children, ({type, props}) => {
        const typeComponent = props.customInput ? 'custom' : type;

        switch (typeComponent) {
          case RBField:
            return RBFieldAssignProps({...props, values, errors, didSubmbit, handleChange}, false);

          case RBFieldArray:
            return RBArrayAssignProps({...props, values, errors, didSubmbit, handleChange, initialValues}, false);

          case 'custom':
            return RBCustomAssignProps({...props, values, errors, didSubmbit, handleChange}, false);

          default:
            return;
        }
      })}
      {getSubmit(customSubmit, {isLoadingSubmit, errorSubmit, successSubmit, didSubmbit, isValid, validationErrorText})}
    </Form>
  );
};
