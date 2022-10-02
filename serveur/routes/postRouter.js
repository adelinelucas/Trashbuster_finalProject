import Express from 'express';
const router = Express.Router();

import {getAllPost,getNumberOfPosts,getAllPostByUser, getPostById,createPost,updatePost,deletePost } from '../controllers/Post.Controller.js'

router.route('/posts').get(getAllPost);
router.route('/numberPosts').get(getNumberOfPosts);
router.route('/post').post(createPost);
router.route('/userposts').get(getAllPostByUser);
router.route('/post/:id').get(getPostById).patch(updatePost).delete(deletePost);

export default router;