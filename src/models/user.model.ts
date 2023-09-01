// user.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { CollectionTypes } from 'src/types/enumTypes';

export interface IUser extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  name: string;
  role: string;
  createdAt?: Date,
  updatedAt?: Date
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true},
  username: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
  email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin_staff', 'store_staff', 'kitchen_staff', 'delivery_staff', 'customer', 'super_admin'], required: true },
  createdAt: {type: Date},
  updatedAt: {type: Date},
},{
  collection: CollectionTypes.USER
});

const User = mongoose.model<IUser>('user', userSchema);

export default User;

