import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from 'react-bootstrap';
import { RBForm } from '../src/Form';
import { RBField as Field } from '../src/Field';
import { RBFieldArray as FieldArray } from '../src/FieldArray';

it('checks add child of default Array with one text Field', async () => {
  render(
    <RBForm>
      <FieldArray name="array">
        <Field name="text" type="text" label="Text" />
      </FieldArray>
    </RBForm>
  );

  const button = await screen.findByText('Add');
  fireEvent.click(button);
  const rows = await screen.findAllByLabelText('Text');

  expect(rows).toHaveLength(2);
});

it('checks remove child of default Array with two text Field', async () => {
  render(
    <RBForm>
      <FieldArray name="array" initialSize={2}>
        <Field name="text" type="text" label="Text" />
        <Button variant="danger" type="button" array-remove>X</Button>
      </FieldArray>
    </RBForm>
  );

  const button = await screen.findAllByText('X');
  fireEvent.click(button[0]);
  const rows = await screen.findAllByLabelText('Text');

  expect(rows).toHaveLength(1);
});
