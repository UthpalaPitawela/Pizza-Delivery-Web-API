import { handlerPath } from "@libs/handler-resolver";

export default {
  auth: {
    handler: `${handlerPath(__dirname)}/handler.auth`,
  },
  createUser: {
    handler: `${handlerPath(__dirname)}/handler.createUser`,
    events: [
      {
        http: {
          method: "post",
          path: "/users/register",
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
          path: "/users/signin",
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
          path: "/users/{role}",
          authorizer: "auth",
        },
      },
    ],
    timeout: 30,
  }
};
