import Joi from '@hapi/joi';
import { orderStatusParamsType, orderType } from 'src/types/orderTypes';

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


export const validateOrderStatusChangeParams = (requestBody: orderStatusParamsType) => {
    const schema = Joi.object({
        status: Joi.string().required(),
        userId: Joi.string().required(),
        orderId: Joi.string().required(),
      });
    return schema.validate(requestBody);
}
export const validateIdParams = (id: string) => {
    const schema = Joi.string().required()
    return schema.validate(id);
}

export const validateGetOrdersByDateParams = (date: string) => {
    const schema = Joi.string().isoDate()
    return schema.validate(date);
}

