import * as YupDefault from 'yup';
import { getDatetimeDate, getDatetimeFormat } from './Utils';

let moment;
try { moment = require('moment'); } catch (_) { moment = null; }

export const getShape = ({
  type,
  options,
  max,
  min,
  multiple,
  htmlSize,
  dateFormat,
  timeFormat,
  locale,
  disabled,
  required,
  hidden,
  validation
}) => {
  let Yup;
  let yup;
  let shouldUseDefault = true;

  if (validation) {
    if (validation.constructor.name.endsWith('Schema')) {
      yup = validation;
      shouldUseDefault = false;

    } else {
      Yup = validation;
    }

  } else {
    Yup = YupDefault;
  }

  if (shouldUseDefault) {
    switch(type) {
      case 'datetime': {
        if (moment) {
          const format = getDatetimeFormat(dateFormat, timeFormat);

          yup = Yup.date().transform(function(_, originalValue) {
            return getDatetimeDate(originalValue, format, locale);
          });

          break;
        }

        yup = Yup.date();
        break;
      }

      case 'select': {
        if (options) {
          yup = Yup.mixed();
          break;
        }

        if (multiple || htmlSize) {
          yup = Yup.array();
          break;
        }

        yup = Yup.string();
        break;
      }

      case 'hidden':
      case 'file':
      case 'radio':
        yup = Yup.mixed();
        break;

      case 'checkbox':
      case 'switch':
        yup = Yup.bool();
        break;

      case 'number':
      case 'range': {
        yup = Yup.number();

        if (max != null) {
          yup = yup.max(max);
        }

        if (min != null) {
          yup = yup.min(min);
        }

        break;
      }

      case 'email':
        yup = Yup.string().email();
        break;

      case 'url':
        yup = Yup.string().url();
        break;

      default: // input, text, search, password, tel, color, textarea, date, month, week, datetime-local, time
        yup = Yup.string();
        break;
    }
  }

  if (!(type === 'hidden' || hidden || disabled) && required) {
    if (type === 'checkbox' || type === 'switch') {
      yup = yup.oneOf([true]);

    } else if (type === 'select' && multiple) {
      yup = yup.min(1);

    } else {
      yup = yup.required();
    }
  }

  return yup;
};

export const getShapeArray = (shape) => (
  YupDefault.array().of(
    getShapeObject(shape)
  )
);

export const getShapeObject = (shape) => (
  YupDefault.object().shape(shape)
);
