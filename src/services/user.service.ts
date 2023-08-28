import  {hash, genSalt} from "bcryptjs";
import User, { IUser } from "src/models/user.model";
import { signUpParamType } from "src/types/userTypes";
import { closeDatabaseConnection, connectToDatabase } from "src/utils/db.util";

const createUser = async (userData: signUpParamType): Promise<IUser>=> {
    try {
        connectToDatabase();
        if (userData && Object.keys(userData).length >0 ) {
            const hashedPassword = await generateHashPassword(userData?.password);
            const newUser = new User({ ...userData, 
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const savedUser = await newUser.save();
            return savedUser;
        }
    } catch (error) {
        throw new Error(error);
    } 
    finally {
        await closeDatabaseConnection()
    }
};


async function generateHashPassword(password) {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);

  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export { createUser };
