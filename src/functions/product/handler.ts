import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { productType } from "src/types/productTypes";
import * as productService from "../../services/product.service"
import { validateProductArray } from "src/validations/productValidation";

const dotenv = require("dotenv");
dotenv.config();

export const createProducts = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const requestBody: productType[] = JSON.parse(JSON.stringify(event?.body))
      const { error } = validateProductArray(requestBody);
      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.details[0].message }),
        };
      }
      const result = await productService.createProducts(requestBody)
      console.log('result', result)
      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Product(s) added successfully!!!' }),
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
