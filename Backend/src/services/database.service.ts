import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { mongo } from "mongoose";

// External Dependencies

// Global Variables
export const collections: { users?: mongoDB.Collection , certificates?:mongoDB.Collection} = {}

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();

  const DB_CONN_STRING = process.env.DB_CONN_STRING as string;
  const DB_NAME = process.env.DB_NAME as string;
  const USERS_COLLECTION_NAME = process.env.USERS_COLLECTION_NAME as string;
  const CERTIFICATES_COLLECTION_NAME = process.env.CERTIFICATES_COLLECTION_NAME as string;

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);


  const usersCollection: mongoDB.Collection = db.collection(USERS_COLLECTION_NAME);
  const certificatesCollection : mongoDB.Collection = db.collection(CERTIFICATES_COLLECTION_NAME);

  collections.users = usersCollection;
  collections.certificates=certificatesCollection;

  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
}
