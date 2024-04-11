/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import dayjs from 'dayjs';
import { FieldValue, GeoPoint, Timestamp } from 'firebase/firestore';

export const firebaseDataToObject = (docData: Record<string, unknown>) => {
  Object.keys(docData).forEach(key => {
    const value = docData[key];

    if (
      value instanceof Object &&
      '_nanoseconds' in value &&
      '_seconds' in value &&
      typeof value._nanoseconds === 'number' &&
      typeof value._seconds === 'number'
    ) {
      const milliseconds = value._nanoseconds / 1e6;
      const timestampMilliseconds = value._seconds * 1000 + milliseconds;
      docData[key] = new Date(timestampMilliseconds).toString();
    }

    if (value instanceof Timestamp) {
      docData[key] = value.toDate().toString();
    }

    if (value instanceof FieldValue) {
      docData[key] = null;
    }

    if (value instanceof GeoPoint) {
      docData[key] = value.toJSON();
    }
  });

  return docData;
};

export const toDate = (value: any): Date => {
  if (value instanceof Date) {
    return value;
  }
  if (value instanceof Timestamp) {
    return value.toDate();
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return new Date(value);
  }
  throw new TypeError('Invalid date value');
};

export const removeTimeFromDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const formatDate = (dateText: any, dateFormat = 'DD MMM-YY') => {
  const date = toDate(dateText);
  return dayjs(date).format(dateFormat);
};
