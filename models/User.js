const mongoose = require("mongoose");

// Create the schema (blueprint)
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        }
    },
    {
        timestamps: true
    }
);

// Create the model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;