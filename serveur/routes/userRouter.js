 import Express from "express";
 const router = Express.Router();
 import auth from '../middleware/auth.js';

 import {register, login, logout} from '../controllers/User.Controller.js'

 router.post('/register', register);
 router.post('/login', login);
 router.get('/logout', logout);

 export default router