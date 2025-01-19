import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'],
        lowercase: true,  // Convert email to lowercase before saving
    },
    Password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'guest'], 
        default: 'user', 
    }
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt
});

// Create a user model
const UserModel = mongoose.model('Users', userSchema);
export default UserModel;
