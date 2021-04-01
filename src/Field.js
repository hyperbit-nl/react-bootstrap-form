import React from 'react';
import { Form } from 'react-bootstrap';
import { createContentLabel, createLabel, getIdLabel, getLayout, getSectionLabel, getSizeClass } from './FieldCommon';
import { getDatetimeFormat, getDatetimeString } from './Utils';

let Select;
let CreatableSelect;
let AsyncSelect;
let AsyncCreatableSelect;
let moment;
let Datetime;

try { Select = require('react-select').default; } catch (_) { Select = null; }
try { CreatableSelect = require('react-select/creatable').default; } catch (_) { CreatableSelect = null; }
try { AsyncSelect = require('react-select/async').default; } catch (_) { AsyncSelect = null; }
try { AsyncCreatableSelect = require('react-select/async-creatable').default; } catch (_) { AsyncCreatableSelect = null; }
try { moment = require('moment'); } catch (_) { moment = null; }
try { Datetime = require('react-datetime').default; } catch (_) { Datetime = null; }

let didWarnImportReactSelect = false;
let didWarnImportReactDatetime = false;

const getIdInput = ({name}) => (`rbf_${name}_input`);
const getIdRadio = (name, index) => (`rbf_${name}_${index}`);
const getIdHelp = ({name}) => (`rbf_${name}_help`);

const getNumber = (value) => (
  value === '' ? '' : +value
);

export const RBField = (props) => {
  const {type = 'input', name, as, hidden, isValid, isInvalid, help} = props;

  if (type === 'hidden') {
    return null;
  }

  let propsGroup = {controlId: name, as, hidden};
  const propsControl = {type, isValid, isInvalid}; // Removed name.

  let SectionHelp;

  if (help) {
    const idHelp = getIdHelp(props);
    SectionHelp = getSectionHelp(idHelp, help);
    propsControl['aria-describedby'] = idHelp;
  }

  const {Content, Label, shouldReturnNow} = getSectionControl(propsGroup, propsControl, props, SectionHelp, getSectionFeedback(props));

  if (!Content) {
    return null;
  }

  if (shouldReturnNow) {
    return Content;
  }

  return getLayout(propsGroup, Label, Content, props);
};

const getSectionHelp = (id, help) => {
  return (
    <Form.Text id={id} muted>
      {help}
    </Form.Text>
  );
};

const getSectionFeedback = ({error}) => {
  return (
    <Form.Control.Feedback type="invalid">
      {error}
    </Form.Control.Feedback>
  );
};

