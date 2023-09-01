import * as orderService from "../services/order.service";

describe('Product Service', () => {
  it('should insert products with generated IDs and timestamps', async () => {
    const mockOrderData = 
    {
        customerId: "59be50ae-f11c-48ad-ab73-09b1173808b2",
        products: [
           { productId:"57d57ae0-83f8-43a4-ba9f-523834b504ae", quantity: 5 },
           { productId:"a9b96d06-f90a-4404-ae93-fe9c0ac3e8d0", quantity: 1 }
        ],
        price: 8500,
        status: "pending",
        deliveryType: "store_pickup"
    }

    const result = await orderService.createOrder(mockOrderData);
    expect(result[0]).toHaveProperty("_id");
  });
});
