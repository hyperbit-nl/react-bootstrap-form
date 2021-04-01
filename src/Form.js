import React, { useEffect, useReducer } from 'react';
import { Formik } from 'formik';
import { RBFormObjectRecursiveForEach } from './Setup';
import { RBBuilder } from './Builder';
import { getShapeObject } from './Validation';
import { isArray, isObject, usePrevious } from './Utils';

const filterEditable = (target, source) => {
  if (isObject(target) && isObject(source)) {
    target = {...target};

    for (const key in source) {
      if (source[key] === true) { // True means that key must be hidden, otherwise this is undefined.
        delete target[key];

      } else if (isObject(target[key])) {
        target[key] = filterEditable(target[key], source[key]);

      } else if (isArray(target[key]) && Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = target[key].map((value) => (
          filterEditable(value, source[key])
        ));
      }
    }
  }

  return target;
};

const initialStateForm = {
  didLoad: false,
  validationSchema: null,
  valuesHidden: null,
  initialValues: null,
  values: null,
  isLoadingSubmit: false,
  successSubmit: false,
  errorSubmit: null,
  fieldErrorSubmit: null,
};

const reducerForm = (state, action) => {
  switch (action.type) {
    case 'update': {
      const {validationShape, values, didChangeInitialValues, ...rest} = action.payload;

      const stateNew = {
        didLoad: true,
        validationSchema: getShapeObject(validationShape),
        ...rest,
      };

      if (didChangeInitialValues) {
        stateNew.values = values;
      }

      return {...state, ...stateNew};
    }

    case 'startSubmit': {
      return {...state, isLoadingSubmit: true};
    }

    case 'submitSuccess': {
      const response = action.payload;

      return {
        ...state,
        isLoadingSubmit: false,
        successSubmit: response,
        errorSubmit: null,
        fieldErrorSubmit: null,
      };
    }

    case 'submitFailure': {
      const error = action.payload;
      const stateNew = {isLoadingSubmit: false, successSubmit: false};

      if (error) {
        const {server: serverError, field: fieldErrors} = action.payload;

        if (fieldErrors) {
          stateNew.fieldErrorSubmit = fieldErrors;
        }

        stateNew.errorSubmit = serverError ?? 'Error';

      } else {
        stateNew.errorSubmit = 'Error';
      }

      return {...state, ...stateNew};
    }

    default:
      break;
  }
};

export const RBForm = ({
  initialValues: initialValuesForm = false,
  validationErrorText,
  customSubmit,
  onSubmit,
  children
}) => {
  const initialValuesFormPrevious = usePrevious(initialValuesForm);

  const [state, dispatch] = useReducer(reducerForm, initialStateForm);

  useEffect(() => {
    const validationShape = {};
    const valuesHidden = {};
    const initialValues = {};
    const values = {};

    RBFormObjectRecursiveForEach(
      validationShape,
      valuesHidden,
      initialValues,
      isObject(initialValuesForm) ? initialValuesForm : {},
      values,
      isArray(children) ? children: [children]
    );

    dispatch({
      type: 'update',
      payload: {
        validationShape,
        valuesHidden,
        initialValues,
        values,
        didChangeInitialValues: initialValuesFormPrevious !== initialValuesForm,
      },
    });

  }, [initialValuesForm, initialValuesFormPrevious, children]);

  const handleSubmit = (values, {resetForm}) => {
    const valuesEditable = filterEditable(values, state.valuesHidden);

    if (onSubmit) {
      dispatch({type: 'startSubmit'});

      onSubmit(valuesEditable, (response) => {
        onSubmitSuccess(resetForm, response);

      }, (error) => {
        dispatch({type: 'submitFailure', payload: error});
      });

    } else {
      onSubmitSuccess(resetForm);
    }
  };

  const onSubmitSuccess = (resetForm, response = 'Success') => {
    resetForm();
    dispatch({type: 'submitSuccess', payload: response});
  };

  return (
    state.didLoad && (
      <Formik
        validationSchema={state.validationSchema}
        initialValues={state.values}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(form) => (
          <RBBuilder
            {...{
              form,
              validationSchema: state.validationSchema,
              initialValues: state.initialValues,
              customSubmit,
              isLoadingSubmit: state.isLoadingSubmit,
              errorSubmit: state.errorSubmit,
              fieldErrorSubmit: state.fieldErrorSubmit,
              successSubmit: state.successSubmit,
              validationErrorText,
            }}
          >
            {children}
          </RBBuilder>
        )}
      </Formik>
    )
  );
};
