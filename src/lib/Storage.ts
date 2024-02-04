import type { LocalStorageKey } from '@/@types/enum';

type LocalStorageKeyValues =
  (typeof LocalStorageKey)[keyof typeof LocalStorageKey];

export const get = <T extends string>(key: LocalStorageKeyValues) => {
  try {
    const result = localStorage.getItem(key);
    if (result) {
      return result as T;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const set = (key: LocalStorageKeyValues, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const setJson = (key: LocalStorageKeyValues, value: unknown) => {
  try {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getJson = <T>(key: LocalStorageKeyValues) => {
  try {
    const result = localStorage.getItem(key);
    if (result) {
      return JSON.parse(result) as T;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const clear = (key: LocalStorageKeyValues) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
