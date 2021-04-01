import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import moment from 'moment';
import { RBForm } from '../src/Form';
import { RBField as Field } from '../src/Field';

it('checks onChange of text Field', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="text" type="text" label="Text" />
    </RBForm>
  );

  const input = await screen.findByLabelText('Text');
  fireEvent.change(input, {target: {value: 'New'}});

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({text: 'New'});
});

it('checks onChange of number Field', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="number" type="number" label="Number" />
    </RBForm>
  );

  const input = await screen.findByLabelText('Number');
  fireEvent.change(input, {target: {value: '0'}});

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({number: 0});
});

it('checks onChange of textarea Field', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="textarea" type="textarea" label="Textarea" />
    </RBForm>
  );

  const input = await screen.findByLabelText('Textarea');
  fireEvent.change(input, {target: {value: 'New'}});

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({textarea: 'New'});
});

it('checks onChange of datetime Field', async () => {
  const datetimeValue = moment().format('L LT');

  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="datetime" type="datetime" label="Datetime" />
    </RBForm>
  );

  const input = await screen.findByLabelText('Datetime');
  fireEvent.change(input, {target: {value: datetimeValue}});

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({datetime: datetimeValue});
});

it('checks onChange of file Field', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="file" type="file" label="File" value={[new File([''], 'file.txt', {type: 'text/plain'})]} />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Success');

  expect(result.file).toBeDefined();
  expect(result.file).toHaveLength(1);
  expect(result.file[0]).toBeInstanceOf(File);
  expect(result.file[0].name).toEqual('file.txt');
  expect(result.file[0].size).toEqual(0);
  expect(result.file[0].type).toEqual('text/plain');
});

it('checks onChange of radio Field', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="radio" type="radio" label="Radio" options={[
        {value: 1, label: 'One'},
        {value: 2, label: 'Two'},
      ]} />
    </RBForm>
  );

  const input = await screen.findByLabelText('One');
  fireEvent.click(input);

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({radio: 1});
});

it('checks onChange of checkbox Field', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="checkbox" type="checkbox" label="Checkbox" />
    </RBForm>
  );

  const input = await screen.findByLabelText('Checkbox');
  fireEvent.click(input);

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({checkbox: true});
});

it('checks onChange of switch Field', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="switch" type="switch" label="Switch" />
    </RBForm>
  );

  const input = await screen.findByLabelText('Switch');
  fireEvent.click(input);

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({switch: true});
});

it('checks onChange of switch Field with hiddenLabel', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="switch" type="switch" label="Switch" hiddenLabel />
    </RBForm>
  );

  const input = await screen.findByLabelText('Switch');
  fireEvent.click(input);

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({switch: true});
});

it('checks onChange of react select Field', async () => {
  let result;

  render(
    <RBForm onSubmit={(values, success, failure) => {
      result = values;
      success();
    }}>
      <Field name="select" type="select" label="Select" options={[
        {value: 1, label: 'One'},
        {value: 2, label: 'Two'},
      ]} />
    </RBForm>
  );

  const input = await screen.findByLabelText('Select');
  fireEvent.change(input, {target: {value: 'T'}});

  const inpuSelect=  await screen.findByText('Two');
  fireEvent.click(inpuSelect);

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Success');
  
  expect(result).toEqual({select: {value: 2, label: 'Two'}});
});
