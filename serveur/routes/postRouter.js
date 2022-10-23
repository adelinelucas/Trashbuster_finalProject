import Express from 'express';
const router = Express.Router();
import auth from '../middleware/auth.js';
import fileUpload from 'express-fileupload'

import {getAllPost,getNumberOfPosts,getAllPostByUser, getPostById,createPost,updatePost,deletePost } from '../controllers/Post.Controller.js'


router.route('/posts').get(getAllPost);
router.route('/numberPosts').get(getNumberOfPosts);
router.route('/post').post(fileUpload(), createPost);
router.route('/userposts/:id').get(auth, getAllPostByUser);
router.route('/post/:id').get(auth, getPostById).put(updatePost).delete(deletePost);

export default router;