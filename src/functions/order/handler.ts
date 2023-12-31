import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayAuthorizerEvent,
  APIGatewayAuthorizerResult

} from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { orderStatusBodyParamsType, orderType } from "src/types/orderTypes";
import { validateGetOrdersByDateParams, validateIdParams, validateOrderParams, validateOrderStatusChangeParams } from "src/validations/orderValidation";
import * as orderService from "../../services/order.service";
import * as authService from "../../services/auth.service";
import { LambdaFunctionTypes } from "src/types/enumTypes";
 
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

  export const createOrderAuth = async (
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
          LambdaFunctionTypes.CREATE_ORDER
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
  export const changeStatusAuth = async (
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
          LambdaFunctionTypes.CHANGE_STATUS
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
  export const getStatusAuth = async (
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
          LambdaFunctionTypes.GET_ORDER_STATUS
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
  export const getOrdersAuth = async (
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
          LambdaFunctionTypes.GET_ORDERS_BY_CUSTOMER_ID
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
  export const getAllOrdersByDateAuth = async (
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
          LambdaFunctionTypes.GET_ALL_ORDERS_BY_DATE
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

export const createOrder = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const requestBody: orderType = JSON.parse(
        JSON.stringify(event?.body)
      );
      const { error } = validateOrderParams(requestBody);
      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.details[0].message }),
        };
      }
      const result = await orderService.createOrder(requestBody);
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Order added successfully!!!" }),
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

export const setStatusByOrderId = middyfy(
  // async (event: APIGatewayProxyEvent): Promise<any> => {
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const orderId: string = JSON.parse(JSON.stringify(event.pathParameters.id))
      const requestBody: orderStatusBodyParamsType = JSON.parse(
        JSON.stringify(event?.body)
        );
      const statusChangeParams = {...requestBody, orderId}
      const { error } = validateOrderStatusChangeParams(statusChangeParams);
      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.details[0].message }),
        };
      }
      const result = await orderService.setStatusByOrderId(statusChangeParams);
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Order status changed successfully!!!" }),
      };
      return response;
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e.message,
      });
    }
  }
);

export const getStatusByOrderId = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const orderId: string = JSON.parse(JSON.stringify(event.pathParameters.id))
      const { error } = validateIdParams(orderId);
      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.details[0].message }),
        };
      }
      const result = await orderService.getStatusByOrderId(orderId);
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Order status result",result }),
      };
      return response;
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e.message,
      });
    }
  }
);

export const getOrdersByCustomerId = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const customerId: string = JSON.parse(JSON.stringify(event.pathParameters.customerId))
      const { error } = validateIdParams(customerId);
      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.details[0].message }),
        };
      }
      const result = await orderService.getOrdersByCustomerId(customerId);
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Orders for the customer",result }),
      };
      return response;
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e.message,
      });
    }
  }
);
export const getAllOrdersByDate = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const date: string = JSON.parse(JSON.stringify(event.pathParameters.date))
      const { error } = validateGetOrdersByDateParams(date);
      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error.details[0].message }),
        };
      }
      const result = await orderService.getAllOrdersByDate(date);
      console.log('result', result)
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Orders for the customer",result }),
      };
      return response;
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e.message,
      });
    }
  }
);