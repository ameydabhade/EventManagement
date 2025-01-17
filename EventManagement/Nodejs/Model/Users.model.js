// User Schema
import mongoose from "mongoose";
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
    },
    Password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'guest'], // Limit the possible roles
        default: 'user', // Default role is 'user'
    }
}, {
    timestamps: true,
});

const UserModel = mongoose.model('Users', userSchema);
export default UserModel;
