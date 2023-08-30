import Joi from '@hapi/joi';
import { orderStatusChangeType, orderType } from 'src/types/orderTypes';

const orderProductsSchema = Joi.object({
    productId:  Joi.string().required(),
    quantity: Joi.number().required(),
})
export const validateOrderParams = (requestBody: orderType) => {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        products: Joi.array().items(orderProductsSchema),
        price: Joi.number().required(),
        status: Joi.string().required(),
        deliveryType: Joi.string().required(),
      });
    return schema.validate(requestBody);
}


export const validateOrderStatusChangeParams = (requestBody: orderStatusChangeType) => {
    const schema = Joi.object({
        status: Joi.string().required(),
        userId: Joi.string().required(),
        orderId: Joi.string().required(),
      });
    return schema.validate(requestBody);
}
export const validateGetStatusParams = (orderId: string) => {
    const schema = Joi.string().required()
    return schema.validate(orderId);
}

