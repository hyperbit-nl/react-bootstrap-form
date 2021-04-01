import React from 'react';
import { render } from '@testing-library/react';
import { Button } from 'react-bootstrap';
import { RBForm } from '../src/Form';
import { RBField as Field } from '../src/Field';
import { RBFieldArray as FieldArray } from '../src/FieldArray';

it("renders default Array with false as addButton", () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array" addButton={false} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Array with JSX as addButton", () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array" addButton={(addFunction) => (
        <Button onClick={addFunction}>Add</Button>
      )} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Array", () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Array with one text Field", () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array">
        <Field name="text" type="text" label="Text" />
      </FieldArray>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Array with one text Field and 0 as initialSize", () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array" initialSize={0}>
        <Field name="text" type="text" label="Text" />
      </FieldArray>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Array with one text Field and 2 as initialSize", () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array" initialSize={2}>
        <Field name="text" type="text" label="Text" />
      </FieldArray>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Array with two text Fields", () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array">
        <Field name="text_1" type="text" label="Text 1" />
        <Field name="text_2" type="text" label="Text 2" />
      </FieldArray>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Array with default Array with two text Fields", () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array_parent">
        <FieldArray name="array_child">
          <Field name="text_1" type="text" label="Text 1" />
          <Field name="text_2" type="text" label="Text 2" />
        </FieldArray>
      </FieldArray>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});
