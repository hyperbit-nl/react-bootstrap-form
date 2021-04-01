import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { isArray } from './Utils';

const getValidation = (didSubmbit, error) => {
  const validation = {
    isValid: false,
    isInvalid: false,
  };

  if (didSubmbit) {
    validation.isValid = !error;
    validation.isInvalid = error;
  }

  return validation;
};

export const RBFormObjectRecursiveAssignProps = (children, fn) => (
  React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const propsSource = {...fn(child)};

    const {children} = child.props;

    if (children) {
      propsSource.children = RBFormObjectRecursiveAssignProps(children, fn);
    }

    return React.cloneElement(child, propsSource);
  })
);

const RBArrayItemAssignProps = ({
  nameArray,
  indexValue,
  name,
  values,
  errors
}) => ({
  name: `${nameArray}.${indexValue}.${name}`,
  value: values[indexValue][name],
  error: errors && errors[indexValue] && errors[indexValue][name],
});

export const RBFieldAssignProps = (props, isFromArray) => {
  let propsSource = {};

  const {didSubmbit, handleChange, ...rest} = props;

  if (isFromArray) {
    const propsInner = RBArrayItemAssignProps(props);

    propsSource = {
      ...propsInner,
    };

  } else {
    const {name, values, errors} = rest;

    propsSource.nameValue = name;
    propsSource.value = values[name];
    propsSource.error = errors && errors[name];
  }

  const {isValid, isInvalid} = getValidation(didSubmbit, propsSource.error);

  propsSource.isValid = isValid;
  propsSource.isInvalid = isInvalid;
  propsSource.handleChange = handleChange;

  return propsSource;
};

export const RBCustomAssignProps = (props, isFromArray) => {
  const propsSource = RBFieldAssignProps(props, isFromArray);

  const {name, nameValue, handleChange} = propsSource;

  propsSource.onChange = (value) => {
    handleChange(isFromArray ? name : nameValue, value);
  };

  return propsSource;
};

export const RBArrayAssignProps = (props, isFromArray) => {
  let propsSource = {};

  const {name, didSubmbit, handleChange, initialValues, ...rest} = props;

  if (isFromArray) {
    const propsInner = RBArrayItemAssignProps(props);

    propsSource = {
      name: propsInner.name,
      values: propsInner.value,
      errors: propsInner.error,
    };

  } else {
    const {values, errors} = rest;

    propsSource.nameValue = name;
    propsSource.values = values[name];
    propsSource.errors = errors && errors[name];
  }

  propsSource.didSubmbit = didSubmbit;
  propsSource.handleChange = handleChange;
  propsSource.initialValues = isArray(initialValues[name]) ? initialValues[name][0] : initialValues[name];

  return propsSource;
};

export const getIdLabel = (name) => (`rbf_${name}_label`);

export const getBreakpoints = (props, key = '') => {
  const {
    [`xs${key}`]: xs,
    [`sm${key}`]: sm,
    [`md${key}`]: md,
    [`lg${key}`]: lg,
    [`xl${key}`]: xl,
  } = props;

  const breakpoints = {xs, sm, md, lg, xl};

  return Object.fromEntries(Object.entries(breakpoints).filter(([_, value]) => (value != null)));
};

export const getSectionLabel = ({name, as, size, className, ...rest}) => {
  let propsLabel = {};
  const propsLabelClassNames = [];

  if (name) {
    propsLabel.id = getIdLabel(name);
  }

  if (className) {
    propsLabelClassNames.push(className);
  }

  if (as && as.displayName == Row.displayName) {
    propsLabel = {
      ...propsLabel,
      column: size ?? true,
      ...getBreakpoints(rest, 'Label'),
    };

  } else {
    propsLabelClassNames.push(getSizeClass(size));
  }

  if (propsLabelClassNames.length > 0) {
    propsLabel.className = propsLabelClassNames.join(' ');
  }

  return createLabel(Form.Label, propsLabel, rest);
};

export const createLabel = (component, propsLabel, props, label) => {
  const Label = component;

  return (
    <Label {...propsLabel}>
      {label ?? createContentLabel(props)}
    </Label>
  );
};

export const createContentLabel = ({label, required}) => (
  <>
    {label}
    {required && <span className="ml-1 rbf-text-red">*</span>}
  </>
);

export const getSizeClass = (size, isLabel = true) => {
  const prefix = isLabel ? 'label' : 'height';

  if (size) {
    if (size === 'sm') {
      return `rbf-${prefix}-sm`;

    } else if (size === 'lg') {
      return `rbf-${prefix}-lg`;
    }
  }

  if (!isLabel) {
    return `rbf-${prefix}`;
  }
};

export const getLayout = (propsGroup, Label, Content, props) => {
  const {as} = props;

  let Field;

  if (as && as.displayName == Row.displayName) {
    let propsCol;

    const breakpointsControl = getBreakpoints(props, 'Control');

    if (Label) {
      propsCol = breakpointsControl;

    } else {
      const breakpointsLabel = getBreakpoints(props, 'Label');

      propsCol = {
        xs: {span: breakpointsControl.xs, offset: breakpointsLabel.xs},
        sm: {span: breakpointsControl.sm, offset: breakpointsLabel.sm},
        md: {span: breakpointsControl.md, offset: breakpointsLabel.md},
        lg: {span: breakpointsControl.lg, offset: breakpointsLabel.lg},
        xl: {span: breakpointsControl.xl, offset: breakpointsLabel.xl},
      };
    }

    Field = (
      <>
        {Label}
        <Col {...propsCol}>
          {Content}
        </Col>
      </>
    );

  } else {
    if (as && as.displayName == Col.displayName) {
      propsGroup = {...propsGroup, ...getBreakpoints(props)};
    }

    Field = (
      <>
        {Label}
        {Content}
      </>
    );
  }

  return (
    <Form.Group {...propsGroup}>
      {Field}
    </Form.Group>
  );
};
