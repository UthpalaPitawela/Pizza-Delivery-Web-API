import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayAuthorizerEvent,
  APIGatewayAuthorizerResult,
} from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { productType } from "src/types/productTypes";
import * as productService from "../../services/product.service";
import * as authService from "../../services/auth.service";
import { validateProductArray } from "src/validations/productValidation";
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
        LambdaFunctionTypes.CREATE_PRODUCTS
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

export const createProducts = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const requestBody: productType[] = JSON.parse(
        JSON.stringify(event?.body)
      );
      const { error } = validateProductArray(requestBody);
      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.details[0].message }),
        };
      }
      const result = await productService.createProducts(requestBody);
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Product(s) added successfully!!!" }),
      };
      return response;
    } catch (e) {
      console.log("e", e);
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
