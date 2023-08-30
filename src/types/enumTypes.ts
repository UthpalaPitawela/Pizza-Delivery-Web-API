export enum CollectionTypes {
  USER = "user",
  PRODUCT = "product",
  ORDER = "order"
}

export enum LambdaFunctionTypes {
  CREATE_PRODUCTS = "createProducts",
  LIST_PRODUCTS = "listProducts",
  CREATE_ORDER = "createOrder",
  CHANGE_STATUS = "changeStatus",
  GET_ORDER_STATUS = "getOrderStatus",
}

export enum lambdaPolicyPermissionTypes {
  ALLOW = "Allow",
  DENY = "Deny",
}
