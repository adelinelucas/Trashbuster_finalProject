import React, {useContext, useReducer, useEffect} from "react"
import actionsReducer from '../reducers/actionsReducer'
import {OPEN_MODAL, CLOSE_MODAL, ADD_POST, UPDATE_POST, DELETE_POST, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT,LOADING, DISPLAY_POSTS, DISPLAY_POST, DISPLAY_COMMENTS,COUNT_ACTIONS } from '../constants/actionsTypes'

const baseUrl = `http://localhost:5000/cleaning-operation`
const AppContext = React.createContext();

// on passe des valeurs initiales 
const initialState= {
    loading: false, 
    commentModalOpen: false,
    posts:[],
    post:[],
    comments:[],
    actionsNumber : 0,
    isEditing: false

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
    // on appelle le chargement de nos données
    useEffect(()=>{
        fetchPosts();
        fetchActionsNumber()
    },[])

    return (
        <AppContext.Provider value={{...state,openModal, closeModal, fetchPostComments, fetchPost }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}