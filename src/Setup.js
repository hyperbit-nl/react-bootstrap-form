import React from 'react';
import { RBField } from './Field';
import { RBFieldArray} from './FieldArray';
import { getShape, getShapeArray } from './Validation';
import { createArray, ensureArray, fillMissingArrayRows, getDatetimeFormat, getDatetimeString, isArray } from './Utils';

const getValidValue = (value, {type, multiple, htmlSize, dateFormat, timeFormat, locale}) => {
  if (type === 'datetime') {
    return getDatetimeString(value, getDatetimeFormat(dateFormat, timeFormat), locale);
  }

  if (type === 'select' && multiple || htmlSize) {
    return isArray(value) ? value : [];
  }

  if (type === 'color' && value === '') {
    return '#000000';
  }

  if (type === 'checkbox' || type === 'switch') {
    return !!value;
  }

  return value;
};

const getInitialValue = (name, value, initialValuesForm, defaultValue, props, index) => {
  // Priority 1: Field specific value.
  if (value != null) {
    return getValidValue(value, props);
  }

  // Priority 2: Form initial value.
  // This object has been constructed from the start and the algorithm is keeping track of the remaing depth with each array.
  // So the next correct key is inside the array of objects with the current index.
  if (initialValuesForm != null) {
    if (isArray(initialValuesForm) && index != null) {
      const initialValue = initialValuesForm[index] && initialValuesForm[index][name];

      if (initialValue) {
        return getValidValue(initialValue, props);
      }

    } else if (initialValuesForm[name] != null) {
      return getValidValue(initialValuesForm[name], props);
    }
  }

  // Priority 3: Field specific default value.
  if (defaultValue != null) {
    return getValidValue(defaultValue, props);
  }

  return getValidValue('', props);
};

const getDefaultValue = (value, defaultValue, props) => {
  if (value != null) {
    return getValidValue(value, props);
  }

  if (defaultValue != null) {
    return getValidValue(defaultValue, props);
  }

  return getValidValue('', props);
};

