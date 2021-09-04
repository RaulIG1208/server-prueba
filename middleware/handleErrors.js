const ERROR_HANDLERS = {
  CastError: (res) => res.status(400).send({ error: 'id used is malforwad' }),
  ValidationError: (res, err) => res.status(409).send({ error: err.name }),
  JsonWebTokenError: (res) =>
    res.status(401).json({ error: 'token missing or invalid' }),
  defaultError: (res) => res.status(500).end(),
};

module.exports = (err, req, res, next) => {
  console.error(err.message);
  console.log(err.name);
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError;

  return handler(res, err);
};
