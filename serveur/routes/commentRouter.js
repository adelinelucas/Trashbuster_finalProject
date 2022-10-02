import Express from "express";
const router = Express.Router();

import {createComment,updateComment, deleteComment } from '../controllers/Comment.Controller.js'

router.route('').post(createComment)
router.route('/:id').patch(updateComment).delete(deleteComment)

export default router;