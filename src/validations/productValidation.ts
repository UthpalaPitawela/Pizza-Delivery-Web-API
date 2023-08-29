import Joi from '@hapi/joi';
import { productType } from 'src/types/productTypes';

export const productSchema = Joi.object({
    name: Joi.string().required(),
    sku: Joi.string().required(),
    size: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
  });



 export const validateProductArray = (requestBody: productType[]) => {
    const schema = Joi.array().items(productSchema); 
    return schema.validate(requestBody);
  };
