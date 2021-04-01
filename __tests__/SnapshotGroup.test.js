import React from 'react';
import { render } from '@testing-library/react';
import { RBForm } from '../src/Form';
import { RBFieldGroup as FieldGroup  } from '../src/FieldGroup';
import { RBField as Field } from '../src/Field';

it("renders default Group", () => {
  const {container} = render(
    <RBForm>
      <FieldGroup id="group" label="Group" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Group with hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <FieldGroup id="group" label="Group" hiddenLabel />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Group with one text Field", () => {
  const {container} = render(
    <RBForm>
      <FieldGroup id="group" label="Group">
        <Field name="text" type="text" label="Text" />
      </FieldGroup>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Group with two text Fields", () => {
  const {container} = render(
    <RBForm>
      <FieldGroup id="group" label="Group">
        <Field name="text_1" type="text" label="Text 1" />
        <Field name="text_2" type="text" label="Text 2" />
      </FieldGroup>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Group with one checkbox Field", () => {
  const {container} = render(
    <RBForm>
      <FieldGroup id="group" label="Group">
        <Field name="checkbox" type="checkbox" label="Checkbox" />
      </FieldGroup>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Group with two checkbox Fields", () => {
  const {container} = render(
    <RBForm>
      <FieldGroup id="group" label="Group">
        <Field name="checkbox_1" type="checkbox" label="Checkbox 1" />
        <Field name="checkbox_2" type="checkbox" label="Checkbox 2" />
      </FieldGroup>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});
