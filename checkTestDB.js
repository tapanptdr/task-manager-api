require("dotenv").config();

const mongoose = require("mongoose");

const testConnection = async () => {
    try {
        console.log("Connecting to test database...");

        await mongoose.connect(process.env.MONGO_TEST_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("Test database connected successfully");

    } catch (error) {

        console.error("Test database connection failed:");
        console.error(error);

    } finally {

        await mongoose.connection.close();

    }
};

testConnection();