import Joi from '@hapi/joi';

export const validateSignupParams = (requestBody: {}) => {
      const schema = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')).required(),
    address: Joi.string().required(),
    phone: Joi.string().regex(/^\d{10}$/).required(),
    name: Joi.string().required(),
    role: Joi.string().required(),
  });

  return schema.validate(requestBody);
};
