import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from 'react-bootstrap';
import { RBForm } from '../src/Form';
import { RBField as Field } from '../src/Field';
import { RBFieldArray as FieldArray } from '../src/FieldArray';

it("renders default Form", () => {
  const {container} = render(
    <RBForm />
  );

  expect(container).toMatchSnapshot();
});

it("renders default Form with string as customSubmit", () => {
  const {container} = render(
    <RBForm customSubmit="Custom Submit" />
  );

  expect(container).toMatchSnapshot();
});

it("renders default Form with JSX as customSubmit", () => {
  const {container} = render(
    <RBForm customSubmit={(isWaiting, success, error) => (<Button type="submit">Send</Button>)} />
  );

  expect(container).toMatchSnapshot();
});

it("renders Form with one text Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="text" type="text" label="Text" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Form with one text Field and one initialValues", () => {
  const {container} = render(
    <RBForm initialValues={{text: 'Text'}}>
      <Field name="text" type="text" label="Text" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});
it("renders Form with one text Field with defaultValue ", () => {
  const {container} = render(
    <RBForm>
      <Field name="text" type="text" label="Text" defaultValue="Default value" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Form with one text Field with defaultValue and one initialValues", () => {
  const {container} = render(
    <RBForm initialValues={{text: 'Text'}}>
      <Field name="text" type="text" label="Text" defaultValue="Default value" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Form with one text Field with value and one initialValues", () => {
  const {container} = render(
    <RBForm initialValues={{text: 'Text'}}>
      <Field name="text" type="text" label="Text" value="Value" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Form with two text Fields", () => {
  const {container} = render(
    <RBForm>
      <Field name="text_1" type="text" label="Text 1" />
      <Field name="text_2" type="text" label="Text 2" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Form with two text Fields and one initialValues", () => {
  const {container} = render(
    <RBForm initialValues={{text_1: 'Text 1'}}>
      <Field name="text_1" type="text" label="Text 1" />
      <Field name="text_2" type="text" label="Text 2" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Form with two text Fields and two initialValues", () => {
  const {container} = render(
    <RBForm initialValues={{text_1: 'Text 1', text_2: 'Text 2'}}>
      <Field name="text_1" type="text" label="Text 1" />
      <Field name="text_2" type="text" label="Text 2" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Form with one array Field with one text Field", () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array">
        <Field name="text" type="text" label="Text" />
      </FieldArray>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Form with one array Field with one text Field and one initialValues", () => {
  const {container} = render(
    <RBForm initialValues={{array: [{text: 'Text'}]}}>
      <FieldArray name="array">
        <Field name="text" type="text" label="Text" />
      </FieldArray>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders Form with one number Field with error", async () => {
  const {container} = render(
    <RBForm initialValues={{number: 0}}>
      <Field name="number" type="number" label="Number" min={1} />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const error = await screen.findByText('Error');
  const errorField = screen.findByText('number must be greater than or equal to 1');

  expect(container).toMatchSnapshot();
});

it("renders Form with one number Field with custom error", async () => {
  const {container} = render(
    <RBForm initialValues={{number: 0}} validationErrorText="Not Ok">
      <Field name="number" type="number" label="Number" min={1} />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const error = await screen.findByText('Not Ok');
  const errorField = screen.findByText('number must be greater than or equal to 1');

  expect(container).toMatchSnapshot();
});

it("renders Form with one number Field with success", async () => {
  const {container} = render(
    <RBForm initialValues={{number: 1}}>
      <Field name="number" type="number" label="Number" min={1} />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');

  expect(container).toMatchSnapshot();
});

it("renders Form with default success onSubmit", async () => {
  const {container} = render(
    <RBForm onSubmit={(values, success, failure) => {
      success();
    }}>
      <Field name="number" type="number" label="Number" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');

  expect(container).toMatchSnapshot();
});

it("renders Form with custom success onSubmit", async () => {
  const {container} = render(
    <RBForm onSubmit={(values, success, failure) => {
      success('OK');
    }}>
      <Field name="number" type="number" label="Number" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('OK');

  expect(container).toMatchSnapshot();
});

it("renders Form with default failure onSubmit", async () => {
  const {container} = render(
    <RBForm onSubmit={(values, success, failure) => {
      failure();
    }}>
      <Field name="number" type="number" label="Number" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const error = await screen.findByText('Error');

  expect(container).toMatchSnapshot();
});

it("renders Form with server failure onSubmit", async () => {
  const {container} = render(
    <RBForm onSubmit={(values, success, failure) => {
      failure({server: 'Not Ok'});
    }}>
      <Field name="number" type="number" label="Number" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const error = await screen.findByText('Not Ok');

  expect(container).toMatchSnapshot();
});

it("renders Form with field failure onSubmit", async () => {
  const {container} = render(
    <RBForm onSubmit={(values, success, failure) => {
      failure({field: {number: 'Field wrong'}});
    }}>
      <Field name="number" type="number" label="Number" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const errorServer = await screen.findByText('Error');
  const errorField = screen.findByText('Field wrong');

  expect(container).toMatchSnapshot();
});

it("renders Form with server and field failure onSubmit", async () => {
  const {container} = render(
    <RBForm onSubmit={(values, success, failure) => {
      failure({server: 'Not Ok', field: {number: 'Field wrong'}});
    }}>
      <Field name="number" type="number" label="Number" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const errorServer = await screen.findByText('Not Ok');
  const errorField = screen.findByText('Field wrong');

  expect(container).toMatchSnapshot();
});

it("renders Form with array failure onSubmit", async () => {
  const {container} = render(
    <RBForm onSubmit={(values, success, failure) => {
      failure({field: {data: [{}, {number: 'Field wrong'}]}});
    }}>
      <FieldArray name="data" initialSize={2}>
        <Field name="number" type="number" label="Number" />
      </FieldArray>
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const errorServer = await screen.findByText('Error');
  const errorField = screen.findByText('Field wrong');

  expect(container).toMatchSnapshot();
});
