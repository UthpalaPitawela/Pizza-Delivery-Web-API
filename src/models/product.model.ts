// user.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { CollectionTypes } from '../types/enumTypes';

export interface IProduct extends Document {
  productId: string;
  name: string;
  sku: string;
  size: string;
  price: number;
  stock: number; 
  createdAt?: Date,
  updatedAt?: Date
}

const productSchema = new Schema<IProduct>({
  productId:  { type: String, required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  size: { type: String, enum: ['large', 'medium'], required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  createdAt: {type: Date},
  updatedAt: {type: Date},

},{
  collection: CollectionTypes.PRODUCT
});

const Product = mongoose.model<IProduct>('product', productSchema);

export default Product;

