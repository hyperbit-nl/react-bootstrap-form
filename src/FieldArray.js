import React from 'react';
import { FieldArray } from 'formik';
import { Button } from 'react-bootstrap';
import { getLayout, getSectionLabel, RBArrayAssignProps, RBCustomAssignProps, RBFieldAssignProps, RBFormObjectRecursiveAssignProps } from './FieldCommon';
import { RBField } from './Field';

export const RBFieldArray = (props) => {
  const {name, ...rest} = props; // Make sure to remove 'name' form the rest.
  const {values, errors, didSubmbit, handleChange, initialValues, addButton, noRowsMessage, children, as, label} = rest;

  const Component = (
    <FieldArray {...{name}} render={({push, remove}) => {
      const addFunction = () => (push(initialValues));

      const Add = (addButton === undefined || addButton == true) ? (
        <Button className="mb-3" variant="primary" type="button" onClick={addFunction}>Add</Button>
      ) : (
        !addButton ? null : addButton(addFunction)
      );

      return (
        <>
          {values && values.length > 0 ? (
            values.map((_, indexValue) => (
              <React.Fragment key={indexValue}>
                {RBFormObjectRecursiveAssignProps(children, (child) => {
                  const {type, props} = child;
                  const {type: typeValue, nameValue, customInput} = props;
                  const typeComponent = customInput ? 'custom' : type;

                  switch (typeComponent) {
                    case RBField:
                      return RBFieldAssignProps({
                        name: nameValue,
                        type: typeValue,
                        values,
                        errors,
                        didSubmbit,
                        handleChange,
                        nameArray: name,
                        indexValue,
                      }, true);

                    case RBFieldArray:
                      return RBArrayAssignProps({
                        name: nameValue,
                        values,
                        errors,
                        didSubmbit,
                        handleChange,
                        initialValues,
                        nameArray: name,
                        indexValue,
                      }, true);

                    case 'custom':
                      return RBCustomAssignProps({
                        name: nameValue,
                        type: typeValue,
                        values,
                        errors,
                        didSubmbit,
                        handleChange,
                        nameArray: name,
                        indexValue,
                      }, true);

                    default: {
                      if (props['array-remove']) {
                        return {
                          ['array-remove']: 'true',
                          onClick: () => {
                            remove(indexValue);
                          },
                        };
                      }
                      return;
                    }
                  }
                })}
              </React.Fragment>
            ))
          ) : (
            noRowsMessage
          )}
          {Add}
        </>
      );
    }} />
  );

  return getLayout({as}, label && getSectionLabel(rest), Component, rest);
};
