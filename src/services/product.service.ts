import Product, { IProduct } from "src/models/product.model";
import { productType } from "src/types/productTypes";
import { closeDatabaseConnection, connectToDatabase } from "src/utils/db.util";
const uuid = require('uuid');

export const createProducts = async (productData: productType[]): Promise<IProduct[]> => {
  try {
    await connectToDatabase();
    if (productData && productData.length > 0) {
      const products = productData.map((product: productType) => ({
        ...product,
        productId: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      const result = await Product.insertMany(products);
      return result;
    }
  } catch (error) {
    throw new Error(error);
  } finally {
    await closeDatabaseConnection();
  }
};
