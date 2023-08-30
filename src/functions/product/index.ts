import { handlerPath } from "@libs/handler-resolver";

export default {
  auth: {
    handler: `${handlerPath(__dirname)}/handler.auth`,
  },
  createProducts: {
    handler: `${handlerPath(__dirname)}/handler.createProducts`,
    events: [
      {
        http: {
          method: "post",
          path: "/products",
          authorizer: "auth",
        },
      },
    ],
    timeout: 30,
  },
};
