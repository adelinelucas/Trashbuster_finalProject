 import Express from "express";
 const router = Express.Router();
 import auth from '../middleware/auth.js';

 import {register, login, logout, getUserInfos, getBadgeCategory} from '../controllers/User.Controller.js'

 router.post('/register', register);
 router.post('/login', login);
 router.get('/logout', logout);
 router.get('/userInfos', auth, getUserInfos);
 router.get('/userBadge',auth, getBadgeCategory)

 export default router