export const isEmpty = (value: string | number | object): boolean => {
  if (value === null || value === undefined) {
    return true;
  } else if (typeof value === 'string' && value.trim() === '') {
    return true;
  } else if (typeof value === 'number' && isNaN(value)) {
    return true;
  } else if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) {
    return true;
  } else if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  return false;
};
