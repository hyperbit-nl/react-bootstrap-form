import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RBForm } from '../src/Form';
import { RBFieldGroup as FieldGroup  } from '../src/FieldGroup';
import { RBFieldArray as FieldArray } from '../src/FieldArray';

const TextField = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  }

  return (
    <>
      <label htmlFor={props.name}>{props.label}</label><br />
      <input type="text" id={props.name} value={props.value} onChange={handleChange} /><br />
      {props.isInvalid && <div>{props.error}</div>}
    </>
  );
};

it("renders custom Field", () => {
  const {container} = render(
    <RBForm>
      <TextField customInput name="text" label="Text" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders custom Field with defaultValue", () => {
  const {container} = render(
    <RBForm>
      <TextField customInput name="text" label="Text" defaultValue="Default value" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders custom Field with value", () => {
  const {container} = render(
    <RBForm>
      <TextField customInput name="text" label="Text" value="Value" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders custom Field with initialValues", () => {
  const {container} = render(
    <RBForm initialValues={{text: 'Initial value'}}>
      <TextField customInput name="text" label="Text" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders custom Field with error", async () => {
  const {container} = render(
    <RBForm>
      <TextField customInput name="text" label="Text" required />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);

  const error = await screen.findByText('Error');
  const errorField = screen.findByText('name is a required field');

  expect(container).toMatchSnapshot();
});

it("renders Group with custom Field", () => {
  const {container} = render(
    <RBForm>
      <FieldGroup id="group" label="Group">
        <TextField customInput name="name" label="Name" />
      </FieldGroup>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Array with custom Field", () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array">
        <TextField customInput name="name" label="Name" />
      </FieldArray>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Array with custom Field and error", async () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array">
        <TextField customInput name="name" label="Name" required />
      </FieldArray>
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);

  const error = await screen.findByText('Error');
  const errorField = screen.findByText('array[0].name is a required field');

  expect(container).toMatchSnapshot();
});

it("renders Array with custom Field and success", async () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array">
        <TextField customInput name="name" label="Name" />
      </FieldArray>
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);

  const success = await screen.findByText('Success');

  expect(container).toMatchSnapshot();
});
