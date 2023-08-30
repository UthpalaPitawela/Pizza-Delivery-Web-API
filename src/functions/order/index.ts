import { handlerPath } from "@libs/handler-resolver";

export default {
  createOrderAuth: {
    handler: `${handlerPath(__dirname)}/handler.createOrderAuth`,
  },
  changeStatusAuth: {
    handler: `${handlerPath(__dirname)}/handler.changeStatusAuth`,
  },
  createOrder: {
    handler: `${handlerPath(__dirname)}/handler.createOrder`,
    events: [
      {
        http: {
          method: "post",
          path: "/orders",
          authorizer: "createOrderAuth",
        },
      },
    ],
    timeout: 30,
  },
  setStatusByOrderId: {
    handler: `${handlerPath(__dirname)}/handler.setStatusByOrderId`,
    events: [
      {
        http: {
          method: "put",
          path: "/orders/{id}",
          authorizer: "changeStatusAuth",
        },
      },
    ],
    timeout: 30,
  },
};
