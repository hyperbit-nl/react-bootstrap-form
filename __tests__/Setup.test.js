import React from 'react';
import { RBField as Field } from '../src/Field';
import { RBFieldArray as FieldArray } from '../src/FieldArray';
import { RBFormObjectRecursiveForEach } from '../src/Setup';

it('no initialValues, no fields', () => {
  const initialValuesForm = {};
  const children = [];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape).toEqual({});
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({});
  expect(values).toEqual({});
});

it('one initialValues, no fields', () => {
  const initialValuesForm = {name: 'Alice'};
  const children = [];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape).toEqual({});
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({});
  expect(values).toEqual({});
});

it('no initialValues, one empty text field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="text" label="Name" />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one initialValues, one empty text field', () => {
  const initialValuesForm = {name: 'Alice'};
  const children = [<Field name="name" type="text" label="Name" />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: 'Alice'});
});

it('no initialValues, one text d field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="text" label="Name" defaultValue="Foo" />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({name: 'Foo'});
  expect(values).toEqual({name: 'Foo'});
});

it('no initialValues, one text v field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="text" label="Name" value="Bob" />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({name: 'Bob'});
  expect(values).toEqual({name: 'Bob'});
});

it('one initialValues, one text d field', () => {
  const initialValuesForm = {name: 'Alice'};
  const children = [<Field name="name" type="text" label="Name" defaultValue="Foo" />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({name: 'Foo'});
  expect(values).toEqual({name: 'Alice'});
});

it('one initialValues, one text v field', () => {
  const initialValuesForm = {name: 'Alice'};
  const children = [<Field name="name" type="text" label="Name" value="Bob" />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({name: 'Bob'});
  expect(values).toEqual({name: 'Bob'});
});

it('no initialValues, one text dv field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="text" label="Name" defaultValue="Foo" value="Bob" />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({name: 'Bob'});
  expect(values).toEqual({name: 'Bob'});
});

it('one initialValues, one text vd field', () => {
  const initialValuesForm = {name: 'Alice'};
  const children = [<Field name="name" type="text" label="Name" defaultValue="Foo" value="Bob" />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({name: 'Bob'});
  expect(values).toEqual({name: 'Bob'});
});

it('one hidden field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="hidden" />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('mixed');
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one hidden text field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="text" label="Name" hidden />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(valuesHidden).toEqual({name: true});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one disabled text field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="text" label="Name" disabled />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(valuesHidden).toEqual({name: true});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one hidden hidden field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="hidden" hidden />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('mixed');
  expect(valuesHidden).toEqual({name: true});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one disabled hidden field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="hidden" disabled />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('mixed');
  expect(valuesHidden).toEqual({name: true});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one disabled hidden text field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="text" label="Name" disabled hidden />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(valuesHidden).toEqual({name: true});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one disabled hidden hidden field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="hidden" disabled hidden />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('mixed');
  expect(valuesHidden).toEqual({name: true});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one required text field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="text" label="Name" required />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);
  
  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(validationShape.name.exclusiveTests).toEqual({required: true});
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one required hidden field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="hidden" required />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);
  
  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('mixed');
  expect(validationShape.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one required hidden text field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="text" label="Name" required hidden />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(validationShape.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({name: true});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one required disabled text field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="text" label="Name" disabled required />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(validationShape.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({name: true});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one required hidden hidden field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="hidden" required hidden />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('mixed');
  expect(validationShape.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({name: true});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one required disabled hidden field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="hidden" disabled required />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('mixed');
  expect(validationShape.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({name: true});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one required disabled hidden text field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="text" label="Name" disabled required hidden />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('string');
  expect(validationShape.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({name: true});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one required disabled hidden hidden field', () => {
  const initialValuesForm = {};
  const children = [<Field name="name" type="hidden" disabled required hidden />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.name).toBeDefined();
  expect(validationShape.name.type).toEqual('mixed');
  expect(validationShape.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({name: true});
  expect(initialValues).toEqual({name: ''});
  expect(values).toEqual({name: ''});
});

it('one number field', () => {
  const initialValuesForm = {};
  const children = [<Field name="age" type="number" label="Age" />];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.age).toBeDefined();
  expect(validationShape.age.type).toEqual('number');
  expect(validationShape.age.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({});
  expect(initialValues).toEqual({age: ''});
  expect(values).toEqual({age: ''});
});

it('no initialValues, one array field with one empty text field', () => {
  const initialValuesForm = {};
  const children = [
    <FieldArray name="people">
      <Field name="name" type="text" label="Name" />
    </FieldArray>
  ];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.people).toBeDefined();
  expect(validationShape.people.type).toEqual('array');
  expect(validationShape.people.innerType.fields.name).toBeDefined();
  expect(validationShape.people.innerType.fields.name.type).toEqual('string');
  expect(validationShape.people.innerType.fields.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({people: {name: undefined}});
  expect(initialValues).toEqual({people: {name: ''}});
  expect(values).toEqual({people: [{name: ''}]});
});

it('one initialValues, one array field with one empty text field', () => {
  const initialValuesForm = {people: [{name: 'Alice'}]};
  const children = [
    <FieldArray name="people">
      <Field name="name" type="text" label="Name" />
    </FieldArray>
  ];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.people).toBeDefined();
  expect(validationShape.people.type).toEqual('array');
  expect(validationShape.people.innerType.fields.name).toBeDefined();
  expect(validationShape.people.innerType.fields.name.type).toEqual('string');
  expect(validationShape.people.innerType.fields.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({people: {name: undefined}});
  expect(initialValues).toEqual({people: {name: ''}});
  expect(values).toEqual({people: [{name: 'Alice'}]});
});

it('no initialValues, one array field with one text d field', () => {
  const initialValuesForm = {};
  const children = [
    <FieldArray name="people">
      <Field name="name" type="text" label="Name" defaultValue="Foo" />
    </FieldArray>
  ];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.people).toBeDefined();
  expect(validationShape.people.type).toEqual('array');
  expect(validationShape.people.innerType.fields.name).toBeDefined();
  expect(validationShape.people.innerType.fields.name.type).toEqual('string');
  expect(validationShape.people.innerType.fields.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({people: {name: undefined}});
  expect(initialValues).toEqual({people: {name: 'Foo'}});
  expect(values).toEqual({people: [{name: 'Foo'}]});
});

it('no initialValues, one array field with one text v field', () => {
  const initialValuesForm = {};
  const children = [
    <FieldArray name="people">
      <Field name="name" type="text" label="Name" value="Bob" />
    </FieldArray>
  ];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.people).toBeDefined();
  expect(validationShape.people.type).toEqual('array');
  expect(validationShape.people.innerType.fields.name).toBeDefined();
  expect(validationShape.people.innerType.fields.name.type).toEqual('string');
  expect(validationShape.people.innerType.fields.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({people: {name: undefined}});
  expect(initialValues).toEqual({people: {name: 'Bob'}});
  expect(values).toEqual({people: [{name: 'Bob'}]});
});

it('one initialValues, one array field with one text d field', () => {
  const initialValuesForm = {people: [{name: 'Alice'}]};
  const children = [
    <FieldArray name="people">
      <Field name="name" type="text" label="Name" defaultValue="Foo" />
    </FieldArray>
  ];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.people).toBeDefined();
  expect(validationShape.people.type).toEqual('array');
  expect(validationShape.people.innerType.fields.name).toBeDefined();
  expect(validationShape.people.innerType.fields.name.type).toEqual('string');
  expect(validationShape.people.innerType.fields.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({people: {name: undefined}});
  expect(initialValues).toEqual({people: {name: 'Foo'}});
  expect(values).toEqual({people: [{name: 'Alice'}]});
});

it('one initialValues, one array field with one text v field', () => {
  const initialValuesForm = {people: [{name: 'Alice'}]};
  const children = [
    <FieldArray name="people">
      <Field name="name" type="text" label="Name" value="Bob" />
    </FieldArray>
  ];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.people).toBeDefined();
  expect(validationShape.people.type).toEqual('array');
  expect(validationShape.people.innerType.fields.name).toBeDefined();
  expect(validationShape.people.innerType.fields.name.type).toEqual('string');
  expect(validationShape.people.innerType.fields.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({people: {name: undefined}});
  expect(initialValues).toEqual({people: {name: 'Bob'}});
  expect(values).toEqual({people: [{name: 'Bob'}]});
});

it('no initialValues, one array field with one text dv field', () => {
  const initialValuesForm = {};
  const children = [
    <FieldArray name="people">
      <Field name="name" type="text" label="Name" defaultValue="Foo" value="Bob" />
    </FieldArray>
  ];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.people).toBeDefined();
  expect(validationShape.people.type).toEqual('array');
  expect(validationShape.people.innerType.fields.name).toBeDefined();
  expect(validationShape.people.innerType.fields.name.type).toEqual('string');
  expect(validationShape.people.innerType.fields.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({people: {name: undefined}});
  expect(initialValues).toEqual({people: {name: 'Bob'}});
  expect(values).toEqual({people: [{name: 'Bob'}]});
});

it('one initialValues, one array field with one text vd field', () => {
  const initialValuesForm = {people: [{name: 'Alice'}]};
  const children = [
    <FieldArray name="people">
      <Field name="name" type="text" label="Name" defaultValue="Foo" value="Bob" />
    </FieldArray>
  ];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.people).toBeDefined();
  expect(validationShape.people.type).toEqual('array');
  expect(validationShape.people.innerType.fields.name).toBeDefined();
  expect(validationShape.people.innerType.fields.name.type).toEqual('string');
  expect(validationShape.people.innerType.fields.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({people: {name: undefined}});
  expect(initialValues).toEqual({people: {name: 'Bob'}});
  expect(values).toEqual({people: [{name: 'Bob'}]});
});

it('one initialValues, one array field with one array field with one text vd field', () => {
  const initialValuesForm = {people: [{titles: [{name: 'Alice'}, {name: 'Foo'}]}, {titles: [{name: 'Bob'}, {name: 'Bar'}]}]};
  const children = [
    <FieldArray name="people">
      <FieldArray name="titles" initialSize={2}>
        <Field name="name" type="text" label="Name" defaultValue="Foo" value="Bob" />
      </FieldArray>
    </FieldArray>
  ];

  const validationShape = {};
  const valuesHidden = {};
  const initialValues = {};
  const values = {};
  
  RBFormObjectRecursiveForEach(validationShape, valuesHidden, initialValues, initialValuesForm, values, children);

  expect(validationShape.people).toBeDefined();
  expect(validationShape.people.type).toEqual('array');
  expect(validationShape.people.innerType.fields.titles).toBeDefined();
  expect(validationShape.people.innerType.fields.titles.type).toEqual('array');
  expect(validationShape.people.innerType.fields.titles.innerType.fields.name).toBeDefined();
  expect(validationShape.people.innerType.fields.titles.innerType.fields.name.type).toEqual('string');
  expect(validationShape.people.innerType.fields.titles.innerType.fields.name.exclusiveTests).toEqual({});
  expect(valuesHidden).toEqual({people: {titles: {name: undefined}}});
  expect(initialValues).toEqual({people: {titles: [{name: 'Bob'}, {name: 'Bob'}]}});
  expect(values).toEqual({people: [{titles: [{name: 'Bob'}, {name: 'Bob'}]}, {titles: [{name: 'Bob'}, {name: 'Bob'}]}]});
});
