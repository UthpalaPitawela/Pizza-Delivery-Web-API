# Pizza  Delivery System

The web API for pizza delivery system

Existing user roles
- super admins
- admins
-  store staff
-  kitchen staff
-  delivery staff
-  customers

## How to run locally
```sh
npm i
npm start
```

## Project Requirements

### Main Tasks


#### Create users
Super admins can  create admin staff, store staff, kitchen staff and delivery staff

**End point method**: *post*

        Url: https://837a9t46ig.execute-api.us-east-1.amazonaws.com/dev/users/register

#### Customer self registration

Customers can self register with the **customer** role

**End point method**: *post*

        Url: https://837a9t46ig.execute-api.us-east-1.amazonaws.com/dev/users/customer/register
 #### User signin

Any user should be able to signin

**End point method**: *post*

        Url: https://837a9t46ig.execute-api.us-east-1.amazonaws.com/dev/users/signin

#### Create product

Admins should be able to add products

**End point method**: *post*

        Url: https://837a9t46ig.execute-api.us-east-1.amazonaws.com/dev/products


#### Create order

Customers should be able to create orders

**End point method**: *post*

        Url: https://837a9t46ig.execute-api.us-east-1.amazonaws.com/dev/orders

#### Store staff, Kitchen staff and delivery staff should be able to set status

The below represents allowed state changes for each roles

- Store Staff: **cancel, picked_from_store**

- Kitchen Staff: **preparing, ready_to_pick_up**

- Delivery Staff: **delivered**

 **End point method**: *put*
   
        Url: https://837a9t46ig.execute-api.us-east-1.amazonaws.com/dev/orders/:id

####  Customers should be able to check their order status
   **End point method**: *get*
   
        Url: https://837a9t46ig.execute-api.us-east-1.amazonaws.com/dev/orders/:id
   
####  Customers should be able to view their order history
  **End point method**: *get*
   
        Url: https://837a9t46ig.execute-api.us-east-1.amazonaws.com/dev/orders/history/:customerId   
        
### Reports
####  Admins should be able to get customers list as reports

Can use this endpoint by passing "customer" as role

**End point method**: *get*

        Url: https://837a9t46ig.execute-api.us-east-1.amazonaws.com/dev/users/:role

####  Admins should be able to get all orders  based on date

Can use this endpoint by passing date as a ISO string Eg: 2023-08-28T11:49:54.022+00:00

**End point method**: *get*

        Url: https://837a9t46ig.execute-api.us-east-1.amazonaws.com/dev/orders/all/:date
        
