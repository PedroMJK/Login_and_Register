import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic request payload validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check if a user with this email already exists
        const userExists = await User.findOne({ email });
        if ( userExists ) {
            return res.status(409).json({
                message: "User already exists",
            });
        } 

        // Hash password before persisting it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        // Create new user record
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        // Send sanitized user response
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate login payload
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // Fetch user including password hash
        const user = await User.findOne({email}).select("+password")

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // Compare provided password with stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // Generate JWT for authenticated user
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d"} 
        );

        // Return auth token and user data
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
        });

    // Handle unexpected server errors
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
};