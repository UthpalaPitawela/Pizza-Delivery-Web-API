import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { validateSignupParams } from "src/validations/userValidation";
import * as userService from "../../services/user.service";
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();
// Load environment variables from .env file
export const createUser = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const requestBody = event?.body ?? {};
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
        body: JSON.stringify({ message: 'Success',result}),
    };
      return response;
       
    //   console.log("result", result);
      // const id = v4();
      // const todo = await todosService.createTodo({
      //     todosId: id,
      //     title: event.body.title,
      //     description: event.body.description,
      //     createdAt: new Date().toISOString(),
      //     status: false
      // })
      // return  event.body
    //   return formatJSONResponse({
    //     name: "hiii",
    //   });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
