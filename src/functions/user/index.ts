import { handlerPath } from "@libs/handler-resolver";

export default {
  getUserByRoleAuth: {
    handler: `${handlerPath(__dirname)}/handler.getUserByRoleAuth`,
  },
  registerAuth: {
    handler: `${handlerPath(__dirname)}/handler.registerAuth`,
  },
  createUser: {
    handler: `${handlerPath(__dirname)}/handler.createUser`,
    events: [
      {
        http: {
          method: "post",
          path: "users/register",
          authorizer: "registerAuth"
        },
      },
    ],
    timeout: 30,
  },
  createCustomer: {
    handler: `${handlerPath(__dirname)}/handler.createCustomer`,
    events: [
      {
        http: {
          method: "post",
          path: "users/customer/register",
        },
      },
    ],
    timeout: 30,
  },
  signinUser: {
    handler: `${handlerPath(__dirname)}/handler.signinUser`,
    events: [
      {
        http: {
          method: "post",
          path: "users/signin",
        },
      },
    ],
    timeout: 30,
  },

  getUsersByRole: {
    handler: `${handlerPath(__dirname)}/handler.getUsersByRole`,
    events: [
      {
        http: {
          method: "get",
          path: "users/{role}",
          authorizer: "getUserByRoleAuth",
        },
      },
    ],
    timeout: 30,
  }
};
