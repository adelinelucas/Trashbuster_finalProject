// import axios from 'axios';

// export default axios.create({baseURL : 'http://localhost:5000'})

// const API=''; 
// API.interceptors.request.use( (req)=> {
//     if(localStorage.getItem('profile')){
//         console.log('if profile')
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }

//     return req;
// })

// export const fecthAllPosts = () => API.get(`/cleaning-operation/posts`);
// export const fecthOnePost = (id) => API.get(`/cleaning-operation/post/${id}`);
// export const fecthAllPostComments = (id) => API.get(`/cleaning-operation/post/${id}`);
// export const fetchActionsNumber = () => API.get(`/cleaning-operation/numberPosts`);
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const updatePost = (id, updatedPost) => API.put(`/posts/${id}`, updatedPost)
// export const deletePost = (id) => API.delete(`/posts/${id}`);

// // USER Identification 
// export const signIn = (FormData)=> API.post(`/auth/login`, FormData);
// export const signUp = (FormData)=> API.post(`/auth/register`, FormData, FormData);