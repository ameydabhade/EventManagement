import { login, createUser, fetchUsers } from "../controller/Users.Controller.js";
import { createEvent, fetchEvents, fetchEventById, updateEvent, deleteEvent } from "../controller/Events.Controller.js";
import { body, param } from 'express-validator';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

// Middleware to handle validation errors
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }
  next();
}

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
  app.post('/register', [
    body('Email').isEmail().withMessage('Invalid email format'),
    body('Password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('Name').notEmpty().withMessage('Name is required')
  ], handleValidationErrors, createUser);

  // Login Route
  app.post('/login', [
    body('Email').isEmail().withMessage('Invalid email format'),
    body('Password').notEmpty().withMessage('Password is required')
  ], handleValidationErrors, login);

  // Fetch Users Route
  app.get('/users', fetchUsers);

  // --- Event Routes ---
  // Create Event Route
  app.post('/events', [
    body('title').notEmpty().withMessage('Event title is required'),
    body('location').notEmpty().withMessage('Event location is required'),
    body('image').optional().isURL().withMessage('Invalid image URL')  // Optional image field validation
  ], handleValidationErrors, createEvent);

  // Fetch All Events Route
  app.get('/events', fetchEvents);

  // Fetch Event by ID Route
  app.get('/events/:id', [
    param('id').isMongoId().withMessage('Invalid event ID format')  // Validate that `id` is a valid ObjectId
  ], handleValidationErrors, fetchEventById);

  // Update Event Route
  app.put('/events/:id', [
    param('id').isMongoId().withMessage('Invalid event ID format'), // Validate that `id` is a valid ObjectId
    body('title').notEmpty().withMessage('Event title is required'),
    body('date').isISO8601().withMessage('Invalid date format'),
    body('location').notEmpty().withMessage('Event location is required'),
    body('image').optional().isURL().withMessage('Invalid image URL')
  ], handleValidationErrors, updateEvent);

  // Delete Event Route
  app.delete('/events/:id', [
    param('id').isMongoId().withMessage('Invalid event ID format') // Validate that `id` is a valid ObjectId
  ], handleValidationErrors, deleteEvent);
}
