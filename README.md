# Pizza Delivery System

The web api for pizza delivery system

## How to run locally
```sh
npm i
npm start
```

## Project Requirements
    Create users
        Admin users and customers should be able to perform this task
        End point method: post
        Url: http://localhost:3000/dev/users/create

    User signin
        Any user should be able to signin
        End point method: post
        Url: http://localhost:3000/dev/users/signin

    Create products
        Admins should be able to add products
        End point method: post
        Url: http://localhost:3000/dev/products

    Create order
        Customers should be able to create orders
        End point method: post
        Url: http://localhost:3000/dev/orders

    Store staff, Kitchen staff and delivery staff should be able to set status
        End point method: put
        Url: http://localhost:3000/dev/orders/:id

    Customers should be able to check their order status
        End point method: get
        Url: http://localhost:3000/dev/orders/:id
    
    Customers should be able to view their order history
        End point method: get
        Url: http://localhost:3000/dev/orders/history/:customerId        

    Admins should be able to get customers list as reports
        Can use this endpoint by passing "customer" as role
        End point method: get
        Url: http://localhost:3000/dev/users/:role 

    For more information refer:
