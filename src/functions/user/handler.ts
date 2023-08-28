import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { validateSignupParams } from "src/validations/userValidation";
import * as userService from "../../services/user.service";
import { signUpParamType } from "src/types/userTypes";
const dotenv = require("dotenv");
dotenv.config();

export const createUser = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const requestBody: signUpParamType =  JSON.parse(JSON.stringify(event?.body))
      const { error } = validateSignupParams(requestBody);
      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.details[0].message }),
        };
      }
      const result = await userService.createUser(requestBody);
      console.log('result', result)
      const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'User added successfully!!!'}),
    };
      return response;
    } catch (e) {
      console.log('e', e)
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
