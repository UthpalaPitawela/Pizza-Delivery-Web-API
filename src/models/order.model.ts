// user.model.ts
import mongoose, { Document, Schema } from "mongoose";
import { CollectionTypes } from "src/types/enumTypes";

interface OrderProductType {
  productId: string;
  quantity: number;
}

export interface IOrder extends Document {
  userId: string;
  orderId: string;
  products: OrderProductType[];
  price: number;
  status: string;
  deliveryType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    products: { type: [productSchema], required: true },
    price: { type: Number, required: true },
    status: { type: String,enum: ["pending", "cancel","picked_from_store", "delivered", "preparing", "ready_to_pick_up"], required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    collection: CollectionTypes.ORDER,
  }
);

const Order = mongoose.model<IOrder>("order", orderSchema);

export default Order;
