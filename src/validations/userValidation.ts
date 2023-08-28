import Joi from '@hapi/joi';
import { signUpParamType } from 'src/types/userTypes';

export const validateSignupParams = (requestBody: signUpParamType) => {
      const schema = Joi.object({
    username: Joi.string().email().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')).required(),
    address: Joi.string().required(),
    phone: Joi.string().regex(/^\d{10}$/).required(),
    name: Joi.string().required(),
    role: Joi.string().required(),
  });

  return schema.validate(requestBody);
};
