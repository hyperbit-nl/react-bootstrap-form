# React Bootstrap Form

![NPM](https://img.shields.io/npm/l/@hyperbit/react-bootstrap-form)
![npm (scoped)](https://img.shields.io/npm/v/@hyperbit/react-bootstrap-form)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/hyperbit-nl/react-bootstrap-form/build/master)

Powerful but easy-to-use form builder for React Bootstrap.

## Features

- Minimalistic API to create reusable Bootstrap forms within minutes.
- Customize the layout and style of the forms with the familiar Bootstrap API.
- Has all the basic HTML and Bootstrap input types available.
- Advanced Select Fields that can also do asynchronous filtering with react-select.
- Advanced Datetime Fields with moment and react-datetime.
- Array Fields that can add and remove rows of Fields.
- Render Fields dynamically by changing their props.
- Extensible form validation with yup.
- Callback for server-side error handling.
- Automatic ARIA attribute handling.
- Support to integrate custom Fields.

## Installation

```sh
npm install @hyperbit/react-bootstrap-form
```

### Dependencies

| Package | Version |
| - | - |
| [react](https://github.com/facebook/react) | ^17.0.2 |
| [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap) | ^1.5.2 |
| [yup](https://github.com/jquense/yup) | ^0.32.9 |
| [formik](https://github.com/formium/formik) | ^2.2.6 |

### Optional Dependencies

If you want to use the advanced Select Fields, please install the following:

| Package | Version |
| - | - |
| [react-select](https://github.com/JedWatson/react-select) | ^4.3.0 |

If you want to use the advanced Datetime Fields, please install the following:

| Package | Version |
| - | - |
| [moment](https://github.com/moment/moment) | ^2.29.1 |
| [react-datetime](https://github.com/arqex/react-datetime) | ^3.0.4 |

## Getting Started

Here is an example of how to setup a basic form with a text input:

```js
import React, { useState } from 'react';
import RBForm, { Field } from '@hyperbit/react-bootstrap-form';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@hyperbit/react-bootstrap-form/dist/css/react-bootstrap-form.min.css';

const initialValues = {
  example: 'Hello World!',
};

export default function App() {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = (values, success, failure) => {
    console.log(values);
    setValues(values);
    success();
  };

  return (
    <RBForm initialValues={values} onSubmit={handleSubmit}>
      <Field name="example" type="text" label="Example"></Field>
    </RBForm>
  );
}
```

## Usage

This section only gives details for common use cases. Please see the 'API' section for the complete overview of all the options.

### Form

The `<Form>` component will contsruct a form based on its child components. The `initialValues` prop can be used to pass values to associated `<Field>` components at first render. Please see the 'Field' section for more details about this. The `onSubmit` prop accepts a function that will be called after the component has been successfully submitted. When using the `onSubmit` prop, make sure to use the appropriate callback function to update the state of the component correctly. Please see 'Server-side Form Validation' section for more details about the `onSubmit` prop. If you are rendering a custom submit implementation with the `customSubmit` prop, make sure to initialize an element with the `type` prop set to `'submit'`.

Basic props:
- `initialValues`: object
- `validationErrorText`: string = `'Error'`
- `onSubmit`: `(values, success, failure) => {}`
- `customSubmit`: string | `(isWaiting, success, error) => (JSX)`

Import:

```js
import RBForm from '@hyperbit/react-bootstrap-form';
```

Initial values:

```js
<RBForm initialValues={{name: 'Hello'}}>
  <Field name="name" label="Name" />
</RBForm>
```

Statefull initial values:

```js
const [values, setValues] = useState({name: 'Hello'});

return (
  <RBForm initialValues={values}>
    <Field name="name" label="Name" />
  </RBForm>
);
```

On submit:

```js
const handleSubmit = (values, success, failure) => {
  console.log(values);

  setTimeout(() => {
    if (values.name === '') {
      failure({
        server: 'Oops',
        field: {name: 'Can\'t be empty'},
      });

    } else {
      success('Nice');
    }
  }, 500);
};

return (
  <RBForm onSubmit={handleSubmit}>
    <Field name="name" label="Name" />
  </RBForm>
);
```

Render custom submit:

```js
const handleSubmit = (values, success, failure) => {
  console.log(values);

  setTimeout(() => {
    if (values.name === '') {
      failure({
        server: 'Oops',
        field: {name: 'Can\'t be empty'},
      });

    } else {
      success('Nice');
    }
  }, 500);
};

const customSubmit = (isWaiting, success, error) => (
  <>
    <Button disabled={isWaiting} variant="primary" type="submit">Send</Button>
    <div>Success: <span className="rbf-text-green">{success}</span></div>
    <div>Error: <span className="rbf-text-red">{error}</span></div>
  </>
);

return (
  <RBForm onSubmit={handleSubmit} customSubmit={customSubmit}>
    <Field name="name" label="Name" />
  </RBForm>
);
```

### Group

The `<FieldGroup>` component is a wrapper to group multiple `<Field>` components together. It handles styling and semantics. Mainly used for `checkbox` and `switch` `<Field>` components. The `id` prop must be unique.

Basic props:
- `id`: string (required)
- `label`: string (required)
- `hiddenLabel`: boolean = `'false'`

Import:

```js
import { FieldGroup } from '@hyperbit/react-bootstrap-form';
```

Grouping checkboxes:

```js
<FieldGroup id="todo" label="To do list">
  <Field name="has_read" type="checkbox" label="Read book" />
  <Field name="has_cleaned" type="checkbox" label="Clean workplace" />
  <Field name="has_visited" type="checkbox" label="Visit parents" />
</FieldGroup>
```

### Field

The `<Field>` component will construct all the necessary elements for its given `type`. Generally these elements includes a `label` and a `input` element. The `name` prop is required to construct a identifier and must be unique. If the `initialValues` prop of the `<Form>` component is initialized, all the keys should match the `name` prop of a `<Field>` components. The order of precedence of the value at first render is: `value`, `initialValues` of the `<Form>` component, `defaultValue`. Please see the other sections for details about a specific `type`.

Basic props:
- `name`: string (required)
- `type`: string = `'input'`
- `label`: string (required)
- `hiddenLabel`: boolean = `'false'`
- `placeholder`: string
- `help`: JSX
- `disabled`: boolean = `'false'`
- `required`: boolean = `'false'`
- `defaultValue`: any
- `value`: any

Import:

```js
import { Field } from '@hyperbit/react-bootstrap-form';
```

Default input field:

```js
<Field name="example" label="Example" />
```

#### Basic

Basic props:
- `type`: `'input'` | `'text'` | `'search'` | `'password'` | `'email'` | `'tel'` | `'url'` | `'color'`

Text field:

```js
<Field name="name" type="text" label="Name" />
```

Password field:

```js
<Field name="password" type="password" label="Password" />
```

#### Textarea

Basic props:
- `type`: `'textarea'`
- `rows`: number

Textarea field:

```js
<Field name="description" type="textarea" rows={4} />
```

#### Number and Range

Basic props:
- `type`: `'number'` | `'range'`
- `max`: number
- `min`: number
- `step`: number | `'any'`

Number field:

```js
<Field name="number" type="number" label="Number" />
<Field name="age" type="number" label="Age" min={0} />
<Field name="amount" type="number" label="Amount" max={99} />
<Field name="price" type="number" label="Price" step="any" />
<Field name="participants" type="number" label="Participants" max={10} min={0} step={2} />
```

Range field:

```js
<Field name="speed" type="range" label="Speed" max={200} />
<Field name="rating" type="range" label="Rating" max={5} min={1} step={0.1} defaultValue={1} />
```

#### Checkbox and Switch

Use the `single` prop if the `<Field>` component is independent from its siblings. This will make sure that spacing is handled correctly. The default behavior is that immediate siblings will be stacked. Another option is to make them render inline with the `inline` prop. If the components are stacked or inline, these components should be wraped inside a `<FieldGroup>` component to automatically take care of styling and semantics. If the `required` prop is set to `true`, the component must be checked to be valid.

Basic props:
- `type`: `'checkbox'` | `'switch'`
- `single`: boolean = `false`
- `inline`: boolean = `false`

Single:

```js
{['checkbox', 'switch'].map((type) => (
  <div key={type}>
    <Field name={`${type}_single`} type={type} label="Single" single />
  </div>
))}
```

Stacked:

```js
{['checkbox', 'switch'].map((type) => (
  <div key={type}>
    <FieldGroup id={`${type}_stacked`} label="Stacked">
      <Field name={`${type}_stacked_1`} type={type} label="Stacked 1" />
      <Field name={`${type}_stacked_2`} type={type} label="Stacked 2" />
    </FieldGroup>
  </div>
))}
```

Inline:

```js
{['checkbox', 'switch'].map((type) => (
  <div key={type}>
    <FieldGroup id={`${type}_inline`} label="Inline">
      <Field name={`${type}_inline_1`} type={type} label="Inline 1" inline />
      <Field name={`${type}_inline_2`} type={type} label="Inline 2" inline />
    </FieldGroup>
  </div>
))}
```

No Label:

```js
{['checkbox', 'switch'].map((type) => (
  <div key={type}>
    <Field name={`${type}_no_label`} type={type} label="No label" hiddenLabel single />
  </div>
))}
```

Required:

```js
{['checkbox', 'switch'].map((type) => (
  <div key={type}>
    <Field name={`${type}_required`} type={type} label="Required" single required />
  </div>
))}
```

Initially checked):

```js
{['checkbox', 'switch'].map((type) => (
  <div key={type}>
    <Field name={`${type}_checked`} type={type} label="Checked" single defaultValue={true} />
  </div>
))}
```

#### Radio

The radio inputs can be added through the `options` prop. The value must be an array of objects, where every object has a `value` and `label` key. The value of the `value` key will be added to the form data.

Basic props:
- `type`: `'radio'`
- `options`: array (required)
- `inline`: boolean = `false`

Stacked:

```js
<Field name="status" type="radio" label="Status" options={[
  {value: 'online', label: 'Online'},
  {value: 'away', label: 'Away'},
  {value: 'offline', label: 'Offline'},
]} required defaultValue={'online'} />
```

Inline:

```js
<Field name="is_teacher" type="radio" label="Role" options={[
  {value: true, label: 'Teacher'},
  {value: false, label: 'Student'},
]} inline required />
```

#### Select (HTML)

The `select` `<Field>` component expects `option` elements as its direct children.

Basic props:
- `type`: `'select'`
- `multiple`: boolean = `false`
- `htmlSize`: number

Single select:

```js
<Field name="status" type="select" label="Status">
  <option disabled value="">Select...</option>
  <option>Online</option>
  <option>Offline</option>
</Field>
```

Multi select:

```js
<Field name="emotions" type="select" label="Emotions" multiple htmlSize={3} defaultValue={['Angry', 'Sad']}>
  <option>Happy</option>
  <option>Angry</option>
  <option>Sad</option>
</Field>
```

#### Select (React Select)

By setting the `options` prop on a `select` `<Field>` component, the component will behave like the input of `react-select`. The `react-select` package must be installed for this component to work. The `options` prop must be an array of objects, where every object has a `value` and `label` key. If the `async` prop is used, the `options` prop should be a function to retrieve the data and then return a promise with an array. Please see the 'API' section and the official documentation for more info about the usage.

Basic props:
- `type`: `'select'`
- `placeholder`: string = `'Select...'`
- `options`: array | `(inputValue) => (Promise)` (required)
- `isSearchable`: boolean = `true`
- `isClearable`: boolean = `false`
- `isCreatable`: boolean = `false`
- `isMulti`: boolean = `false`
- `noOptionsMessage`: `({inputValue}) => (JSX)` = `({inputValue}) => ('No options')`
- `async`: boolean = `false`
- `defaultOptions`: `[{value: string, label: string}]` | boolean
- `cacheOptions`: boolean = `false`

Normal select:

```js
<Field name="color" type="select" label="Color" options={[
  {value: 'red', label: 'Red'},
  {value: 'green', label: 'Green'},
  {value: 'blue', label: 'Blue'},
]} defaultValue={{value: 'red', label: 'Red'}} />
```

Async select field:

```js
<Field name="car" type="select" label="Car" options={(inputValue) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {value: 'volvo', label: 'Volvo'},
        {value: 'saab', label: 'Saab'},
        {value: 'mercedes', label: 'Mercedes'},
        {value: 'audi', label: 'Audi'},
      ]);
    }, 500);
  })
)} async cacheOptions />
```

Creatable multi select:

```js
<Field name="color" type="select" label="Color" options={[]} isCreatable isMulti />
```

#### Date (HTML)

Please note that the results are browser dependant.

Basic props:
- `type`: `'date'` | `'month'` | `'week'` | `'datetime-local'` | `'time'`
- `max`: string
- `min`: string
- `step`: number | `'any'`

Date fields:

```js
<Field name="datetime_local" type="datetime-local" label="Datetime" />
<Field name="date" type="date" label="Date" />
<Field name="month" type="month" label="Month" />
<Field name="week" type="week" label="Week" />
<Field name="time" type="time" label="Time" />
```

#### Datetime (React Datetime)

The `moment` and `react-datetime` packages must be installed to use this `<Field>` component. Please see the official documentations for the details, formats and locales.

Basic props:
- `type`: `'datetime'`
- `dateFormat`: string | boolean
- `timeFormat`: string | boolean
- `locale`: string

Import:

```js
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
```

Formats:

```js
<Field name="datetime" type="datetime" label="Datetime" />
<Field name="date" type="datetime" label="Date" timeFormat={false} />
<Field name="month" type="datetime" label="Month" dateFormat="YYYY-MM" timeFormat={false} />
<Field name="week" type="datetime" label="Week" dateFormat="GGGG-[W]WW" timeFormat={false} />
<Field name="time" type="datetime" label="Time" dateFormat={false} />
<Field name="seconds" type="datetime" label="Seconds" dateFormat={false} timeFormat="HH:mm:ss" />
```

Value types:

```js
<Field name="datetime_string" type="datetime" label="String" defaultValue="01/01/2021 12:00 PM" />
<Field name="datetime_number" type="datetime" label="Number" defaultValue={Date.now()} /> {/* number in milliseconds */}
<Field name="datetime_date_today" type="datetime" label="Date today" defaultValue={new Date()} />
<Field name="datetime_date" type="datetime" label="Date" defaultValue={new Date(2021, 0, 1)} />
<Field name="datetime_moment_today" type="datetime" label="Moment today" defaultValue={moment()} />
<Field name="datetime_moment" type="datetime" label="Moment" defaultValue={moment({year: 2021, month: 0, day: 1})} />
<Field name="datetime_format" type="datetime" label="Moment format" defaultValue={moment().format('L LT')} /> {/* string */}
```

Import moment locale:

```js
import 'moment/locale/nl';
```

Set locale:

```js
<Field name="datetime_nl" type="datetime" label="Datetime nl" locale="nl" defaultValue={moment()} />
```

#### File

Basic props:
- `type`: `'file'`
- `data-browse`: string = `'Browse'`
- `accept`: string
- `multiple`: boolean = `false`

Multiple image files:

```js
<Field name="images" type="file" label="Upload images" accept="image/*" multiple />
```

Required single pdf file:

```js
<Field name="document" type="file" label="Upload document" help="Please select a pdf file." accept=".pdf" required />
```

#### Hidden

The `hidden` `<Field>` component can be used to add data to the form that the user can't edit through the component itself. This component won't render anything in the DOM. The data can be provide through the `value` prop, the `initialValues` prop of the `<Form>` component or the `defaultValue` prop, in that order of precedence. Unlike other `<Field>` components, initializing the `label` prop won't do anything and is therefore not required.

Basic props:
- `type`: `'hidden'`

Hidden field to add the uid to the form data:

```js
<Field name="uid" type="hidden" value={1} />
```

### Array

The `<FieldArray>` component allows the user to fill in data that is structured as an array. The component will generate a row of its children that can be added or removed by the user. The `name` prop is required and must be unique. When using the `initialValues` prop of the `<Form>` component, the `name` prop of the `<FieldArray>` components must have an associated key in the object. The value of these keys must be an array of objects, where every key should then match the `name` prop of a `<Field>` component that is living under that `<FieldArray>` component. Please see the 'Initial values' snippet for an example. An element with the `array-remove` prop should be added manually inside the `<FieldArray>` component to allow the user to remove a row. By default a `<Button>` component will be rendered at the end of the `<FieldArray>` component to allow the user to add a new row. This behavior can be change with the `addButton` prop.

Basic props:
- `name`: string (required)
- `label`: string
- `initialSize`: number = `1`
- `addButton`: boolean | `(addFunction) => (JSX)` = `true`
- `noRowsMessage`: JSX

Import:

```js
import { FieldArray } from '@hyperbit/react-bootstrap-form';
```

Basic array field:

```js
<FieldArray name="peoples">
  <Form.Row>
    <Field name="name" type="text" label="Name" as={Col} />
    <Field name="age" label="number" label="Age" as={Col} />
    <Col xs="auto" className="d-flex">
      <Button className="align-self-start" style={{marginTop: 'calc(1.5rem + 8px)'}} variant="danger" type="button" array-remove>X</Button>
    </Col>
  </Form.Row>
</FieldArray>
```

Button in front by using breakpoint prop:

```js
<FieldArray name="peoples">
  <Form.Row>
    <Field name="name" type="text" label="Name" as={Col}/>
    <Field name="age" label="number" label="Age" as={Col} />
    <Col xs={{span: 'auto', order: 'first'}} className="d-flex">
      <Button className="align-self-start" style={{marginTop: 'calc(1.5rem  + 8px)'}} variant="danger" type="button" array-remove>X</Button>
    </Col>
  </Form.Row>
</FieldArray>
```

Custom add button:

```js
<FieldArray name="peoples" addButton={(addFunction) => (
  <div className="mb-3">
    Create another person:
    <Button className="ml-2" variant="primary" type="button" onClick={addFunction}>Add</Button>
  </div>
)}>
  <Form.Row>
    <Field name="name" type="text" label="Name" as={Col} />
    <Field name="age" label="number" label="Age" as={Col} />
  </Form.Row>
</FieldArray>
```

Locked rows:

```js
<FieldArray name="peoples" initialSize={2} addButton={false}>
  <Form.Row>
    <Field name="name" type="text" label="Name" as={Col} />
    <Field name="age" label="number" label="Age" as={Col} />
  </Form.Row>
</FieldArray>
```

Initial values:

```js
<RBForm initialValues={{
  peoples: [
    {name: 'Bob', age: 18},
    {name: 'Alice'},
  ]
}}>
  <FieldArray name="peoples" initialSize={3}>
    <Form.Row>
      <Field name="name" type="text" label="Name" as={Col}/>
      <Field name="age" label="number" label="Age" as={Col} />
      <Col xs="auto" className="d-flex">
        <Button className="align-self-start" style={{marginTop: 'calc(1.5rem  + 8px)'}} variant="danger" type="button" array-remove>X</Button>
      </Col>
    </Form.Row>
  </FieldArray>
</RBForm>
```

Label text:

```js
<FieldArray name="peoples" label="People" />
```

Nested array field:

```js
<RBForm initialValues={{
  companies: [
    {
      name: 'Apple',
      products: [
        {name: 'iPhone', price: 799},
      ],
    },
  ]
}}>
  <FieldArray name="companies">
    <Form.Row>
      <Col xs={2}>Company</Col>
      <Field name="name" type="text" label="Company" hiddenLabel as={Col} />
      <Col xs="auto" className="d-flex">
        <Button className="align-self-start" variant="danger" type="button" array-remove>Delete</Button>
      </Col>
    </Form.Row>

    <Form.Row>
      <Col xs={2}>Products</Col>
      <FieldArray name="products" as={Col}>
        <Form.Row>
          <Field name="name" type="text" label="Name" hiddenLabel placeholder="Name" as={Col}/>
          <Field name="price" type="number" label="Price" hiddenLabel placeholder="Price" as={Col}/>
          <Col xs="auto" className="d-flex">
            <Button className="align-self-start" variant="danger" type="button" array-remove>X</Button>
          </Col>
        </Form.Row>
      </FieldArray>
    </Form.Row>
  </FieldArray>
</RBForm>
```

### Layout

This section shows how the form can be rendered with different layouts by using the Bootstrap api.

#### Cols

A `<Field>`, `<FieldGroup>` or `<FieldArray>` component will behave like a Booststrap `<Col>`, when the `as` prop is set to `Col`. The breakpoints can be initialized by using the `xs`, `sm`, `md`, `lg` and `xl` props. Alternatively, the components can be wrapped inside a regular `<Col>` component. See the other layout sections for more detailed examples.

Import:

```js
import { Form, Col, Row } from 'react-bootstrap';
```

Form grid:

```js
<Row>
  <Field name="email" type="email" label="Email" as={Col} required />
  <Field name="password" type="password" label="Password" as={Col} required />
</Row>
```

Form row:

```js
<Form.Row>
  <Field name="email" type="email" label="Email" as={Col} required />
  <Field name="password" type="password" label="Password" as={Col} required />
</Form.Row>
```

Group field:

```js
<Form.Row>
  <FieldGroup id="property" label="Property" as={Col}>
    <Field name="property_name" type="text" label="Name" hiddenLabel />
    <Field name="property_value" type="range" label="Value" hiddenLabel />
  </FieldGroup>

  <FieldGroup id="user" label="User" hiddenLabel as={Col}>
    <Field name="status" type="radio" label="Status" options={[
      {value: 'online', label: 'Online'},
      {value: 'away', label: 'Away'},
      {value: 'offline', label: 'Offline'},
    ]} required defaultValue={'online'} />
    <Field name="status_message" type="text" label="Message" hiddenLabel placeholder="Message" />
  </FieldGroup>
</Form.Row>
```

Array field:

```js
<Form.Row>
  <FieldArray name="numbers" as={Col}>
    <Form.Row>
      <Field name="number" type="number" label="Number" hiddenLabel placeholder="Number" as={Col} required />
      <Col xs="auto" className="d-flex">
        <Button className="align-self-start" variant="danger" type="button" array-remove>X</Button>
      </Col>
    </Form.Row>
  </FieldArray>

  <FieldArray name="booleans" as={Col}>
    <Row>
      <Field name="boolean" type="checkbox" label="Boolean" as={Col} />
      <Col xs="auto" className="d-flex">
        <Button className="align-self-start" variant="danger" type="button" array-remove>X</Button>
      </Col>
    </Row>
  </FieldArray>
</Form.Row>
```

Single Checkboxes and Switches:

```js
{['checkbox', 'switch'].map((type) => (
  <FieldGroup key={type} id={type} label={type}>
    <Form.Row>
      <Field name={`${type}_single_col_1`} type={type} label="Single 1" as={Col} single />
      <Field name={`${type}_single_col_2`} type={type} label="Single 2" as={Col} single />
    </Form.Row>
  </FieldGroup>
))}
```

Grouped Checkboxes and Switches:

```js
{['checkbox', 'switch'].map((type) => (
  <FieldGroup key={type} id={type} label={type}>
    <Form.Row>
      <FieldGroup id={`${type}_stacked_col`} label="Stacked" hiddenLabel as={Col}>
        <Field name={`${type}_stacked_col_1`} type={type} label="Stacked 1" />
        <Field name={`${type}_stacked_col_2`} type={type} label="Stacked 2" />
      </FieldGroup>

      <FieldGroup id={`${type}_inline_col`} label="Inline" hiddenLabel as={Col}>
        <Field name={`${type}_inline_col_1`} type={type} label="Inline 1" inline />
        <Field name={`${type}_inline_col_2`} type={type} label="Inline 2" inline />
      </FieldGroup>
    </Form.Row>
  </FieldGroup>
))}
```

#### Rows

A `<Field>`, `<FieldGroup>` or `<FieldArray>` component can be rendered horizontally by setting the `as` prop to `Row`. It will then behave like a Bootstrap `<Row>` with two `<Col>` components: one for the 'Label' and one for the 'Control' section. The breakpoints can be initialized by using the `xsLabel`, `smLabel`, `mdLabel`, `lgLabel` and `xlLabel` props and the `xsControl`, `smControl`, `mdControl`, `lgControl` and `xlControl` props respectively. See the other layout sections for more detailed examples.

Import:

```js
import { Form, Col, Row } from 'react-bootstrap';
```

Fields:

```js
<Field name="group" label="Group" as={Row} xsLabel={2} xsControl={10} required />
<Field name="is_private" type="checkbox" label="Private" as={Row} xsLabel={2} />
```

Stacked Group:

```js
<FieldGroup id="about_me" label="About Me" as={Row} xsLabel={2} xsControl={10}>
  <Field name="name" label="Name" required />
  <Field name="role" type="radio" label="Role" options={[
    {value: 'admin', label: 'Admin'},
    {value: 'user', label: 'User'},
  ]} required />
</FieldGroup>
```

Row Group:

```js
<FieldGroup id="about_me" label="About Me" as={Row} xsLabel={2}>
  <Field name="name" label="Name" as={Row} xsLabel={2} required />
  <Field name="role" type="radio" label="Role" options={[
    {value: 'admin', label: 'Admin'},
    {value: 'user', label: 'User'},
  ]} as={Row} xsLabel={2} inline required />
</FieldGroup>
```

Inline Group:

```js
<FieldGroup id="about_me" label="About Me" as={Row} xsLabel={2}>
  <Row>
    <Field name="name" label="Name" as={Col} required />
    <Field name="role" type="radio" label="Role" options={[
      {value: 'admin', label: 'Admin'},
      {value: 'user', label: 'User'},
    ]} as={Col} required />
  </Row>
</FieldGroup>
```

Array:

```js
<FieldArray name="members" label="Members" initialSize={1} as={Row} xsLabel={2}>
  <Form.Row>
    <Field name="name" type="text" label="Name" hiddenLabel placeholder="Name" as={Col} required />
    <Col xs="auto" className="d-flex">
      <Button className="align-self-start" variant="danger" type="button" array-remove>X</Button>
    </Col>
  </Form.Row>
</FieldArray>
```

Single Checkboxes and Switches:

```js
{['checkbox', 'switch'].map((type) => (
  <FieldGroup key={type} id={type} label={type} hiddenLabel>
    <Field name={`${type}_single_row_normal`} type={type} label="Single Normal" as={Row} xsLabel={2} single />
  </FieldGroup>
))}
```

Single Checkboxes and Switches with text in 'Label' section:

```js
{['checkbox', 'switch'].map((type) => (
  <FieldGroup key={type} id={type} label={type} hiddenLabel>
    <Form.Group as={Row}>
      <Col xs={2}>Single</Col>
      <Field name={`${type}_single_row_no_label`} type={type} label="Single No Label" hiddenLabel as={Col} single />
    </Form.Group>
  </FieldGroup>
))}
```

Stacked Checkboxes and Switches:

```js
{['checkbox', 'switch'].map((type) => (
  <FieldGroup key={type} id={type} label={type} hiddenLabel>
    <FieldGroup id={`${type}_stacked_row`} label="Stacked" as={Row} xsLabel={2} >
      <Field name={`${type}_stacked_row_1`} type={type} label="Stacked 1" />
      <Field name={`${type}_stacked_row_2`} type={type} label="Stacked 2" />
    </FieldGroup>
  </FieldGroup>
))}
```

Inline Checkboxes and Switches:

```js
{['checkbox', 'switch'].map((type) => (
  <FieldGroup key={type} id={type} label={type} hiddenLabel>
    <FieldGroup id={`${type}_inline_row`} label="Inline" as={Row} xsLabel={2} >
      <Field name={`${type}_inline_row_1`} type={type} label="Inline 1" inline />
      <Field name={`${type}_inline_row_2`} type={type} label="Inline 2" inline />
    </FieldGroup>
  </FieldGroup>
))}
```

#### Col Sizing

```js
<Form.Row>
  <Field name="city" label="City" hiddenLabel placeholder="City" as={Col} xs={7} />
  <Field name="state" label="State" hiddenLabel placeholder="State" as={Col} />
  <Field name="zip" label="Zip" hiddenLabel placeholder="Zip" as={Col} />
</Form.Row>
```

#### Col Auto-sizing

```js
<Form.Row className="align-items-center">
  <Field name="name" type="text" label="Name" hiddenLabel placeholder="Jane Doe" as={Col} xs="auto" />
  <Field name="username" type="text" label="Username" hiddenLabel placeholder="Enter username" as={Col} xs="auto" />
  <Field name="is_remember" type="checkbox" label="Remember me" as={Col} xs="auto" single />
</Form.Row>
```

#### Col Ordering

```js
<Form.Row>
  <Field name="first" label="First" hiddenLabel placeholder="1 -> 1" as={Col} xs />
  <Field name="second" label="Second" hiddenLabel placeholder="2 -> last" as={Col} xs={{order: 'last'}} />
  <Field name="third" label="Third" hiddenLabel placeholder="3 -> 2" as={Col} xs={{order: 2}} />
</Form.Row>
```

### Styling

#### Disabled

When a `<Field>` component is `disabled`, the component will be rendered with a greyed out `input` element and the user won't be able to interact with it. This prop also ensures that the value won't be added to the form data and is therefore ignored for validation.

Disabled fields:

```js
<Field name="text_disabled" type="text" label="Text" disabled />
```

#### Size

The `size` prop makes a `<Field>`, `<FieldGroup>` or `<FieldArray>` component bigger or smaller with `'lg'` and `'sm'` respectively. This doesn't apply to the input section of `range`, `checkbox`, `switch`, `radio`, `select` (react-select) and `file` `<Field>` components.

```js
<Field name="large_text" type="text" label="Large" placeholder="Enter large text" size={'lg'} />
<Field name="normal_text" type="text" label="Normal" placeholder="Enter normal text" />
<Field name="small_text" type="text" label="Small" placeholder="Enter small text" size={'sm'} />
```

#### Read Only and Plaintext

These props can only be applied to `<Field>` components that will render a regular text-based `input` element. The value of the component will still be added to the form data if the `readOnly` prop is set. Note that this is not the case for the `disabled` prop.

Read only:

```js
<Field name="read_only" label="Read only" hiddenLabel readOnly defaultValue="Read only" />
```

Plaintext:

```js
<Field name="plaintext" label="Plaintext" hiddenLabel plaintext defaultValue="Plaintext" />
```

Read only plaintext:

```js
<Field name="read_only_plaintext" label="Read only plaintext" hiddenLabel readOnly plaintext defaultValue="Read only plaintext" />
```

Disabled plaintext:

```js
<Field name="disabled_plaintext" label="Disabled plaintext" hiddenLabel plaintext disabled defaultValue="Disabled plaintext" />
```

#### Help Text

```js
<Field name="url" type="url" label="Website" help="Enter the url of your website, including the 'http://' part." required />

<Field name="tz" type="text" label="Timezone" help={
  <span>
    Please enter a tz database name. A list of all the values can be found <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones" target="_blank">here</a>.
  </span>
} />
```

### Dynamic Field

When changing the state of the `initialValues` prop of the `<Form>` component through a `onChange` prop of a `<Field>` component, make sure to update its own value manually, since internally the state is updated asynchronously. 

Render value-dependent field:

```js
const initialValues = {
  has_quantity: false,
};

export default function App() {
  const [values, setValues] = useState(initialValues);
  const [hasQuantity, setHasQuantity] = useState(initialValues.has_quantity);

  const handleSubmit = (values, success, failure) => {
    console.log(values);
    setValues(values);
    success();
  };

  return (
    <RBForm initialValues={values} onSubmit={handleSubmit}>
      <Field name="has_quantity" type="checkbox" label="Has Quantity" value={hasQuantity} onChange={(value) => {setHasQuantity(value)}} />
      <Field name="quantity" type="number" label="Quantity" required hidden={!hasQuantity} />
    </RBForm>
  );
}
```

Shared field value:

```js
const initialValues = {
  
};

export default function App() {
  const [values, setValues] = useState(initialValues);
  const [isValueCustom, setIsValueCustom] = useState(false);
  
  const handleSubmit = (values, success, failure) => {
    const valuesCleaned = {...values};

    if (isValueCustom) {
      valuesCleaned.value = valuesCleaned.value_custom;
      delete valuesCleaned.value_custom;

    } else {
      delete valuesCleaned.value_custom;
    }

    // The object is now ready to be sent to an api server.
    console.log(valuesCleaned);

    const isCustom = !(['5', '10', '20', '50'].includes(String(valuesCleaned.value)));

    if (isCustom) {
      valuesCleaned.value_custom = valuesCleaned.value;
      valuesCleaned.value = 'value_custom';
    }

    // The object is now usable as initialValues (needed when initializing the form with data from an api server).
    setValues(valuesCleaned);
    setIsValueCustom(isCustom);

    success();
  };

  return (
    <RBForm initialValues={values} onSubmit={handleSubmit}>
      <Field name="value" type="select" label="Value" required onChange={(value) => setIsValueCustom(value === 'value_custom')}>
        <option disabled value="">Select...</option>
        <option>5</option>
        <option>10</option>
        <option>20</option>
        <option>50</option>
        <option value="value_custom">Custom</option>
      </Field>
      <Field name="value_custom" type="number" label="Custom value" hiddenLabel required hidden={!isValueCustom} />
    </RBForm>
  );
}
```

Update initial values of the form:

```js
const initialValues = {
  value_select: 5,
};

export default function App() {
  const [values, setValues] = useState(initialValues);
  const [isValueCustom, setIsValueCustom] = useState(false);
  
  const updateValueState = (values, type) => {
    setValues(values);
    setIsValueCustom(type);
  };

  const getIsRequired = (type) => {
    if (isValueCustom == null) {
      return true;
    }

    return type ? isValueCustom : !isValueCustom;
  };

  const handleSubmit = (values, success, failure) => {
    console.log(values);
    setValues(values);
    success();
  };

  return (
    <RBForm initialValues={values} onSubmit={handleSubmit}>
      <FieldGroup id="value" label="Value">
        <Field
          name="value_select"
          type="radio"
          label="Value" hiddenLabel
          options={[
            {value: 5, label: '5'},
            {value: 10, label: '10'},
            {value: 20, label: ' 20'},
            {value: 50, label: ' 50'},
          ]}
          inline
          required={getIsRequired(false)}
          onChange={(value_select) => updateValueState(
            {...values, value_select, value_custom: ''}, false
          )
        } />
        <Field
          name="value_custom"
          type="number"
          label="Custom value" hiddenLabel
          required={getIsRequired(true)}
          onChange={(value_custom) => updateValueState(
            {...values, value_select: null, value_custom}, true
          )
        } />
      </FieldGroup>
    </RBForm>
  );
}
```

### Server-side Form Validation

The `onSubmit` prop of the `<Form>` component can be used to send the form data to an api server. When the `<Form>` has been successfully submitted, the function of the `onSubmit` prop will be called. The first argument is the form data: an object with the value of all the active `<Field>` components. The second and third arguments are callback functions that should be used to let the `<Form>` know whenever or not the request was successful. The first callback is the success handler and accepts an optional response message. The second callback is a failure handler that accepts an optional object with two keys. The `server` key is a general error message. The `field` key is an object where each key should refer to a `<Field>` component through its `name` prop. The value of the key should be the error message of that field.

Server-side validation:

```js
const initialValues = {
  name: '',
  age: '',
};

export default function App() {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = (values, success, failure) => {
    console.log(values);

    setTimeout(() => {
      const error = {
        server: 'There are value errors. Please check the invalid input fields.',
        field: {},
      }

      if (values.name === '') {
        error.field.name = 'Can\'t be empty.'
      }

      if (values.age === '') {
        error.field.age = 'Can\'t be empty.'

      } else if (values.age < 0) {
        error.field.age = 'Can\'t be negative.'
      }

      if (Object.keys(error.field).length > 0) {
        failure(error);

      } else {
        setValues(values);
        success('The forum has been successfully submitted.');
      }
    }, 500);
  };

  return (
    <RBForm initialValues={values} onSubmit={handleSubmit}>
      <Field name="name" type="text" label="Name" />
      <Field name="age" type="number" label="Age" />
    </RBForm>
  );
}
```

### Custom Field Validation

Different validation logic for the `<Field>` components can be defined by initializing the `validation` prop with a yup validation shape as value. If the `<Field>` component is required to be filled in, always use the `required` prop instead of adding this to the validation shape. Please see the official documentation for a list of all the options to create a shape.

Import:

```js
import * as yup from 'yup';
```

Custom field validation:

```js
<Field name="password" type="password" label="Password" required validation={
  yup.string().min(8, 'Password must be at least 8 characters long')
} />
<Field name="password_confirm" type="password" label="Confirm Password" required validation={
  yup.string().oneOf([yup.ref('password')], 'Password doesn\'t match')
} />
```

### Validation Locale

To use custom validation locale, pass the `yup` module with the initialized locale to the `<Form>` component through the `validation` prop. Keep in mind that the locale won't apply for the messages defined in 'Custom Field Validation'. Please see the official documentation for more details and support for multiple languages.

Custom validation locale:

```js
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Required'
  },
  number: {
    min: 'Value must be greater than or equal to ${min}',
  }
});

export default function App() {
  return (
    <RBForm>
      <Field name="name" type="text" label="Name" validation={yup} required />

      <Field name="amount" type="number" label="Amount" validation={
        yup.number().min(10)
      } required />

      <Field name="age" type="number" label="Age" validation={
        yup.number().min(18, 'You must be at least 18 years old to continue.')
      } required />
    </RBForm>
  );
}
```

### Custom Field Component

A custom Field component can be created by initializing the `customInput` prop on any component. That component must have an unique `name` prop. To update the value of the component, the `onChange` prop must be called with the input value as argument. The value can be accessed through the `value` prop. The `type` prop can be defined for validation purposes. When using the `validation` prop, the `error` prop can be used to retrive information about the validation and the `isValid` and `IsInvalid` props can be used after the form has been submitted unsuccessfully for even more control. Instead of adding the 'required' rule to the validation shape, always use the `required` prop. Please see to the 'Custom Field Validation' section for the details about custom validation and see the 'Validation Locale' section for detail about the locale.

Basic props:
- `customInput`: `true`
- `name`: string (required)
- `type`: string
- `required`: boolean = `false`
- `disabled`: boolean = `false`
- `hidden`: boolean = `false`
- `defaultValue`: any
- `value`: any
- `validation`: yup

Custom text field:

```js
const TextField = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  }

  return (
    <>
      <label htmlFor={props.name}>{props.label}</label><br />
      <input type="text" id={props.name} defaultValue={props.value} onChange={handleChange} /><br />
      {props.isInvalid && <div>{props.error}</div>}
    </>
  );
};

export default function App() {
  const handleSubmit = (values, success, failure) => {
    console.log(values);
    success();
  };

  return (
    <RBForm initialValues={{name: 'Alice'}} onSubmit={handleSubmit}>
      <TextField customInput name="name" label="Name" required />
      <TextField customInput name="info" label="Info" required />
      <TextField customInput name="number_only" type="number" label="Number only" required defaultValue="Wrong value" />
    </RBForm>
  );
}
```

## Showcase

### Sign Up Form

```js
export default function App() {
  const handleSubmit = (values, success, failure) => {
    console.log(values);
    success();
  };

  return (
    <RBForm onSubmit={handleSubmit} customSubmit="Sign up">
      <Field name="email" type="email" label="Email address" placeholder="Enter email" help="We'll never share your email with anyone else." required />
      <Field name="password" type="password" label="Password" placeholder="Enter password" required />
      <Field name="is_accept_terms" type="checkbox" label="Accept terms" single required />
    </RBForm>
  );
}
```

### Residential Form

```js
export default function App() {
  const handleSubmit = (values, success, failure) => {
    console.log(values);
    success();
  };

  return (
    <RBForm onSubmit={handleSubmit}>
      <Field name="address" type="text" label="Address" placeholder="1234 Main St" required />
      <Field name="address_alt" type="text" label="Address 2" placeholder="Apartment, studio, or floor" />

      <Form.Row>
        <Field name="city" type="text" label="City" placeholder="Enter city" as={Col} required />
        <Field name="State" type="select" label="State" as={Col} options={[
          {value: 'AL', label: 'Alabama'},
          {value: 'CA', label: 'California'},
          {value: 'DE', label: 'Delaware'},
        ]} isClearable required />
        <Field name="zip" type="text" label="Zip" placeholder="Enter zip" as={Col} required />
      </Form.Row>
    </RBForm>
  );
}
```

### Horizontal Login Form

```js
export default function App() {
  const handleSubmit = (values, success, failure) => {
    console.log(values);
    success();
  };

  return (
    <RBForm onSubmit={handleSubmit}>
      <Field name="email" type="email" label="Email" placeholder="Enter email" as={Row} xsLabel={2} required />
      <Field name="password" type="password" label="Password" placeholder="Enter password" as={Row} xsLabel={2} required />

      <Field name="status" type="radio" label="Status" as={Row} xsLabel={2} options={[
        {value: 0, label: 'Online'},
        {value: 1, label: 'Away'},
        {value: 2, label: 'Offline'},
      ]} required value={0} />

      <Field name="is_remember" type="checkbox" label="Remember me" as={Row} xsLabel={2} single />
    </RBForm>
  );
}
```

## API

### Form

| Prop | Type | Default | Description |
| - | - | - | - |
| `initialValues` | object | | The values of the Fields that will be used at first render. Every key should matches the `name` prop of a `<Field>` or `<FieldArray>`. If the key is associated with an `<FieldArray>`, the value must be a array of objects, where every key should match a `<Field>` or another `<FieldArray>`. If the value of a key shouldn’t be changed by the `<Field>`, set the `type` prop to `hidden`. |
| `validationErrorText` | string | `'Error'` | The text that will be shown when there is a validation error after submit. |
| `onSubmit` | `(values, success, failure) => {}` | | Called when the `<Form>` has been submitted and validated successfully. Mainly used for server-side validation. The function callback passes three arguments: the values of the form data, a success handler and a failure handler. The success handler accepts a string and the failure handler accepts an object with two keys: `server` and `field`. The `server` key should have a string as value, while the `field` key should have an object. This object follows the same logic as the `initialValues` prop, but the value will be used to show `<Field>` specific errors. |
| `customSubmit` | `(isWaiting, success, error) => (JSX)` | | Overrides the default submit button, loading indicator and status messages with a custom submit section. The `isWaiting` arguments is a boolean and the `success` and `error` arguments are strings. To hook an element with the submit function, use the `type` prop with `'submit'` as value. |

### Group

| Prop | Type | Default | Description |
| - | - | - | - |
| `id` | string (required) | | The identifier of the `<FieldGroup>`. Must be unique. |
| `label` | string (required) | | The text that will be shown. |
| `hiddenLabel` | boolean | `false` | Hides the label. |
| `as` | `Col` \| `Row` | | |
| `xs`<br>`sm`<br>`md`<br>`lg`<br>`xl` | boolean \| number \| `'auto'` \| `{span: boolean \| number \| 'auto', offset: number, order: number \| 'first' \| 'last'}` | | |
| `xsLabel`<br>`smLabel`<br>`mdLabel`<br>`lgLabel`<br>`xlLabel` | number | | |
| `xsControl`<br>`smControl`<br>`mdControl`<br>`lgControl`<br>`xlControl` | number | | |

### Field

| Prop | Type | Default | Description |
| - | - | - | - |
| `name` | string (required) | | The identifier of the `<Field>` that is needed to keep track of its value and states internally. Must be unique. |
| `type` | `'input'` \| `'text'` \| `'search'` \| `'password'` \| `'email'` \| `'tel'` \| `'url'` \| `'color'` \| `'textarea'` \| `'number'` \| `'range'` \| `'checkbox'` \| `'switch'` \| `'radio'` \| `'select'` \| `'date'` \| `'month'` \| `'week'` \| `'datetime-local'` \| `'time'` \| `'datetime'` \| `'file'` \| `'hidden'` | `'input'` | The value type of the `input`. The value will determine what kind of `<Field>` should be built. If `select` is used, the component expects `option` elements as it’s direct children. If `hidden` is used, the component won’t be rendered, but the given value will still be used when submitting. Use this type if the user should never change the value of the component. Using `select` in combination with the `options` prop will build a react-select `<Field>` and using `datetime` will build a react-datetime `<Field>`. It is required that the necessary dependencies are installed to use these types. The `options` prop is required if the type is `radio` or `select` (react-select). |
| `label` | string (required) | | The text that will be shown in the `label`. |
| `hiddenLabel` | boolean | `'false'` | Hides the label. |
| `placeholder` | string | `'Select...'` (`select` (react-select)) | The placeholder text in the `input`. |
| `help` | JSX | | Renders a muted description. |
| `as` | `Col` \| `Row` | | React Bootstrap element types for custom component rendering. |
| `xs`<br>`sm`<br>`md`<br>`lg`<br>`xl` | boolean \| number \| `'auto'` \| `{span: boolean \| number \| 'auto', offset: number, order: number \| 'first' \| 'last'}` | | If `Col` is used for rendering, sets the number of columns that the component will span on the given breakpoint. If an object is used as value, the ordering and the left-side offset can be defined. |
| `xsLabel`<br>`smLabel`<br>`mdLabel`<br>`lgLabel`<br>`xlLabel` | number | | If `Row` is used for rendering, sets the number of columns that the `label` will span on the given breakpoint. |
| `xsControl`<br>`smControl`<br>`mdControl`<br>`lgControl`<br>`xlControl` | number | | If `Row` is used for rendering, sets the number of columns that the `input` will span on the given breakpoint. |
| `options` | array \| `(inputValue) => (Promise)` | | Required for `radio` or `select` (react-select). Must be an array of objects where each object has a `value` and `label` key. For `async` `select`, a callback function must be provided where the array will be promised. The first argument of the function is the value that the user filled in. |
| `size` | `'sm'` \| `'lg'` | | Changes the render size of the `label` and `input` elements. Doesn’t apply to the `input` of `range`, `checkbox`, `switch`, `radio`, `select` (react-select) and `file`. |
| `readOnly` | boolean | `'false'` | Renders the `input` greyish and prevents the user from editing the value. Doesn’t apply to `range`, `checkbox`, `switch`, `radio`, `select` (HTML), `select` (react-select) and `file`. When the props is used in combination with the `required` prop and no value is set beforehand, the `<Form>` can't validate successfully. |
| `plaintext` | boolean | `'false'` | Renders the `input` as plaintext. Doesn’t apply to `range`, `checkbox`, `switch`, `radio`, `select` (react-select) and `file`. This props is generally used in combination with the `readOnly` prop. This prop will override the effects of the `size` prop. |
| `rows` | number | | Changes the initial amount of rows for `textarea`. |
| `max` | number \| string | | The maximum value that the `input` allows through its interface. Applies only to `number`, `range`, `'date'`, `'month'`, `'week'`, `'datetime-local'` and `'time'`. |
| `min` | number \| string | | The minimum value that the `input` allows through its interface. Applies only to `number`, `range`, `'date'`, `'month'`, `'week'`, `'datetime-local'` and `'time'`. |
| `step` | number \| `'any'` | | Changes the increment and decrement step of the `input`. Applies only to `number`, `range`, `'date'`, `'month'`, `'week'`, `'datetime-local'` and `'time'`. |
| `single` | boolean | `'false'` | Encapsulates a `checkbox` or `switch` for extra margin. |
| `inline` | boolean | `'false'` | Renders a `checkbox`, `switch` or `radio` inline. |
| `multiple` | boolean | `'false'` | Allows the user to select multiple value for `select` and `files`. For `select`, this prop will change the validation type from string to array. |
| `htmlSize` | number | | Changes the amount of visible rows for `select`. This prop will automatically set the component to `multiple`. |
| `isSearchable` | boolean | `'true'` | If `select` (react-select), whenever or not the user is allowed to input custom values. |
| `isClearable` | boolean | `'false'` | If `select` (react-select), renders a button to clear the value. |
| `isCreatable` | boolean | `'false'` | If `select` (react-select), allows the user to create custom values. Sets the component to `isSearchable` automatically. When a custom value is created, the object will contain a `__isNew__` key with its value set to `true`. |
| `isMulti` | boolean | `'false'` | If `select` (react-select), allows the user to select multiple values. |
| `noOptionsMessage` | `({inputValue}) => (JSX)` | `({inputValue}) => ('No options')` | If `select` (react-select), the text that will show if no values are found. |
| `async` | boolean | `'false'` | If `select` (react-select), makes the component asynchronous. |
| `defaultOptions` | `[{value: string, label: string}]` \| boolean | | If `async`, the initial values before making the first query.  |
| `cacheOptions` | boolean | `'false'` | If `async`, whenever or not the results of every individual query should be stored. |
| `dateFormat` | string \| boolean | | If `datetime`, the format of the date. |
| `timeFormat` | string \| boolean | | If `datetime`, the format of the time. |
| `locale` | string | `'en'` | If `datetime`, sets the moment locale of a `dateitme`. |
| `data-browse` | string | `'Browse'` | The text that indicates that a file must be selected on the user's device. |
| `accept` | string | | Allows the user to only submit the given file types. |
| `disabled` | boolean | `'false'` | Whenever or not the `input` must prevent user interaction. This prop will also prevent the value from being validated and submitted. |
| `required` | boolean | `'false'` | Determines if the `input` must be filled in to pass the validation. Makes it required to check the `input` when using `checkbox` or `switch`. If the value is `range` and no valid initial value is found, the `input` must be touched at least once before the form can be submitted. |
| `hidden` | boolean | `'false'` | Makes the component invisible for the user and prevents the value from being validated and submitted. Use this prop instead of setting the `type` to `hidden`, if there is a possibility that the user could change the value of the component, eg a dynamic `<Field>`. |
| `defaultValue` | any | | The initial value of the `input` if no other value is provided. |
| `value` | any | | The initial value of the `input` with the highest priority. |
| `onChange` | function | | This function will be called after the value of the `input` has been changed. That value will be passed as the argument. |
| `validation` | yup shape | | Overrides the default validation logic. Whenever or not a value is required, must be handled through the `required` prop to prevent unexpected behaviour. |

### Array

| Prop | Type | Default | Description |
| - | - | - | - |
| `name` | string (required) | | The identifier of the `<FieldArray>` that is needed to keep track of its value and states internally. Must be unique. |
| `label` | string | | The text that will be shown. |
| `initialSize` | number | `1` | The amount of rows to generate at first render. |
| `addButton` | boolean \| `(addFunction) => (JSX)` | `true` | Whenever or not to show a button to add a new row. A custom section can be implemented by setting a callback function. The first argument is the function for adding a new row and can be attached to the `onClick` handler of a component. |
| `noRowsMessage` | JSX | | The message that will be rendered when there are no rows to show. |
| `as` | `Col` \| `Row` | | |
| `xs`<br>`sm`<br>`md`<br>`lg`<br>`xl` | boolean \| number \| `'auto'` \| `{span: boolean \| number \| 'auto', offset: number, order: number \| 'first' \| 'last'}` | | |
| `xsLabel`<br>`smLabel`<br>`mdLabel`<br>`lgLabel`<br>`xlLabel` | number | | |
| `xsControl`<br>`smControl`<br>`mdControl`<br>`lgControl`<br>`xlControl` | number | | |

## Contributing

Feel free to open issues for bugs and feature requests. Pull request are also much appreciated.

## License

React Bootstrap Form is [MIT licensed](https://github.com/hyperbit-nl/react-bootstrap-form/blob/master/LICENSE).
