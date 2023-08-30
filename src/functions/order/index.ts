import { handlerPath } from "@libs/handler-resolver";

export default {
  createOrderAuth: {
    handler: `${handlerPath(__dirname)}/handler.createOrderAuth`,
  },
  changeStatusAuth: {
    handler: `${handlerPath(__dirname)}/handler.changeStatusAuth`,
  },
  getStatusAuth: {
    handler: `${handlerPath(__dirname)}/handler.getStatusAuth`,
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
  getStatusByOrderId: {
    handler: `${handlerPath(__dirname)}/handler.getStatusByOrderId`,
    events: [
      {
        http: {
          method: "get",
          path: "/orders/{id}",
          authorizer: "getStatusAuth",
        },
      },
    ],
    timeout: 30,
  },
};