// this file was generated by serverless-auto-swagger
            module.exports = 
            {
              "swagger": "2.0",
              "info": {
                "contact": {},
                "title": "Pizza-Delivery-System",
                "version": "1.0.0"
              },
              "host": "837a9t46ig.execute-api.us-east-1.amazonaws.com",
              "basePath": "/",
              "schemes": [
                "https"
              ],
              "paths": {
                "/dev/orders": {
                  "post": {
                    "consumes": [
                      "application/json"
                    ],
                    "parameters": [
                      {
                        "in": "body",
                        "name": "body",
                        "schema": {
                          "properties": {
                            "customerId": {
                              "example": "4a53ba93-c33f-42df-81f4-d88c18b36afc",
                              "type": "string"
                            },
                            "deliveryType": {
                              "example": "store_pickup",
                              "type": "string"
                            },
                            "price": {
                              "example": "4000",
                              "type": "string"
                            },
                            "products": {
                              "example": [
                                {
                                  "productId": "a0a3def6-3769-4551-a64f-45a5a33bb9eb",
                                  "quantity": 2
                                }
                              ],
                              "items": {
                                "properties": {
                                  "productId": {
                                    "example": "a0a3def6-3769-4551-a64f-45a5a33bb9eb",
                                    "type": "string"
                                  },
                                  "quantity": {
                                    "example": 2,
                                    "type": "number"
                                  }
                                },
                                "type": "object"
                              },
                              "type": "array"
                            },
                            "status": {
                              "example": "pending",
                              "type": "string"
                            }
                          },
                          "type": "object"
                        }
                      }
                    ],
                    "responses": {
                      "200": {
                        "description": ""
                      }
                    },
                    "description": "createOrder",
                    "operationId": "createorder",
                    "summary": "createOrder"
                  }
                },
                "/dev/orders/history/{customerId}": {
                  "parameters": [
                    {
                      "in": "path",
                      "name": "customerId",
                      "required": true,
                      "type": "string"
                    }
                  ],
                  "get": {
                    "parameters": [],
                    "responses": {
                      "200": {
                        "description": ""
                      }
                    },
                    "description": "GetOrderHistory",
                    "operationId": "getorderhistory",
                    "summary": "GetOrderHistory"
                  }
                },
                "/dev/orders/{id}": {
                  "parameters": [
                    {
                      "in": "path",
                      "name": "id",
                      "required": true,
                      "type": "string"
                    }
                  ],
                  "get": {
                    "parameters": [],
                    "responses": {
                      "200": {
                        "description": ""
                      }
                    },
                    "description": "getOrderStatus",
                    "operationId": "getorderstatus",
                    "summary": "getOrderStatus"
                  },
                  "put": {
                    "consumes": [
                      "application/json"
                    ],
                    "parameters": [
                      {
                        "in": "body",
                        "name": "body",
                        "schema": {
                          "properties": {
                            "status": {
                              "example": "cancel",
                              "type": "string"
                            },
                            "userId": {
                              "example": "4a53ba93-c33f-42df-81f4-d88c18b36afc",
                              "type": "string"
                            }
                          },
                          "type": "object"
                        }
                      }
                    ],
                    "responses": {
                      "200": {
                        "description": ""
                      }
                    },
                    "description": "setOrderStatus",
                    "operationId": "setorderstatus",
                    "summary": "setOrderStatus"
                  }
                },
                "/dev/products": {
                  "post": {
                    "consumes": [
                      "application/json"
                    ],
                    "parameters": [
                      {
                        "in": "header",
                        "name": "",
                        "type": "string"
                      },
                      {
                        "in": "body",
                        "name": "body",
                        "schema": {
                          "example": [
                            {
                              "name": "Devilled Macherel",
                              "price": "1900",
                              "size": "large",
                              "sku": "DEV_MAC_LAR",
                              "stock": 200
                            }
                          ],
                          "items": {
                            "properties": {
                              "name": {
                                "example": "Devilled Macherel",
                                "type": "string"
                              },
                              "price": {
                                "example": "1900",
                                "type": "string"
                              },
                              "size": {
                                "example": "large",
                                "type": "string"
                              },
                              "sku": {
                                "example": "DEV_MAC_LAR",
                                "type": "string"
                              },
                              "stock": {
                                "example": 200,
                                "type": "number"
                              }
                            },
                            "type": "object"
                          },
                          "type": "array"
                        }
                      }
                    ],
                    "responses": {
                      "200": {
                        "description": ""
                      }
                    },
                    "description": "createProducts",
                    "operationId": "createproducts",
                    "summary": "createProducts"
                  }
                },
                "/dev/users/register": {
                  "post": {
                    "consumes": [
                      "application/json"
                    ],
                    "parameters": [
                      {
                        "in": "query",
                        "name": "content",
                        "type": "string"
                      },
                      {
                        "in": "body",
                        "name": "body",
                        "schema": {
                          "properties": {
                            "address": {
                              "example": "Kotte, Sri Lanka",
                              "type": "string"
                            },
                            "email": {
                              "example": "ShalanaiGamage36@gmail.com",
                              "type": "string"
                            },
                            "name": {
                              "example": "Shalanai Gamage",
                              "type": "string"
                            },
                            "password": {
                              "example": "Shalani@123",
                              "type": "string"
                            },
                            "phone": {
                              "example": "9460093900",
                              "type": "string"
                            },
                            "role": {
                              "example": "customer",
                              "type": "string"
                            },
                            "username": {
                              "example": "ShalanaiGamage36@gmail.com",
                              "type": "string"
                            }
                          },
                          "type": "object"
                        }
                      }
                    ],
                    "responses": {
                      "200": {
                        "description": ""
                      }
                    },
                    "description": "createUser",
                    "operationId": "createuser",
                    "summary": "createUser"
                  }
                },
                "/dev/users/signin": {
                  "post": {
                    "consumes": [
                      "application/json"
                    ],
                    "parameters": [
                      {
                        "in": "body",
                        "name": "body",
                        "schema": {
                          "properties": {
                            "password": {
                              "example": "Nimalka@123",
                              "type": "string"
                            },
                            "username": {
                              "example": "NimalkaPerera36@gmail.com",
                              "type": "string"
                            }
                          },
                          "type": "object"
                        }
                      }
                    ],
                    "responses": {
                      "200": {
                        "description": ""
                      }
                    },
                    "description": "signin",
                    "operationId": "signin",
                    "summary": "signin"
                  }
                },
                "/dev/users/{role}": {
                  "parameters": [
                    {
                      "in": "path",
                      "name": "role",
                      "required": true,
                      "type": "string"
                    }
                  ],
                  "get": {
                    "parameters": [],
                    "responses": {
                      "200": {
                        "description": ""
                      }
                    },
                    "description": "getUsersByRole",
                    "operationId": "getusersbyrole",
                    "summary": "getUsersByRole"
                  }
                }
              },
              "tags": []
            }