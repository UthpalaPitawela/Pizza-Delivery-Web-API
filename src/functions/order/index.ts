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
  getOrdersAuth: {
    handler: `${handlerPath(__dirname)}/handler.getOrdersAuth`,
  },
  getAllOrdersByDateAuth: {
    handler: `${handlerPath(__dirname)}/handler.getAllOrdersByDateAuth`,
  },
  createOrder: {
    handler: `${handlerPath(__dirname)}/handler.createOrder`,
    events: [
      {
        http: {
          method: "post",
          path: "orders",
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
          path: "orders/{id}",
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
          path: "orders/{id}",
          authorizer: "getStatusAuth",
        },
      },
    ],
    timeout: 30,
  },
  getOrdersByCustomerId: {
    handler: `${handlerPath(__dirname)}/handler.getOrdersByCustomerId`,
    events: [
      {
        http: {
          method: "get",
          path: "orders/history/{customerId}",
          authorizer: "getOrdersAuth",
        },
      },
    ],
    timeout: 30,
  },
  getAllOrdersByDate: {
    handler: `${handlerPath(__dirname)}/handler.getAllOrdersByDate`,
    events: [
      {
        http: {
          method: "get",
          path: "orders/all/{date}",
          authorizer: "getAllOrdersByDateAuth",
        },
      },
    ],
    timeout: 30,
  },
};
