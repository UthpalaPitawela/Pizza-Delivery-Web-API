import User, { IUser } from "src/models/user.model";
import { signUpParamType, signinParamType } from "src/types/userTypes";
import { closeDatabaseConnection, connectToDatabase } from "src/utils/db.util";
import { hash, genSalt, compare } from "bcryptjs";
const jwt = require("jsonwebtoken");
const uuid = require('uuid');

async function generateHashPassword(password) {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);

  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export const createUser = async (userData: signUpParamType): Promise<IUser> => {
  try {
    await connectToDatabase();
    if (userData && Object.keys(userData).length > 0) {
      const hashedPassword = await generateHashPassword(userData?.password);
      const newUser = new User({
        ...userData,
        userId: uuid.v4(),
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const savedUser = await newUser.save();
      return savedUser;
    }
  } catch (error) {
    throw new Error(error);
  } finally {
    await closeDatabaseConnection();
  }
};

export const signinUser = async (signinParams: signinParamType) => {
  try {
    await connectToDatabase();
    const { username, password } = signinParams;
    const user = await User.findOne({ username });
    if (!user || !(await compare(password, user.password))) {
      throw new Error ("Authentication failed");
    }
    const token = jwt.sign({ username, role: user.role }, "secretKey", {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      console.error("An unknown error occurred:", error);
      throw new Error(error.message)
    }
  } finally {
    await closeDatabaseConnection();
  }
};
export const getUsersByRole = async (role: string) => {
  try {
    await connectToDatabase();
    const result = await User.find({ role: role })
    .then(users => {
      return users;
    })
    .catch(error => {
      console.error('Error retrieving orders:', error);
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      console.error("An unknown error occurred:", error);
      throw new Error(error.message)
    }
  } finally {
    await closeDatabaseConnection();
  }
};
