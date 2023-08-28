// /**
//  * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
//  * SPDX-License-Identifier: Apache-2.0
//  */

import { saveOne } from "src/db/database";
import { CollectionTypes } from "src/types/enumTypes";

// import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

// const dotenv = require("dotenv");

// // Load environment variables from .env file
// dotenv.config();

// const AWS = require("aws-sdk");

// // Configure the AWS SDK with your credentials and default region
// const signUp = async (clientId, params) => {
//   console.log("calling =======================signUp", signUp);

//   AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
//   });

//   const cognitoClient = new AWS.CognitoIdentityServiceProvider();
//   // const client = createClientForDefaultRegion(CognitoIdentityProviderClient);

//   const command = new SignUpCommand({
//     ClientId: clientId,
//     Username: params.username,
//     Password: params.password,
//     UserAttributes: [
//       { Name: "email", Value: params.email },
//       { Name: "name", Value: params.name },
//       { Name: "address", Value: params.address },
//     ],
//   });

//   console.log("command", command);


//   try {
//     const response = await cognitoClient.send(command);
//     console.log('response', response)

//     // Check the HTTP status code to determine success
//     if (response.$metadata.httpStatusCode === 200) {
        
//       return 'User created successfully';
//     } else {
//       return 'User creation failed';
//     }
//   } catch (error) {
//     console.log('error', error)
//     return 'An error occurred:';
//     // console.error('An error occurred:', error);}
// };
// }
// export { signUp };


const createUser = async (userData: any) => {
    try {
        let result = await saveOne(userData,CollectionTypes.USER )
        console.log('result', result)
        return result;
    } catch (error) {
        console.log('error', error)
        throw new Error(error);
    }
}


export {
    createUser
}
