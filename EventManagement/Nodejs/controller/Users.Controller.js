import UserModel from '../Model/Users.model.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

// Password validation helper function
const validatePassword = (password) => {
    return password.length >= 8;  // Password should be at least 8 characters long
};

// Create User Function
// Create User Function
export async function createUser(req, res) {
    const { Name, Email, Password, role } = req.body; // Accept role from request body

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
    }

    // Validate password
    if (!validatePassword(Password)) {
        return res.status(400).json({ message: 'Password should be at least 8 characters long' });
    }

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Set the role if not provided (default to 'user')
        const userRole = role || 'user';

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Create a new user
        const newUser = new UserModel({
            Name,
            Email,
            Password: hashedPassword,
            role: userRole,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        if (!savedUser) {
            return res.status(400).json({ message: 'Something went wrong while saving user' });
        }

        // Return the user data (without the password field)
        const { Password: _, ...userWithoutPassword } = savedUser.toObject(); 
        res.status(201).json(userWithoutPassword); // Return the user object without Password

    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ message: 'Error saving user', error: err.message });
    }
}


// Fetch Users (for listing or events, etc.)
export async function fetchUsers(req, res) {
    try {
        const users = await UserModel.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Login Function
// Login Function
export async function login(req, res) {
    const { email, password } = req.body;

    // Ensure email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const user = await UserModel.findOne({ Email: email });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this email' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Return user data excluding password
        const { Password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
            message: 'Authentication successful',
            user: userWithoutPassword,
            role: user.role, // Include the role in the response
        });

    } catch (err) {
        console.error('Error authenticating user:', err);
        res.status(500).json({ message: 'Error authenticating user', error: err.message });
    }
}
