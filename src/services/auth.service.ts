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
          Action: [
            "execute-api:Invoke",
            "lambda:GetFunction",
            "lambda:CreateFunction",
            "lambda:UpdateFunctionCode",
            "lambda:UpdateFunctionConfiguration"
          ],
          Resource: "*",
        },
      ],
    },
  };
};

const roleFunctionMapping = {
  admin_staff: [LambdaFunctionTypes.CREATE_PRODUCTS, LambdaFunctionTypes.GET_USERS,LambdaFunctionTypes.GET_ALL_ORDERS_BY_DATE],
  store_staff: [LambdaFunctionTypes.CHANGE_STATUS],
  kitchen_staff: [LambdaFunctionTypes.CHANGE_STATUS],
  delivery_staff: [LambdaFunctionTypes.CHANGE_STATUS],
  customer: [LambdaFunctionTypes.CREATE_ORDER, LambdaFunctionTypes.GET_ORDER_STATUS, LambdaFunctionTypes.GET_ORDERS_BY_CUSTOMER_ID]
};

export const generatePolicy = (
  username: string,
  userRole: string,
  lambdaFunction: String
) => {
  const allowedFunctions = roleFunctionMapping[userRole];
  if (allowedFunctions && allowedFunctions.includes(lambdaFunction)) {
    console.log('allowedFunctions', allowedFunctions)
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
