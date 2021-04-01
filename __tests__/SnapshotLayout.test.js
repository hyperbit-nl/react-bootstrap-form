import React from 'react';
import { render, screen } from '@testing-library/react';
import { Col, Row } from 'react-bootstrap';
import { RBForm } from '../src/Form';
import { RBFieldGroup as FieldGroup  } from '../src/FieldGroup';
import { RBField as Field } from '../src/Field';
import { RBFieldArray as FieldArray } from '../src/FieldArray';

it("renders one text Col", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Col with default xs", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} xs />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Col with default xs and sm", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} xs sm />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Col with xs with 1 for span", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} xs={1} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Col with xs with auto for span", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} xs="auto" />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Col with xs with 1 for offset", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} xs={{offset: 1}} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Col with xs with 1 for order", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} xs={{order: 1}} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Col with xs with first for order", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} xs={{order: 'first'}} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Col with xs with object", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} xs={{span: true, offset: 1, order: 'last'}} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Col with default sm", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} sm />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Col with default md", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} md />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});
it("renders one text Col with default lg", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} lg />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});
it("renders one text Col with default xl", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text" type="text" label="Text" as={Col} xl />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two text Cols", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="text_1" type="text" label="Text 1" as={Col} sm={1} />
        <Field name="text_2" type="text" label="Text 2" as={Col} sm={1} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two file Cols", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="file_1" type="file" label="File 1" as={Col} sm={1} />
        <Field name="file_2" type="file" label="File 2" as={Col} sm={1} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two radio Cols", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="radio_1" type="radio" label="Radio 1" as={Col} sm={1}
          options={[
            {value: 0, label: "0"},
            {value: 1, label: "1"},
          ]}
        />
        <Field name="radio_2" type="radio" label="Radio 2" as={Col} sm={1}
          options={[
            {value: 0, label: "0"},
            {value: 1, label: "1"},
          ]}
        />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two checkbox Cols", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <Field name="checkbox_1" type="checkbox" label="Checkbox 1" as={Col} sm={1} />
        <Field name="checkbox_2" type="checkbox" label="Checkbox 2" as={Col} sm={1} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two Col Arrays", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <FieldArray name="array_1" as={Col} sm={1} />
        <FieldArray name="array_2" as={Col} sm={1} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two Col Arrays with label", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <FieldArray name="array_1" label="Array 1" as={Col} sm={1} />
        <FieldArray name="array_2" label="Array 2" as={Col} sm={1} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two Col Groups", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <FieldGroup id="group_1" label="Group 1" as={Col} sm={1} />
        <FieldGroup id="group_2" label="Group 2" as={Col} sm={1} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two Col Groups with hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <Row>
        <FieldGroup id="group_1" label="Group 1" hiddenLabel as={Col} sm={1} />
        <FieldGroup id="group_2" label="Group 2" hiddenLabel as={Col} sm={1} />
      </Row>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Row", async () => {
  const {container} = render(
    <RBForm>
      <Field name="text" type="text" label="Text" as={Row} />
    </RBForm>
  );

  await screen.findByText('Text');

  expect(container).toMatchSnapshot();
});

it("renders one text Row with hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <Field name="text" type="text" label="Text" hiddenLabel as={Row} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Row with xsLabel", () => {
  const {container} = render(
    <RBForm>
      <Field name="text" type="text" label="Text" as={Row} xsLabel={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Row with xsControl", () => {
  const {container} = render(
    <RBForm>
      <Field name="text" type="text" label="Text" as={Row} xsControl={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Row with xsLabel and xsControl", () => {
  const {container} = render(
    <RBForm>
      <Field name="text" type="text" label="Text" as={Row} xsLabel={1} xsControl={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Row with smLabel and smControl", () => {
  const {container} = render(
    <RBForm>
      <Field name="text" type="text" label="Text" as={Row} smLabel={1} smControl={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Row with mdLabel and mdControl", () => {
  const {container} = render(
    <RBForm>
      <Field name="text" type="text" label="Text" as={Row} mdLabel={1} mdControl={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Row with lgLabel and lgControl", () => {
  const {container} = render(
    <RBForm>
      <Field name="text" type="text" label="Text" as={Row} lgLabel={1} lgControl={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders one text Row with xlLabel and xlControl", () => {
  const {container} = render(
    <RBForm>
      <Field name="text" type="text" label="Text" as={Row} xlLabel={1} xlControl={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two Row Groups", () => {
  const {container} = render(
    <RBForm>
      <FieldGroup id="group_1" label="Group 1" as={Row} xlLabel={1} xlControl={1} />
      <FieldGroup id="group_2" label="Group 2" as={Row} xlLabel={1} xlControl={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two Row Groups with hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <FieldGroup id="group_1" label="Group 1" hiddenLabel as={Row} xlLabel={1} xlControl={1} />
      <FieldGroup id="group_2" label="Group 2" hiddenLabel as={Row} xlLabel={1} xlControl={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two file Rows", () => {
  const {container} = render(
    <RBForm>
      <Field name="file_1" type="file" label="File 1" as={Row} xlLabel={1} xlControl={1} />
      <Field name="file_2" type="file" label="File 2" as={Row} xlLabel={1} xlControl={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two radio Rows", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio_1" type="radio" label="Radio 1" as={Row} xlLabel={1} xlControl={1}
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
      />
      <Field name="radio_2" type="radio" label="Radio 2" as={Row} xlLabel={1} xlControl={1}
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two radio Rows with hiddelLabel", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio_1" type="radio" label="Radio 1" hiddelLabel as={Row} xlLabel={1} xlControl={1}
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
      />
      <Field name="radio_2" type="radio" label="Radio 2" hiddelLabel as={Row} xlLabel={1} xlControl={1}
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two checkbox Cols", () => {
  const {container} = render(
    <RBForm>
      <Field name="checkbox_1" type="checkbox" label="Checkbox 1" as={Row} xlLabel={1} xlControl={1} />
      <Field name="checkbox_2" type="checkbox" label="Checkbox 2" as={Row} xlLabel={1} xlControl={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two Row Arrays", () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array_1" as={Row} xlLabel={1} xlControl={1} />
      <FieldArray name="array_2" as={Row} xlLabel={1} xlControl={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two Row Arrays with label", () => {
  const {container} = render(
    <RBForm>
      <FieldArray name="array_1" label="Array 1" as={Row} xlLabel={1} xlControl={1} />
      <FieldArray name="array_2" label="Array 2" as={Row} xlLabel={1} xlControl={1} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});