const getSectionControl = (propsGroup, propsControl, {type, ...props}, SectionHelp, SectionFeedback) => {
  if (type === 'radio') {
    const {name, value, size, label, hiddenLabel, disabled, options, inline, isValid, isInvalid, onChange, handleChange} = props;

    const propsLabelRadio = {
      className: getSizeClass(size),
    };

    let Radios;

    if (options) {
      Radios = options.map(({value: valueItem, label: labelItem}, index) => {
        const propsRadio = {
          name,
          type,
          checked: valueItem === value,
          onChange: () => {
            if (onChange) {
              onChange(valueItem);
            }

            handleChange(name, valueItem);
          },
          isValid,
          isInvalid,
          disabled,
        };

        const LabelRadio = createLabel(Form.Check.Label, propsLabelRadio, props, labelItem);

        return (
          <Form.Check key={index} type={type} id={getIdRadio(name, index)} inline={inline}>
            <Form.Check.Input {...propsRadio} />
            {LabelRadio}
          </Form.Check>
        );
      });

      propsGroup.role = 'radiogroup';
    }

    let Label;

    if (!hiddenLabel) {
      const propsLabel = {...props, className: 'rbf-group'};

      Label = getSectionLabel(propsLabel);
      propsGroup['aria-labelledby'] = getIdLabel(name);

    } else {
      propsGroup['aria-label'] = label;
    }

    const Content = (
      <>
        {Radios}
        {createControlHidden(isValid, isInvalid)}
        {SectionHelp}
        {SectionFeedback}
      </>
    );

    return {Content, Label};
  }

  if (type === 'checkbox' || type === 'switch') {
    const {name, value, size, label, hiddenLabel, disabled, inline, single, as, onChange, handleChange, hidden} = props;
    const shouldReturnNow = !single && !as;

    const propsCheck = {type, inline};
    const propsCheckClassNames = [];

    if (shouldReturnNow) {
      propsCheck.id = name;

      if (hidden) { // Setting the hidden prop regularly doesn't work.
        propsCheckClassNames.push('rbf-hidden');
      }
    }

    const propsCheckLabel = {
      id: getIdLabel(name),
      className: getSizeClass(size),
    };

    let CheckLabel;

    if (!hiddenLabel) {
      CheckLabel = createLabel(Form.Check.Label, propsCheckLabel, props);

    } else {
      if (type == 'switch') {
        CheckLabel = createLabel(Form.Check.Label, propsCheckLabel, props, <span className="sr-only">{label}</span>);

      } else {
        propsControl['aria-label'] = label;
      }

      propsCheckClassNames.push(getSizeClass(size, false));
    }

    if (propsCheckClassNames.length > 0) {
      propsCheck.className = propsCheckClassNames.join(' ');
    }

    propsControl.type = 'checkbox';
    propsControl.disabled = disabled;
    propsControl.checked = !!value;
    propsControl.onChange = () => {
      const valueNew = !value;

      if (onChange) {
        onChange(valueNew);
      }

      handleChange(name, valueNew);
    };

    const Content = (
      <Form.Check {...propsCheck} hidden>
        <Form.Check.Input {...propsControl} />
        {CheckLabel}
        {SectionHelp}
        {SectionFeedback}
      </Form.Check>
    );

    return {Content, shouldReturnNow};
  }

  if (type === 'datetime') {
    const errorDatetime = [];

    if (!moment) {
      errorDatetime.push('\'moment\'');
    }

    if (!Datetime) {
      errorDatetime.push('\'react-datetime\'');
    }

    if (errorDatetime.length > 0) {
      if (!didWarnImportReactDatetime) {
        console.warn(`To use advanced datetime input, please install ${errorDatetime.join(' and ')}`);
        didWarnImportReactDatetime = true;
      }

      return null;
    }

    const {name, value, label, hiddenLabel, placeholder, disabled, readOnly, plaintext, size, dateFormat, timeFormat, locale, onChange, handleChange, isValid, isInvalid} = props;
    const datetimeFormat = getDatetimeFormat(dateFormat, timeFormat);

    const propsControl = {
      dateFormat,
      timeFormat,
      locale,
      initialValue: value,
      onChange: (value) => {
        const valueString = getDatetimeString(value, datetimeFormat, locale);

        if (onChange) {
          onChange(valueString);
        }

        handleChange(name, valueString);
      },
      closeOnSelect: true,
    };

    const inputProps = {
      placeholder,
      disabled,
      readOnly,
      className: 'form-control',
    };

    let Label;

    if (!hiddenLabel) {
      Label = getSectionLabel(props);
      inputProps['aria-labelledby'] = getIdLabel(name);

    } else {
      inputProps['aria-label'] = label;
    }

    if (readOnly) {
      propsControl.open = false;
    }

    if (!value) { // Needed to force reset.
      inputProps.value = '';
    }

    if (plaintext) {
      inputProps.className += ' form-control-plaintext';
    }

    if (size) {
      if (size === 'sm') {
        inputProps.className += ' form-control-sm';

      } else if (size === 'lg') {
        inputProps.className += ' form-control-lg';
      }
    }

    propsControl.inputProps = inputProps;

    const Content = (
      <>
        <Datetime {...propsControl} />
        {createControlHidden(isValid, isInvalid)}
        {SectionHelp}
        {SectionFeedback}
      </>
    );

    return {Content, Label};
  }

  if (type === 'select') {
    const {options} = props;

    if (options) {
      if (!Select) {
        if (!didWarnImportReactSelect) {
          console.warn('To use advanced select input, please install \'react-select\'');
          didWarnImportReactSelect = true;
        }

        return null;
      }

      const {name, value, label, hiddenLabel, placeholder, disabled, isSearchable, isClearable, isMulti, isCreatable, noOptionsMessage, async, defaultOptions, cacheOptions, isValid, isInvalid, onChange, handleChange} = props;

      const propsControl = {
        inputId: getIdInput(props),
        placeholder,
        isDisabled: disabled,
        isClearable,
        isSearchable,
        isMulti,
        noOptionsMessage,
        value: value ?? null, // Needed to force reset.
        onChange: (option) => {
          handleChange(name, option);

          if (onChange) {
            onChange(option);
          }
        },
        classNamePrefix: isInvalid ? 'react-select-invalid' : isValid ? 'react-select-valid': 'react-select',
      };

      if (disabled) {
        propsControl.styles = {
          control: (styles) => ({
            ...styles,
            backgroundColor: '#e9ecef',
          })
        };
      }

      let SelectType;

      if (async) {
        propsControl.loadOptions = options;
        propsControl.defaultOptions = defaultOptions;
        propsControl.cacheOptions = cacheOptions;

        SelectType = isCreatable ? AsyncCreatableSelect : AsyncSelect;

      } else {
        propsControl.options = options;

        SelectType = isCreatable ? CreatableSelect : Select;
      }

      let Label;

      if (!hiddenLabel) {
        Label = getSectionLabel(props);
        propsControl['aria-labelledby'] = getIdLabel(name);

      } else {
        propsControl['aria-label'] = label;
      }

      const Content = (
        <>
          <SelectType {...propsControl} />
          {createControlHidden(isValid, isInvalid)}
          {SectionHelp}
          {SectionFeedback}
        </>
      );

      return {Content, Label};
    }

    const {name, value, plaintext, size, disabled, multiple, htmlSize, children, label, hiddenLabel, onChange, handleChange} = props;
    let Label;

    if (!hiddenLabel) {
      Label = getSectionLabel(props);

    } else {
      propsControl['aria-label'] = label;
    }

    propsControl.plaintext = plaintext;
    propsControl.disabled = disabled;
    propsControl.size = size;
    propsControl.as = type;
    propsControl.children = children;
    propsControl.value = value;

    if (multiple || htmlSize) {
      propsControl.multiple = true;
      propsControl.htmlSize = htmlSize;
      propsControl.onChange = (e) => {
        const value = [].slice.call(e.target.selectedOptions).map((option) => (option.value));

        if (onChange) {
          onChange(value);
        }

        handleChange(name, value);
      };

    } else {
      propsControl.onChange = (e) => {
        const value = e.target.value;

        if (onChange) {
          onChange(value);
        }

        handleChange(name, value);
      };
    }

    const Content = (
      <>
        <Form.Control {...propsControl} />
        {SectionHelp}
        {SectionFeedback}
      </>
    );

    return {Content, Label};
  }

  if (type === 'file') {
    const {name, value, disabled, accept, multiple, ['data-browse']: dataBrowse, label, hiddenLabel, onChange, handleChange} = props;

    propsControl.disabled = disabled;
    propsControl.onChange = (e) => {
      const value = e.target.files;

      if (onChange) {
        onChange(value);
      }

      handleChange(name, value);
    };
    propsControl.accept = accept;
    propsControl.multiple = multiple;

    let SelectedFiles;

    if (value) {
      propsControl.files = value;

      SelectedFiles = (
        <span muted>
          {Array.from(value).map(({name}) => (name)).join(', ')}
        </span>
      );
    }

    const Label = createLabel(Form.File.Label, {['data-browse']: dataBrowse}, props, !hiddenLabel ? createContentLabel(props) : <span className="sr-only">{label}</span>);

    const Content = (
      <Form.File custom>
        <Form.File.Input {...propsControl} />
        {Label}
        {SelectedFiles}
        {SectionHelp}
        {SectionFeedback}
      </Form.File>
    );

    return {Content};
  }

  if (type === 'number' || type === 'range') {
    const {name, value, max, min, step, plaintext, readOnly, disabled, size, placeholder, label, hiddenLabel, onChange, handleChange} = props;

    let Label;

    if (!hiddenLabel) {
      Label = getSectionLabel(props);

    } else {
      propsControl['aria-label'] = label;
    }

    if (type === 'number') {
      propsControl.placeholder = placeholder;
      propsControl.size = size;
      propsControl.plaintext = plaintext;
      propsControl.readOnly = readOnly;
    }

    propsControl.disabled = disabled;
    propsControl.max = max;
    propsControl.min = min;
    propsControl.step = step;

    propsControl.value = getNumber(value);
    propsControl.onChange = (e) => {
      const value = getNumber(e.target.value);

      if (onChange) {
        onChange(value);
      }

      handleChange(name, value);
    };

    const Content = (
      <>
        <Form.Control {...propsControl} />
        {SectionHelp}
        {SectionFeedback}
      </>
    );

    return {Content, Label};
  }

  if (type === 'textarea') {
    const {name, value, plaintext, readOnly, disabled, size, placeholder, rows, label, hiddenLabel, onChange, handleChange} = props;

    let Label;

    if (!hiddenLabel) {
      Label = getSectionLabel(props);

    } else {
      propsControl['aria-label'] = label;
    }

    propsControl.as = type;
    propsControl.rows = rows;
    propsControl.placeholder = placeholder;
    propsControl.size = size;
    propsControl.plaintext = plaintext;
    propsControl.readOnly = readOnly;
    propsControl.disabled = disabled;
    propsControl.value = value;
    propsControl.onChange = (e) => {
      const value = e.target.value;

      if (onChange) {
        onChange(value);
      }

      handleChange(name, value);
    };

    const Content = (
      <>
        <Form.Control {...propsControl} />
        {SectionHelp}
        {SectionFeedback}
      </>
    );

    return {Content, Label};
  }

  const {name, value, plaintext, readOnly, disabled, size, placeholder, label, hiddenLabel, onChange, handleChange} = props;

  let Label;

  if (!hiddenLabel) {
    Label = getSectionLabel(props);

  } else {
    propsControl['aria-label'] = label;
  }

  propsControl.placeholder = placeholder;
  propsControl.size = size;
  propsControl.plaintext = plaintext;
  propsControl.readOnly = readOnly;
  propsControl.disabled = disabled;
  propsControl.value = value;
  propsControl.onChange = (e) => {
    const value = e.target.value;

    if (onChange) {
      onChange(value);
    }

    handleChange(name, value);
  };

  const Content = (
    <>
      <Form.Control {...propsControl} />
      {SectionHelp}
      {SectionFeedback}
    </>
  );

  return {Content, Label};
};

const createControlHidden = (isValid, isInvalid) => (
  <Form.Control {...{type: 'hidden', isValid, isInvalid}} />
);
