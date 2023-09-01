import * as productService from "../services/product.service";

describe('Product Service', () => {
  it('should insert products with generated IDs and timestamps', async () => {
    const mockProductData = 
      [{
        name: "Devilled Macherel",
        sku: "DEV_MAC_LAR",
        size: "large",
        price: 1900,
        stock: 200
    }];

    const result = await productService.createProducts(mockProductData);
    expect(result[0]).toHaveProperty("_id");
  });
});
