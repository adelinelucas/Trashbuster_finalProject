import React, {useContext, useReducer, useEffect} from "react"
import actionsReducer from '../reducers/actionsReducer';
import authReducer from "../reducers/authReducer";
import {OPEN_MODAL, CLOSE_MODAL, ADD_POST, UPDATE_POST, DELETE_POST, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT,LOADING, DISPLAY_POSTS, DISPLAY_POST, DISPLAY_COMMENTS,COUNT_ACTIONS, OPEN_ERROR_MODAL, CLOSE_ERROR_MODAL, LOGIN } from '../constants/actionsTypes'
import axios from 'axios';

const baseUrl = `http://localhost:5000/cleaning-operation`;
const userUrl = `http://localhost:5000/auth`
const AppContext = React.createContext();

// on passe des valeurs initiales 
const initialState= {
    loading: false, 
    commentModalOpen: false,
    posts:[],
    post:[],
    comments:[],
    actionsNumber : 0,
    isEditing: false,
    userAuthenticated: false,
    userRole : null, 
    authData: null,
    registerData: null,
    errorMessage: null,
    errorModal : true,
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

    // const openErrorModal = () =>{
    //     console.log('ouioui')
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

    // on appelle le chargement de nos données
    useEffect(()=>{
        fetchPosts();
        fetchActionsNumber()
    },[])

    return (
        <AppContext.Provider value={{...state,openModal, closeModal, fetchPostComments, fetchPost, register, signup,  }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}