const validation = (schema) => (req, _, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const validationError = new Error(error.message);
    validationError.status = 400;
    next(validationError);
  }

  next();
};

module.exports = validation;
