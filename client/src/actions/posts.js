// import * as api from '../api/axios';
// import {OPEN_MODAL, CLOSE_MODAL, ADD_POST, UPDATE_POST, DELETE_POST, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT,LOADING, DISPLAY_POSTS, DISPLAY_POST, DISPLAY_COMMENTS,COUNT_ACTIONS, OPEN_ERROR_MODAL, CLOSE_ERROR_MODAL, LOGIN,DISPLAY_USER_POSTS, CLOSE_EDIT_MODAL, OPEN_EDIT_MODAL,SELECTED_POST,CLEAR_SELECTED_POST, LOGOUT  } from '../constants/actionsTypes'

// export const getAllPosts = () => async(dispatch) =>{
//     try {
//         const {data} = await api.fecthAllPosts();
//         dispatch({ type: DISPLAY_POSTS, payload: data});

//     }catch (error) {
//         console.log(error.message);
//     }
// }