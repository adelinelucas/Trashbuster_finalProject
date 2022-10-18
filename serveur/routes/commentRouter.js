import Express from "express";
const router = Express.Router();
import auth from '../middleware/auth.js';

import {createComment,updateComment, deleteComment } from '../controllers/Comment.Controller.js'

router.route('', auth).post(createComment)
router.route('/:id', auth).patch(updateComment).delete(deleteComment)

export default router;