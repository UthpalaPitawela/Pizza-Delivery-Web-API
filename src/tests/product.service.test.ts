const  createProducts = require ("../services/product.service")

describe('Product Service', () => {
  it('should insert products with generated IDs and timestamps', async () => {
    const mockProductData = 
      [{
        name: "Devilled Macherel",
        sku: "DEV_MAC_LAR",
        size: "large",
        price: 1900,
        stock: 200
    }]
    ;

    const mockInsertedProducts = [
      { ...mockProductData[0], productId: '70413413-11b0-4801-a437-0e428ef99b4f', createdAt: new Date(), updatedAt: new Date() },
    ];

    const result = await createProducts(mockProductData);

    expect(result).toEqual(mockInsertedProducts);
  });
});
