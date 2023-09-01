import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayAuthorizerEvent,APIGatewayAuthorizerResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { validateRoleParams, validateSigninParams, validateSignupParams } from "src/validations/userValidation";
import * as userService from "../../services/user.service";
import * as authService from "../../services/auth.service";
import { signUpParamType, signinParamType } from "src/types/userTypes";
import { LambdaFunctionTypes } from "src/types/enumTypes";
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

export const auth = async (
  event: APIGatewayAuthorizerEvent
): Promise<APIGatewayAuthorizerResult | any> => {
  try {
    if ("authorizationToken" in event) {
      const token = event?.authorizationToken.split(" ")[1];
      const decodedToken = jwt.verify(token, "secretKey");

      const { username, role } = decodedToken;
      const customeAuthorizer = authService.generatePolicy(
        username,
        role,
        LambdaFunctionTypes.GET_USERS
      );
      return customeAuthorizer;
    }
  } catch (e) {
    console.log("e", e);
    return formatJSONResponse({
      status: 500,
      message: e,
    });
  }
};

export const createUser = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const requestBody: signUpParamType = JSON.parse(JSON.stringify(event?.body))
      const { error } = validateSignupParams(requestBody);
      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.details[0].message }),
        };
      }
      if (requestBody.role === "admin_staff" || requestBody.role === "customer") {
        const result = await userService.createUser(requestBody);
        console.log('result', result)
        const response = {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: 'User added successfully!!!' }),
        };
        return response;
      } else {
        throw new Error('User is not authorized to access this resource')
      }
    } catch (e) {
      console.log('e', e)
      return formatJSONResponse({
        status: 500,
        message: e.message,
      });
    }
  }
);
export const signinUser = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const requestBody: signinParamType = JSON.parse(JSON.stringify(event?.body))
      const { error } = validateSigninParams(requestBody);
      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error }),
        };
      }
      const result = await userService.signinUser(requestBody);
      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'User signedin successfully!!!', result }),
      };
      return response;
    } catch (e) {
      console.log('e', e)
      return formatJSONResponse({
        status: 500,
        message: e.message,
      });
    }
  }
);
export const getUsersByRole = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const role: string = JSON.parse(JSON.stringify(event.pathParameters.role))
      const { error } = validateRoleParams(role);
      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error }),
        };
      }
      const result = await userService.getUsersByRole(role);
      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Users: ', result }),
      };
      return response;
    } catch (e) {
      console.log('e', e)
      return formatJSONResponse({
        status: 500,
        message: e.message,
      });
    }
  }
);
