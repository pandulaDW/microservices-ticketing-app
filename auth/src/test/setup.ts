import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

// mongodb instance
let mongo: MongoMemoryServer;

// create a new mongo instance before all tests
beforeAll(async () => {
  process.env.JWT_KEY = "cmVhbGx5X3NlY3JldF92YWx1ZTEK";
  process.env.NODE_ENV = "test";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

// clearing data of each collection before each test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// stopping the db and closing connections after tests
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
