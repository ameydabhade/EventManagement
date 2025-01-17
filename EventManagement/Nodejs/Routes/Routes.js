import { login, createUser, fetchUsers } from "../controller/Users.Controller.js";
import { body } from 'express-validator';

export function Routes(app) {


  app.post('/register', [
    body('Email').isEmail().withMessage('Invalid email format'),
    body('Password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('Name').notEmpty().withMessage('Name is required')  
  ], createUser);

  app.get('/users', fetchUsers);


  app.post('/login', [
    body('Email').isEmail().withMessage('Invalid email format'),
    body('Password').notEmpty().withMessage('Password is required')
  ], login);
}
