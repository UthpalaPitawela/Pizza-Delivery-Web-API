import { handlerPath } from "@libs/handler-resolver";

export default {
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
    timeout: 10,
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
    timeout: 10,
  },
};