export const RBFormObjectRecursiveForEach = (validationShape, valuesHidden, defaultValues, initialValuesForm, initialValues, children) => {
  children.forEach((child) => {
    if (!React.isValidElement(child)) {
      return;
    }

    const {name, disabled, hidden, defaultValue, value, initialSize, customInput, children} = child.props;

    // Used when there is a FormArray inside another FormArray.
    let indexInner = null;
    let initialValuesFormInner = null;
    let initialValuesInner = null;
    let defaultValuesInner = null;

    // Ensures that the possible next node has the correct references.
    let validationShapeParent = validationShape;
    let valuesHiddenParent = valuesHidden;
    let defaultValuesParent = defaultValues;
    let initialValuesFormParent = initialValuesForm;
    let initialValuesParent = initialValues;

    const typeComponent = customInput ? RBField : child.type;

    switch (typeComponent) {
      case RBField: {
        validationShape[name] = getShape(child.props);
        valuesHidden[name] = disabled || hidden;

        // Get default values.
        if (isArray(defaultValues)) {
          defaultValues.forEach((object) => {
            object[name] = getDefaultValue(value, defaultValue, child.props);
          });

        } else {
          defaultValues[name] = getDefaultValue(value, defaultValue, child.props);
        }

        // Get initial values.
        if (isArray(initialValues)) {
          initialValues.forEach((object, index) => {
            object[name] = getInitialValue(name, value, initialValuesForm, defaultValue, child.props, index);
          });

        } else {
          initialValues[name] = getInitialValue(name, value, initialValuesForm, defaultValue, child.props);
        }

        break;
      }

      case RBFieldArray: {
        const sizeMin = Number.isInteger(initialSize) ? initialSize : 1;

        // These will be filled by the underlying Fields.
        validationShapeParent = {};
        valuesHiddenParent = {};

        if (isArray(initialValuesForm)) {
          // Previous node was a Field Array, so the initialValuesForm is an array with objects.
          // Each object in the array must hold an array with the current key name, for both initialValuesForm and initialValues.

          // Note: The previous Field Array made sure that initialValuesForm has the correct size.

          indexInner = 0;
          initialValuesInner = [];

          // Setup default value.
          if (isArray(defaultValues)) {
            defaultValuesInner = defaultValues.map((value) => {
              value[name] = createArray(sizeMin, {});
              return value;
            });

            defaultValuesParent = defaultValuesInner[indexInner][name];

          } else {
            defaultValuesParent = createArray(sizeMin, {});
          }

          // Iterate initialValuesForm to get the initial value of the current key name.
          initialValuesFormInner = initialValuesForm.map((value) => {
            let dataKey = value[name];

            // Element must be an array.
            if (isArray(dataKey)) {
              dataKey = fillMissingArrayRows(sizeMin, dataKey, []);
              initialValuesInner.push(createArray(dataKey.length, {}));
              return dataKey;
            }

            initialValuesInner.push(createArray(sizeMin, {}));
            return createArray(sizeMin, []);
          });

          initialValuesFormParent = initialValuesFormInner[indexInner];
          initialValuesParent = initialValuesInner[indexInner];

        } else {
          // Previous node wasn't a Field Array, so the initialValuesForm is an object.
          // One element in both initialValuesForm and initialValues must hold an array with the current key name.
          // These arrays will hold object that will be filled by underlying nodes.

          // The correct length of the arrays must also be predetermined.
          // This ensures that the next nodes know how much rows there should be.

          // Note: The props initialValues doesn't have any valid data, since it should be filled by the Fields.

          defaultValuesParent = {};

          // Get the array of objects with the initial values.
          initialValuesFormParent = initialValuesForm[name] ?? [];

          const sizeInitialValuesFormParent = initialValuesFormParent.length;

          // Determine the amount of rows. InitialValues(Form) and initialSize are the only props that can influence this.
          const rowsAmount = Math.max(sizeInitialValuesFormParent, sizeMin);
          initialValuesFormParent = fillMissingArrayRows(rowsAmount, initialValuesFormParent);
          initialValuesParent = createArray(rowsAmount, {});
        }

        break;
      }

      default:
        break;
    }

    if (children) {
      RBFormObjectRecursiveForEach(validationShapeParent, valuesHiddenParent, defaultValuesParent, initialValuesFormParent, initialValuesParent, ensureArray(children));

      if (child.type === RBFieldArray) {
        if (initialValuesInner) {
          const initialValuesParentTemp = [initialValuesParent];
          const defaultValuesParentTemp = [defaultValuesParent];

          while (++indexInner < initialValuesInner.length) {
            initialValuesFormParent = initialValuesFormInner[indexInner];
            initialValuesParent = initialValuesInner[indexInner];

            if (defaultValuesInner) {
              defaultValuesParent = defaultValuesInner[indexInner][name];
            }

            RBFormObjectRecursiveForEach(validationShapeParent, valuesHiddenParent, defaultValuesParent, initialValuesFormParent, initialValuesParent, ensureArray(children));

            initialValuesParentTemp.push(initialValuesParent);
            defaultValuesParentTemp.push(defaultValuesParent);
          }

          initialValuesParent = initialValuesParentTemp;

          if (defaultValuesInner) {
            defaultValuesParent = defaultValuesParentTemp;
          }
        }

        validationShape[name] = getShapeArray(validationShapeParent);
        valuesHidden[name] = valuesHiddenParent;
        defaultValues[name] = defaultValuesParent;

        if (isArray(initialValues)) {
          initialValues.forEach((object, index) => {
            if (isArray(initialValuesParent)) {
              object[name] = initialValuesParent[index];

            } else {
              object[name] = initialValuesParent;
            }
          });

        } else {
          initialValues[name] = initialValuesParent;
        }
      }
    }
  });
};
