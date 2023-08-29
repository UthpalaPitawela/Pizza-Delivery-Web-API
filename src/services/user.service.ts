import User, { IUser } from "src/models/user.model";
import { signUpParamType, signinParamType } from "src/types/userTypes";
import { closeDatabaseConnection, connectToDatabase } from "src/utils/db.util";
import  {hash, genSalt, compare} from "bcryptjs";
const jwt = require('jsonwebtoken');

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

const signinUser = async (signinParams: signinParamType) => {    
    try {
        connectToDatabase();
        const {username, password} = signinParams;
        const user = await User.findOne({ username });
        if (!user || !(await compare(password, user.password))) {
            return 'Authentication failed';
          }
        const token = jwt.sign({ username, role: user.role }, 'secretKey', { expiresIn: '1h' });
        return token;
    } 
    catch (error) {
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

export { createUser, signinUser };
