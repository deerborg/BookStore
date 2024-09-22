const validateFields = (fields) => {
  const errors = [];

  Object.keys(fields).forEach((key) => {
    if (fields[key] === "" || fields[key] === undefined) {
      errors.push(`${key.charAt(0).toUpperCase() + key.slice(1)} is empty`);
    }
  });

  return errors.length > 0 ? errors : null;
};
export default validateFields;
