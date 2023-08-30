import {
  LambdaFunctionTypes,
  lambdaPolicyPermissionTypes,
} from "src/types/enumTypes";

const getCustomAuthorizer = (username: string, effect: string) => {
  return {
    principalId: username,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: effect,
          Action: "execute-api:Invoke",
          Resource: "*",
        },
      ],
    },
  };
};

const roleFunctionMapping = {
  admin_staff: [LambdaFunctionTypes.CREATE_PRODUCTS],
  store_staff: [LambdaFunctionTypes.CHANGE_STATUS],
  kitchen_staff: [LambdaFunctionTypes.CHANGE_STATUS],
  delivery_staff: [LambdaFunctionTypes.CHANGE_STATUS],
  customer: [LambdaFunctionTypes.CREATE_ORDER, LambdaFunctionTypes.GET_ORDER_STATUS]
};

export const generatePolicy = (
  username: string,
  userRole: string,
  lambdaFunction: String
) => {
  const allowedFunctions = roleFunctionMapping[userRole];
  if (allowedFunctions && allowedFunctions.includes(lambdaFunction)) {
    const allowCustomAuthorizer = getCustomAuthorizer(
      username,
      lambdaPolicyPermissionTypes.ALLOW
    );
    return allowCustomAuthorizer;
  } else {
    const denyCustomAuthorizer = getCustomAuthorizer(
      username,
      lambdaPolicyPermissionTypes.DENY
    );
    return denyCustomAuthorizer;
  }
};