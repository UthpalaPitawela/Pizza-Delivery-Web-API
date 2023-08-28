import { MongoClient, Db } from 'mongodb';
import {saveOne} from "./"
const dotenv = require("dotenv");

dotenv.config();
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectToDatabase(): Promise<Db> {

    await client.connect();

    const db = client.db(process.env.DATABASE_NAME);
    return db;
}

async function saveOne(data: any, collectionName: string) {
    try {
        const database = await connectToDatabase();
        const collection = database.collection(collectionName);

        // Insert the data
        const result = await collection.insertOne(data);
        console.log('Inserted document:', result.insertedId);
        return result;
    } finally {
        await client.close();
    }
}

export { saveOne };
