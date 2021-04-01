import { useEffect, useRef } from 'react';

let moment;
try { moment = require('moment'); require('moment/min/locales'); } catch (_) { moment = null; }

export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export const isObject = (value) => (
  value != null && typeof value == 'object' && !Array.isArray(value)
);

export const isArray = (value) => (
  value != null && Array.isArray(value)
);

export const createArray = (size, value) => (
  Array.from({length: size}, () => (
    isArray(value) ? [] : typeof value == 'object' ? {} : value
  ))
);

export const ensureArray = (value) => (
  isArray(value) ? value : [value]
);

export const fillMissingArrayRows = (amountRows, array, value = {}) => {
  const sizeRest = amountRows - array.length;

  if (sizeRest > 0) {
    array = array.concat(createArray(sizeRest, value));
  }

  return array;
};

export const getDatetimeFormat = (dateFormat, timeFormat) => {
  const formats = [];

  if (dateFormat || dateFormat === undefined) {
    formats.push(typeof dateFormat === 'string' ? dateFormat : 'L');
  }

  if (timeFormat || timeFormat === undefined) {
    formats.push(typeof timeFormat === 'string' ? timeFormat : 'LT');
  }

  return formats.join(' ');
};

const setMomentLocale = (locale) => (
  moment.locale(locale ?? 'en')
);

export const getDatetimeDate = (value, format, locale) => {
  if (moment) {
    setMomentLocale(locale);

    if (typeof value === 'string') { // Always a string when used inside validation.
      if (isNaN(value)) {
        return moment(value, format, true).toDate();
      }

      return moment(+value).toDate();
    }

    if (typeof value === 'number') {
      return moment(value).toDate();
    }

    if (moment.isMoment(value)) {
      return value.toDate();
    }
  }

  return value;
};

export const getDatetimeString = (value, format, locale) => {
  if (moment) {
    setMomentLocale(locale);

    if (moment.isMoment(value)) {
      return value.format(format);
    }

    if (value instanceof Date || typeof value === 'number') {
      return moment(value).format(format);
    }

    if (typeof value === 'string' && value !== '' && !isNaN(value)) {
      return moment(+value).format(format);
    }
  }

  return value;
};
