import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const router = Router();


console.log('DEBUG: userController keys =', Object.keys(userController));
console.log('DEBUG: typeof registerUser =', typeof userController.registerUser);
console.log('DEBUG: typeof loginUser =', typeof userController.loginUser);

if (typeof userController.registerUser === 'function') {
  router.post('/register', userController.registerUser);
} else {
  console.warn('registerUser missing — /register route not registered');
}

if (typeof userController.loginUser === 'function') {
  router.post('/login', userController.loginUser);
} else {
  console.warn('loginUser missing — /login route not registered');
}

export default router;
