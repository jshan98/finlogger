// Imports "Mongoose" & "mongo-db-memory-server" packages
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

//Sets up in-memory MongoDB before tests
before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log('MongoDB connection established.');
});

// Clears collections array before each test
beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for(const key in collections) {
        await collections[key].deleteMany({});
    }
});

// Cleans up after tests have concluded
after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log('MongoDB instance released');
});