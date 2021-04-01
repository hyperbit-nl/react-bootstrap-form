import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RBForm } from '../src/Form';
import { RBField as Field } from '../src/Field';
import { RBFieldArray as FieldArray } from '../src/FieldArray';

it('checks values of default Form', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }} />
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({})
});

it('checks values of Form with one text Field', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="text" type="text" label="Text" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({text: ''})
});

it('checks values of Form with initialValues and one text Field', async () => {
  let result;

  render(
    <RBForm initialValues={{text: 'Text'}} onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="text" type="text" label="Text"/>
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({text: 'Text'})
});

it('checks values of Form with one text Field with defaultValue', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="text" type="text" label="Text" defaultValue="Default value" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({text: 'Default value'})
});

it('checks values of Form with one text Field with value', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="text" type="text" label="Text" value="Value" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({text: 'Value'})
});

it('checks values of Form with one text Field with defaultValue and value', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="text" type="text" label="Text" defaultValue="Default value" value="Value" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({text: 'Value'})
});

it('checks values of Form with initialValues and one text Field with defaultValue', async () => {
  let result;

  render(
    <RBForm initialValues={{text: 'Text'}} onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="text" type="text" label="Text" defaultValue="Default value" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({text: 'Text'})
});

it('checks values of Form with initialValues and one text Field with value', async () => {
  let result;

  render(
    <RBForm initialValues={{text: 'Text'}} onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="text" type="text" label="Text" value="Value" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({text: 'Value'})
});

it('checks values of Form with initialValues and one text Field with defaultValue and value', async () => {
  let result;

  render(
    <RBForm initialValues={{text: 'Text'}} onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="text" type="text" label="Text" defaultValue="Default value" value="Value" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({text: 'Value'})
});

it('checks values of Form with one text Field with disabled', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="text" type="text" label="Text" disabled />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({})
});

it('checks values of Form with one array Field with one text Field with disabled', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <FieldArray name="array" initialSize={1}>
        <Field name="text" type="text" label="Text" disabled />
      </FieldArray>
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({array: [{}]})
});

it('checks values of Form with one select Field with multiple and disabled', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="select" type="select" label="Select" multiple disabled />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({})
});

it('checks values of Form with one array Field with one select Field with multiple and disabled', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <FieldArray name="array" initialSize={1}>
        <Field name="select" type="select" label="Select" multiple disabled />
      </FieldArray>
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({array: [{}]})
});

it('checks values of Form with one array Field with one array Field with one select Field with multiple and disabled', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <FieldArray name="array_1" initialSize={1}>
        <FieldArray name="array_2" initialSize={1}>
          <Field name="select" type="select" label="Select" multiple disabled />
        </FieldArray>
      </FieldArray>
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({array_1: [{array_2: [{}]}]})
});

it('checks values of Form with one select Field with multiple', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="select" type="select" label="Select" multiple />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({select: []})
});

it('checks values of Form with one array Field with one array Field with one select Field with multiple', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <FieldArray name="array_1" initialSize={1}>
        <FieldArray name="array_2" initialSize={1}>
          <Field name="select" type="select" label="Select" multiple />
        </FieldArray>
      </FieldArray>
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({array_1: [{array_2: [{select: []}]}]})
});
