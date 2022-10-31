import Express from "express";
const router = Express.Router();
import auth from '../middleware/auth.js';

import {createComment,updateComment, deleteComment } from '../controllers/Comment.Controller.js'

router.route('').post(auth, createComment)
router.route('/:id').patch(auth, updateComment).delete(auth,deleteComment)

export default router;