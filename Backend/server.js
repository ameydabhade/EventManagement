import express from "express";

const app = express();

app.listen(5100, () => {
  console.log("Server is up on 5100");
});

app.use(express.json());

const users = [
  { id: 1, firstName: "Amey", lastName: "Dabhade", hobby: "Winning" },
  { id: 2, firstName: "Utkarsh", lastName: "Kale", hobby: "Sleeping" },
];

//logging req
app.use((req, res, next) => {
  console.log(req.method);
  next();
});

// validation
const validateUserFields = (req, res, next) => {
  const { firstName, lastName, hobby } = req.body;
  if (!firstName || !lastName || !hobby) {
    return res.status(400).json({
      message: "All fields (firstName, lastName, and hobby) are required.",
    });
  }
  next();
};

//get all users
app.get("/users", (req, res) => {
  res.json(users);
});

//get user by id
app.get("/users/:id", (req, res) => {
  const urlId = req.params.id;
  const userById = users.find((user) => user.id == urlId);
  if (!userById) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(userById);
});

//POST new user
app.post("/user", validateUserFields, (req, res) => {
  const { firstName, lastName, hobby } = req.body;
  const newUser = {
    id: Math.floor(Math.random() * 10000),
    firstName,
    lastName,
    hobby,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user 
app.put("/user/:id", validateUserFields, (req, res) => {
  const urlId = req.params.id;
  const { firstName, lastName, hobby } = req.body;
  const userById = users.find((user) => user.id == urlId);

  if (!userById) {
    return res.status(404).json({ message: "User not found" });
  }

  if (firstName) userById.firstName = firstName;
  if (lastName) userById.lastName = lastName;
  if (hobby) userById.hobby = hobby;

  res.json(userById);
});

// DELETE user
app.delete("/user/:id", (req, res) => {
  const urlId = req.params.id;
  const userIndex = users.findIndex((user) => user.id == urlId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);
  res.status(200).json({ message: "User deleted successfully" });
});
