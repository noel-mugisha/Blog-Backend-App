import User from "../models/User.js";
import bcrypt from "bcryptjs"; // Correct spelling

// Fetch all users
export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error retrieving users." });
    }
    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found!" });
    }
    return res.status(200).json({ users });
};

// Signup function
export const signup = async (req, res, next) => {
    const { name, email, password} = req.body;

    // Check if the user already exists
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists! Login instead." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error checking existing user." });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    });

    // Save the new user
    try {
        await user.save();
        return res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error saving user." });
    }
};

// Login function
export const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    // Find user by email
    try {
        existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "No user found! Signup instead." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error retrieving user." });
    }

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password." });
    }

    // Login successful
    return res.status(200).json({ message: "User logged in successfully!", user: existingUser });
};
