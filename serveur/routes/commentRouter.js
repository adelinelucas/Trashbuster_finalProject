import Express from "express";
const router = Express.Router();
import auth from '../middleware/auth.js';

import {createComment ,getTotalTrashCollected } from '../controllers/Comment.Controller.js'

router.route('').post(auth, createComment)
// router.route('/:id').patch(auth, updateComment).delete(auth,deleteComment)
router.route('/updateInfosPost/:id').get(auth, getTotalTrashCollected)

export default router;