import { login, createUser, fetchUsers } from "../controller/Users.Controller.js";
import { createEvent, fetchEvents, fetchEventById, updateEvent, deleteEvent } from "../controller/Events.Controller.js";
import mongoose from 'mongoose';

// Middleware to validate ObjectId (ensure it’s a valid MongoDB ObjectId)
function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Event ID' });
  }
  next();
}

export function Routes(app) {
  
  // --- User Routes ---
  // Register Route
  app.post('/register', createUser);

  // Login Route
  app.post('/login', login);

  // Fetch Users Route
  app.get('/users', fetchUsers);

  // --- Event Routes ---
  // Create Event Route
  app.post('/events', createEvent);

  // Fetch All Events Route
  app.get('/events', fetchEvents);

  // Fetch Event by ID Route
  app.get('/events/:id', validateObjectId, fetchEventById);

  // Update Event Route
  app.put('/events/:id', validateObjectId, updateEvent);

  // Delete Event Route
  app.delete('/events/:id', validateObjectId, deleteEvent);
}
