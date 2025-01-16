import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String, // Password field
});

const UserModel = mongoose.model('Users', userSchema);
export default UserModel;
