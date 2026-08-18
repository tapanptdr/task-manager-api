// const mongoose = require("mongoose");

// const connectDB = async (uri = process.env.MONGO_URI) => {
//     try {
//         await mongoose.connect(uri);

//         console.log("MongoDB connected successfully");
//     }
//     catch(error) {
//         console.error("MongoDB connection Failed.");

//         console.error(error.message);

//         process.exit(1);
//     }
// };

// module.exports = connectDB;


const mongoose = require("mongoose");

const connectDB = async (uri = process.env.MONGO_URI) => {
    try {
        await mongoose.connect(uri);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection Failed.");
        console.error(error.message);

        throw error;
    }
};

module.exports = connectDB;