export interface orderType{
    customerId: string,
    products: OrderProductType[]
    price: number,
    status: string,
    deliveryType: string
}

interface OrderProductType {
    productId: string,
    quantity: number
}

export interface orderStatusBodyParamsType {
    status: string,
    userId: string
}

export interface orderStatusParamsType {
    status: string,
    userId: string,
    orderId: string,
}

