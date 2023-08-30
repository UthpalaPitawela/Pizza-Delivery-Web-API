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
  admin_staff: [LambdaFunctionTypes.CREATE_PRODUCTS],
  store_staff: [LambdaFunctionTypes.LIST_PRODUCTS],
  // user: ['getProduct', 'listProducts'],
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
