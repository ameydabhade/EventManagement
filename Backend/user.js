import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id:Number,
    title:String,
    date:String,
    location:String,
    image:String
})
export const User = mongoose.model("API_Collection", userSchema);
