const Joi = require("joi");

const signupValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const loginValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

module.exports = { signupValidation, loginValidation };
