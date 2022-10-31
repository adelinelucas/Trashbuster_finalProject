import Express from 'express';
const router = Express.Router();
import auth from '../middleware/auth.js';
import fileUpload from 'express-fileupload'

import {getAllPost,getNumberOfPosts,getAllPostByUser, getPostById,createPost,updatePost,deletePost,getPicture, getQuantityCollectedByUser } from '../controllers/Post.Controller.js'


router.route('/posts').get(getAllPost);
router.route('/numberPosts').get(getNumberOfPosts);
router.route('/post').post(auth, fileUpload(), createPost);
router.route('/userposts/:id').get(auth, getAllPostByUser);
router.route('/post/:id').get(getPostById).put(auth, updatePost).delete(auth, deletePost);
router.route('/picture/:id').get(getPicture);
router.route('/quantity/:id').get(getQuantityCollectedByUser);
export default router;