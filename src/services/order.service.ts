import { Error } from "mongoose";
import Order, { IOrder } from "src/models/order.model";
import User from "src/models/user.model";
import { orderStatusParamsType, orderType } from "src/types/orderTypes";
import { closeDatabaseConnection, connectToDatabase } from "src/utils/db.util";
const uuid = require("uuid");

const changeOrderStatus = async (
  orderId: string,
  newStatus: string,
  userRole: string
) => {
  
  try {
    const allowedStatusChanges = {
      // admin_staff: ['cancel', 'picked_from_store', ''],
      store_staff: ["cancel", "picked_from_store"],
      kitchen_staff: ["preparing", "ready_to_pick_up"],
      delivery_staff: ["delivered"],
    };
    if (!allowedStatusChanges[userRole]) {
      throw new Error("Invalid user");
    }

    if (!allowedStatusChanges[userRole].includes(newStatus)) {
      throw new Error("Status change not allowed for this user");
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      { status: newStatus, updatedAt: new Date() },
      { new: true }
    );

    return updatedOrder;
  } catch (error) {
    console.log("error", error);
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      console.error("An unknown error occurred:", error);
      throw new Error(error.message)
    }
  }
};

export const setStatusByOrderId = async (
  orderStatusData: orderStatusParamsType
): Promise<IOrder | string> => {
  try {
    await connectToDatabase();
    const { userId, orderId, status } = orderStatusData;
    console.log('orderId', orderId)
    console.log('userId', userId)
    const user = await User.findOne({ userId: userId });
    if (!user) {
      throw new Error("User does not exist");
    }
    const { role } = user;
    console.log('role', role)
    console.log("role", role);
    const result = await changeOrderStatus(orderId, status, role);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      console.error("An unknown error occurred:", error);
      throw new Error(error.message)
    }
  }

  finally {
    await closeDatabaseConnection();
  }
};

export const createOrder = async (orderData: orderType): Promise<IOrder> => {
  try {
    await connectToDatabase();
    if (orderData && Object.keys(orderData).length > 0) {
      const newOrder = new Order({
        ...orderData,
        userId: orderData.customerId,
        orderId: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const result = await newOrder.save();
      return result;
    }
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  } finally {
    await closeDatabaseConnection();
  }
};


export const getStatusByOrderId = async (orderId: string): Promise<string | any> => {
  console.log('orderId22222222222222222222222222222', orderId)
  try {
    await connectToDatabase();
    const status = await Order.findOne({orderId: orderId}).select('status')
    console.log('status', status)
    return status;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  } finally {
    await closeDatabaseConnection();
  }
}
