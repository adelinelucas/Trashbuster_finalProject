import Express from 'express';
const router = Express.Router();
import auth from '../middleware/auth.js';

import {getAllPost,getNumberOfPosts,getAllPostByUser, getPostById,createPost,updatePost,deletePost } from '../controllers/Post.Controller.js'

router.route('/posts').get(getAllPost);
router.route('/numberPosts').get(getNumberOfPosts);
router.route('/post', auth).post(createPost);
router.route('/userposts', auth).get(getAllPostByUser);
router.route('/post/:id', auth).get(getPostById).patch(updatePost).delete(deletePost);

export default router;