import mongoose from 'mongoose';
import { User } from './user.js';

mongoose.connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Mongoose connection successful");
  })
  .catch((err) => {
    console.log("Mongoose connection error", err);
  });

const user1 = new User({
  id: _id,
  title: "Event",
  date:"16/11/2005", 
  location: "123123123",
  image: "1231231231"
});

user1.save().then(data=>{
  console.log(data)
})


user1.save()
  .then(() => {
    console.log("User saved successfully");
  })
  .catch((err) => {
    console.log("Error saving user:", err);
  });

  const all = await User.find()
  console.log(all)
