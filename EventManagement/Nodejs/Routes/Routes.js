import { createUser } from '../controller/events.Controller.js';

export function Routes(app) {
    app.post('/register', createUser);
}
