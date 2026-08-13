const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken")
const { create } = require("../models/User");

const registerUser = async (req, res) => {
    try{
        
        const { name, email, password } = req.body;
    
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
    
        const existingUser = await User.findOne({email});
    
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    }
    catch(error){
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

const loginUser = async (req, res) => {
    try{

        // Get data from req body
        const { email, password } = req.body;

        //validate input
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exist
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare entered password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        // Password incorrect
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const accessToken = generateAccessToken(user._id);

        const refreshToken = generateRefreshToken(user._id);

        // Success response
        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });


    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const refreshAccessToken = async (req, res) => {
    try{
        const  { refreshToken } = req.body;

        if(!refreshToken){
            return res.status(401).json({
                success: false,
                message: "Refresh Token Required"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const accessToken = generateAccessToken(decoded.id);

        res.status(200).json({
            success: true,
            accessToken
        });


    }catch (error){
        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token"
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken
};