import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as Yup from 'yup';
import { RBForm } from '../src/Form';
import { RBField as Field } from '../src/Field';

Date.now = jest.fn(() => 1609455600);

Yup.setLocale({
  mixed: {
    required: 'Required'
  },
  number: {
    min: 'Value must be greater than or equal to ${min}',
  }
});

it("renders default Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="default" label="Default" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Field with hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <Field name="default" label="Default" hiddenLabel />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Field with placeholder", () => {
  const {container} = render(
    <RBForm>
      <Field name="default" label="Default" placeholder="Enter default" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Field with help", () => {
  const {container} = render(
    <RBForm>
      <Field name="default" label="Default" help="Help" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Field with disabled", () => {
  const {container} = render(
    <RBForm>
      <Field name="default" label="Default" disabled />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Field with required", () => {
  const {container} = render(
    <RBForm>
      <Field name="default" label="Default" required />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Field with hidden", () => {
  const {container} = render(
    <RBForm>
      <Field name="default" label="Default" hidden />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Field with defaultValue", () => {
  const {container} = render(
    <RBForm>
      <Field name="default" label="Default" defaultValue="Default value" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Field with value", () => {
  const {container} = render(
    <RBForm>
      <Field name="default" label="Default" value="Value" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Field with defaultValue and value", () => {
  const {container} = render(
    <RBForm>
      <Field
        name="default"
        label="Default"
        defaultValue="Default value"
        value="Value"
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders default Field with validation", () => {
  const {container} = render(
    <RBForm>
      <Field name="default" label="Default" validation={Yup.string().min(8)} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders input Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="input" type="input" label="Input" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders text Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="text" type="text" label="Text" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders password Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="password" type="password" label="Password" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders email Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="email" type="email" label="Email" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders url Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="url" type="url" label="Url" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders color Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="color" type="color" label="Color" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders textarea Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="textarea" type="textarea" label="Textarea" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders textarea Field with rows", () => {
  const {container} = render(
    <RBForm>
      <Field name="textarea" type="textarea" label="Textarea" rows={4} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders number Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="number" type="number" label="Number" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders number Field with max, min and step", () => {
  const {container} = render(
    <RBForm>
      <Field name="number" type="number" label="Number" max={100} min={0} step={1}
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders range Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="range" type="range" label="Range" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders checkbox Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="checkbox" type="checkbox" label="Checkbox" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders checkbox Field with hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <Field name="checkbox" type="checkbox" label="Checkbox" hiddenLabel />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders checkbox Field with help", () => {
  const {container} = render(
    <RBForm>
      <Field name="checkbox" type="checkbox" label="Checkbox" help="Help" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders checkbox Field with disabled", () => {
  const {container} = render(
    <RBForm>
      <Field name="checkbox" type="checkbox" label="Checkbox" disabled />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders checkbox Field with required", () => {
  const {container} = render(
    <RBForm>
      <Field name="checkbox" type="checkbox" label="Checkbox" required />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders checkbox Field with hidden", () => {
  const {container} = render(
    <RBForm>
      <Field name="checkbox" type="checkbox" label="Checkbox" hidden />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders checkbox Field with defaultValue", () => {
  const {container} = render(
    <RBForm>
      <Field name="checkbox" type="checkbox" label="Checkbox" defaultValue={true}
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders checkbox Field with single", () => {
  const {container} = render(
    <RBForm>
      <Field name="checkbox" type="checkbox" label="Checkbox" single />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders checkbox Field with inline", () => {
  const {container} = render(
    <RBForm>
      <Field name="checkbox" type="checkbox" label="Checkbox" inline />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two checkbox Fields", () => {
  const {container} = render(
    <RBForm>
      <>
      <Field name="checkbox-1" type="checkbox" label="Checkbox 1" />
      <Field name="checkbox-2" type="checkbox" label="Checkbox 2" />
    </>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two checkbox Fields with single", () => {
  const {container} = render(
    <RBForm>
      <>
      <Field name="checkbox-1" type="checkbox" label="Checkbox 1" single />
      <Field name="checkbox-2" type="checkbox" label="Checkbox 2" single />
    </>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two checkbox Fields with inline", () => {
  const {container} = render(
    <RBForm>
      <>
      <Field name="checkbox-1" type="checkbox" label="Checkbox 1" inline />
      <Field name="checkbox-2" type="checkbox" label="Checkbox 2" inline />
    </>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders switch Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="switch" type="switch" label="Switch" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders switch Field with hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <Field name="switch" type="switch" label="Switch" hiddenLabel />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders switch Field with help", () => {
  const {container} = render(
    <RBForm>
      <Field name="switch" type="switch" label="Switch" help="Help" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders switch Field with disabled", () => {
  const {container} = render(
    <RBForm>
      <Field name="switch" type="switch" label="Switch" disabled />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders switch Field with required", () => {
  const {container} = render(
    <RBForm>
      <Field name="switch" type="switch" label="Switch" required />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders switch Field with hidden", () => {
  const {container} = render(
    <RBForm>
      <Field name="switch" type="switch" label="Switch" hidden />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders switch Field with defaultValue", () => {
  const {container} = render(
    <RBForm>
      <Field name="switch" type="switch" label="Switch" defaultValue={true} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders switch Field with single", () => {
  const {container} = render(
    <RBForm>
      <Field name="switch" type="switch" label="Switch" single />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders switch Field with inline", () => {
  const {container} = render(
    <RBForm>
      <Field name="switch" type="switch" label="Switch" inline />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two switch Fields", () => {
  const {container} = render(
    <RBForm>
      <>
      <Field name="switch-1" type="switch" label="Switch 1" />
      <Field name="switch-2" type="switch" label="Switch 2" />
    </>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two switch Fields with single", () => {
  const {container} = render(
    <RBForm>
      <>
      <Field name="switch-1" type="switch" label="Switch 1" single />
      <Field name="switch-2" type="switch" label="Switch 2" single />
    </>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders two switch Fields with inline", () => {
  const {container} = render(
    <RBForm>
      <>
      <Field name="switch-1" type="switch" label="Switch 1" inline />
      <Field name="switch-2" type="switch" label="Switch 2" inline />
    </>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field without options", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with one option", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio"
        options={[{value: 0, label: "0"}]}
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with two options", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio"
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with inline and without options", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio" inline />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with inline and one option", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio"
        options={[{value: 0, label: "0"}]}
        inline
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with inline and two options", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio"
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
        inline
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with help", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio"
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
        help="Help"
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with disabled", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio"
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
        disabled
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with required", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio"
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
        required
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with hidden", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio"
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
        hidden
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with inline and hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio"
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
        inline
        required
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio"
        hiddenLabel
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with defaultValue", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio"
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
        defaultValue={0}
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders radio Field with inline and hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <Field name="radio" type="radio" label="Radio"
        hiddenLabel
        options={[
          {value: 0, label: "0"},
          {value: 1, label: "1"},
        ]}
        inline
      />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders select Field without options", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders select Field with one option", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select">
        <option>0</option>
      </Field>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders select Field with two option", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select">
        <option>0</option>
        <option>1</option>
      </Field>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders select Field with multiple and required", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" multiple required />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders select Field with multiple and without options", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" multiple />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders select Field with multiple and one option", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" multiple>
        <option>0</option>
      </Field>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders select Field with multiple and two option", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" multiple>
        <option>0</option>
        <option>1</option>
      </Field>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders select Field with htmlSize", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" htmlSize={4}>
        <option>0</option>
        <option>1</option>
      </Field>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders select Field with defaultValue", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" defaultValue={'0'}>
        <option>0</option>
        <option>1</option>
      </Field>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders select Field with multiple and defaultValue", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" multiple defaultValue={['0', '1']}>
        <option>0</option>
        <option>1</option>
      </Field>
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-select Field without options", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" options={[]} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-select Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" options={[
        {value: 0, label: '1'},
        {value: 1, label: '2'},
      ]} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-select Field with hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" hiddenLabel options={[
        {value: 0, label: '1'},
        {value: 1, label: '2'},
      ]} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-select Field with placeholder", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" placeholder="Enter select" options={[
        {value: 0, label: '1'},
        {value: 1, label: '2'},
      ]} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-select Field with disabled", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" options={[
        {value: 0, label: '1'},
        {value: 1, label: '2'},
      ]} disabled />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-select Field with defaultValue", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" options={[
        {value: 0, label: '1'},
        {value: 1, label: '2'},
      ]} defaultValue={{value: 0, label: '1'}} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-select Field with hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" hiddenLabel options={[
        {value: 0, label: '1'},
        {value: 1, label: '2'},
      ]} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-select Field with async", () => {
  const {container} = render(
    <RBForm>
      <Field name="select" type="select" label="Select" options={(inputValue) => (
        new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {value: 0, label: '1'},
              {value: 1, label: '2'},
            ]);
          }, 500);
        })
      )} async defaultOptions={[
        {value: 0, label: '1'},
      ]} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-datetime Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="datetime" type="datetime" label="Datetime" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-datetime Field with dateFormat", () => {
  const {container} = render(
    <RBForm>
      <Field name="datetime" type="datetime" label="Datetime" dateFormat="YYYY-MM" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-datetime Field with timeFormat", () => {
  const {container} = render(
    <RBForm>
      <Field name="datetime" type="datetime" label="Datetime" timeFormat="HH:mm:ss" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-datetime Field with dateFormat and timeFormat", () => {
  const {container} = render(
    <RBForm>
      <Field name="datetime" type="datetime" label="Datetime" dateFormat="YYYY-MM" timeFormat="HH:mm:ss" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-datetime Field with locale", () => {
  const {container} = render(
    <RBForm>
      <Field name="datetime" type="datetime" label="Datetime" locale="nl" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-datetime Field with readOnly", () => {
  const {container} = render(
    <RBForm>
      <Field name="datetime" type="datetime" label="Datetime" readOnly />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-datetime Field with defaultValue", () => {
  const {container} = render(
    <RBForm>
      <Field name="datetime" type="datetime" label="Datetime" defaultValue="2021/01/01 12:00 PM" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-datetime Field with placeholder", () => {
  const {container} = render(
    <RBForm>
      <Field name="datetime" type="datetime" label="Datetime" placeholder="Enter datetime" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-datetime Field with disabled", () => {
  const {container} = render(
    <RBForm>
      <Field name="datetime" type="datetime" label="Datetime" disabled />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders react-datetime Field with plaintext", () => {
  const {container} = render(
    <RBForm>
      <Field name="datetime" type="datetime" label="Datetime" plaintext />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders file Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="file" type="file" label="File" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders file Field with data-browse", () => {
  const {container} = render(
    <RBForm>
      <Field name="file" type="file" label="File" data-browse="Choose" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders file Field with accept", () => {
  const {container} = render(
    <RBForm>
      <Field name="file" type="file" label="File" accept=".txt" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders file Field with multiple", () => {
  const {container} = render(
    <RBForm>
      <Field name="file" type="file" label="File" multiple />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders file Field with disabled", () => {
  const {container} = render(
    <RBForm>
      <Field name="file" type="file" label="File" disabled />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders file Field with defaultValue", () => {
  const {container} = render(
    <RBForm>
      <Field name="file" type="file" label="File" defaultValue={[new File([''], "file.txt", {type: 'text/plain'})]} />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders file Field with hiddenLabel", () => {
  const {container} = render(
    <RBForm>
      <Field name="file" type="file" label="File" hiddenLabel />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders hidden Field", () => {
  const {container} = render(
    <RBForm>
      <Field name="hidden" type="hidden" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders custom Field", () => {
  const CustomField = (props) => {
    const handleChange = (e) => {
      props.onChange(e.target.value);
    }
  
    return (
      <>
        <label htmlFor={props.name}>{props.label}</label>
        <input type="text" id={props.name} value={props.value} onChange={handleChange} />
      </>
    );
  }

  const {container} = render(
    <RBForm>
      <CustomField name="custom" label="Custom" />
    </RBForm>
  );

  expect(container).toMatchSnapshot();
});

it("renders password Field with validation", async () => {
  const {container} = render(
    <RBForm>
      <Field name="password" type="password" label="Password" validation={
        Yup.string().min(2, 'Wrong')
      } value="p" />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Error');

  expect(container).toMatchSnapshot();
});

it("renders password Field with validation locale", async () => {
  const {container} = render(
    <RBForm>
      <Field name="password" type="password" label="Password" required />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Error');

  expect(container).toMatchSnapshot();
});

it("renders number Field with validation and validation locale", async () => {
  const {container} = render(
    <RBForm>
      <Field name="number" type="number" label="Number" validation={
        Yup.number().min(2, 'Wrong')
      } value={1} />
    </RBForm>
  );

  const button = await screen.findByText('Send');
  fireEvent.click(button);
  
  const success = await screen.findByText('Error');

  expect(container).toMatchSnapshot();
});
