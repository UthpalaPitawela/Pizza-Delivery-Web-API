// user.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { CollectionTypes } from 'src/types/enumTypes';

export interface IUser extends Document {
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
  username: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
  email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin_staff', 'store_staff', 'kitchen_staff', 'delivery_staff', 'customer'], required: true },
  createdAt: {type: Date},
  updatedAt: {type: Date},
},{
  collection: CollectionTypes.USER
});

const User = mongoose.model<IUser>('user', userSchema);

export default User;



















// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     match: /^\S+@\S+\.\S+$/,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     match: /^\S+@\S+\.\S+$/, // Basic email format validation
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ['admin_staff', 'store_staff', 'kitchen_staff', 'delivery_staff', 'customer'], 
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
