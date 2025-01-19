import { login, createUser, fetchUsers } from "../controller/Users.Controller.js";
import { createEvent, fetchEvents, fetchEventById, updateEvent, deleteEvent } from "../controller/Events.Controller.js";
import mongoose from 'mongoose';

function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Event ID' });
  }
  next();
}

export function Routes(app) {
  app.post('/register', createUser);
  app.post('/login', login);
  app.get('/users', fetchUsers);
  app.post('/events', createEvent);
  app.get('/events', fetchEvents);
  app.get('/events/:id', validateObjectId, fetchEventById);
  app.put('/events/:id', validateObjectId, updateEvent);
  app.delete('/events/:id', validateObjectId, deleteEvent);
}
