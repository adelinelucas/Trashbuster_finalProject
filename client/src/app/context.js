import React, {useContext, useReducer, useEffect} from "react"
import actionsReducer from '../reducers/actionsReducer';
import authReducer from "../reducers/authReducer";
import {OPEN_MODAL, CLOSE_MODAL, ADD_POST, UPDATE_POST, DELETE_POST, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT,LOADING, DISPLAY_POSTS, DISPLAY_POST, DISPLAY_COMMENTS,COUNT_ACTIONS, OPEN_ERROR_MODAL, CLOSE_ERROR_MODAL, LOGIN,DISPLAY_USER_POSTS, CLOSE_EDIT_MODAL, OPEN_EDIT_MODAL,SELECTED_POST,CLEAR_SELECTED_POST  } from '../constants/actionsTypes'
import axios from 'axios';
axios.defaults.headers.patch['Access-Control-Allow-Origin'] = '*';

const baseUrl = `http://localhost:5000/cleaning-operation`;
const userUrl = `http://localhost:5000/auth`
const AppContext = React.createContext();

// on passe des valeurs initiales 
const initialState= {
    loading: false, 
    commentModalOpen: false,
    posts:[],
    post:[],
    userPosts: [],
    comments:[],
    actionsNumber : 0,
    isEditing: false,
    userAuthenticated: false,
    userRole : null, 
    authData: null,
    userData: null,
    registerData: null,
    errorMessage: null,
    errorModal : true,
    editModal: false, 
    selectedPost : null
}

const AppProvider = ({children}) =>{
    const [state, dispatch] = useReducer(actionsReducer, initialState); 

    // on déclare nos différentes actions 
    const openModal = () =>{
        dispatch({type: OPEN_MODAL})
    }
    const closeModal = () =>{
        dispatch({type: CLOSE_MODAL})
    }

    const openEditModal = () =>{
        dispatch({type: OPEN_EDIT_MODAL})
    }
    const closeEditModal = () =>{
        dispatch({type: CLOSE_EDIT_MODAL})
    }
    // const openErrorModal = () =>{
    //     dispatch({type: OPEN_ERROR_MODAL})
    // }
    // const closeErrorModal = () =>{
    //     dispatch({type: CLOSE_ERROR_MODAL})
    // }
    
    const fetchPosts = async() =>{
        dispatch({type:LOADING});
        const response = await fetch(`${baseUrl}/posts`);
        const posts = await response.json();
        dispatch({type:DISPLAY_POSTS, payload: posts})
    }

    const fetchPost = async(id) =>{
        dispatch({type:LOADING});
        const response = await fetch(`${baseUrl}/post/${id}`);
        const data = await response.json();

        const post = data.post;
        dispatch({type:DISPLAY_POST, payload: post})
    }

    const fetchPostComments = async(id) =>{
        dispatch({type:LOADING});
        const response = await fetch(`${baseUrl}/post/${id}`);
        const data = await response.json();
        const comments = data.postComments;
        dispatch({type:DISPLAY_COMMENTS, payload: comments})
    }

    const fetchActionsNumber = async() =>{
        const response = await fetch(`${baseUrl}/numberPosts`);
        const number = await response.json();
        dispatch({type:COUNT_ACTIONS, payload: number})
    }

    const signup = async(datas)=>{
       
        const response = await axios
            .post(`${userUrl}/login`,datas)
            .then((response) =>{
                console.log(response)
                if(response.data.message) {
                    initialState.errorMessage = response.data.message;
                }
                if(response.data.addToken){
                    return dispatch({type:LOGIN, payload: response.data})
                }
            })
            .catch((error) => {
                console.log('error',error);
            })
    }

    const register =  async(datas)=>{

            const response = await axios
            .post(`${userUrl}/register`, datas)
            .then((respServeur) =>{
                if(respServeur){
                    if(respServeur.data.message.code == 11000){
                        initialState.errorMessage = "L'adresse mail existe déjà en base de donnée. Une adresse mail ne peut etre associée qu'à un seul compte.";  
                    }
                    if(respServeur.data.message) {
                        initialState.errorMessage = 'Une erreur est survenue votre inscription n\'a pas pu être finalisée';
                        console.log(initialState)
                    }
                    console.log(initialState)
                }
            })
            .catch((error) => {
                console.log('myerror' ,error);
            })    
    }

    const logout = async()=>{

    }

    const fetchPostsByUser = async(userId) =>{
        // dispatch({type:LOADING});
        const response = await axios
            .get(`${baseUrl}/userposts/${userId}`)
            .then((respServeur)=>{
                console.log('fetchPostsByUser')
                console.log('respServeur => ',respServeur)
                return dispatch({type:DISPLAY_USER_POSTS, payload: respServeur.data.posts})
            })
            .catch((error)=> console.log(error))
    }

    const getUserInfo = async(idUser) =>{
        const response = await axios
            .get(`${baseUrl}/userposts`, idUser)
            .then((respServeur)=>{
                dispatch({DISPLAY_USER_POSTS, payload: respServeur.data})
            })
    }

    const registerAction = async(datas) =>{
        const response = await axios
        .post(`${baseUrl}/post`, datas)
        .then((respServeur) => {
            return dispatch({type: ADD_POST, payload: datas})
        })
        .catch((error)=> console.log(error))

    }

    const deleteAction = async(id) =>{
        const response = await axios
        .delete(`${baseUrl}/post/${id}`)
        .then((respServeur) => {
            return dispatch({type: DELETE_POST, payload: id})
        })
        .catch((error)=> console.log(error))
    }

    const setSelectedPost = (post) =>{
        console.log('inside selected post', post)
        return dispatch({type: SELECTED_POST, payload: post})
    }

    const clearSelectedPost = () =>{
        return dispatch({type: CLEAR_SELECTED_POST})
    }

    const updateAction = async(datas) =>{
        console.log('inside updateAction', datas)
        const response = await axios({
            method:'put',
            url: `${baseUrl}/post/${datas.postId}`,
            data : {...datas},
            headers: {
                'Access-Control-Allow-Origin': '*',
              },
        })
        // .post(`${baseUrl}/post/${datas.postId}`,datas)
        .then((respServeur) => {
            return dispatch({type: UPDATE_POST, payload: datas})
        })
        .catch((error)=> console.log(error))

    }

    // on appelle le chargement de nos données
    useEffect(()=>{
        fetchPosts();
        fetchActionsNumber()
    },[])

    return (
        <AppContext.Provider value={{...state,openModal, closeModal, fetchPostComments, fetchPost, register, signup, fetchPostsByUser, openEditModal,closeEditModal, registerAction, deleteAction, updateAction, setSelectedPost, clearSelectedPost}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}