import React, {useContext, useReducer, useEffect} from "react"
import actionsReducer from '../reducers/actionsReducer';
import authReducer from "../reducers/authReducer";
import {OPEN_MODAL, CLOSE_MODAL, ADD_POST, UPDATE_POST, DELETE_POST, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT,LOADING, DISPLAY_POSTS, DISPLAY_POST, DISPLAY_COMMENTS,COUNT_ACTIONS, OPEN_ERROR_MODAL, CLOSE_ERROR_MODAL, LOGIN,DISPLAY_USER_POSTS, CLOSE_EDIT_MODAL, OPEN_EDIT_MODAL,SELECTED_POST,CLEAR_SELECTED_POST, LOGOUT,SET_COORDINATES, PROFIL_INFOS, PROFIL_BADGE  } from '../constants/actionsTypes'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
// axios.defaults.headers.patch['Access-Control-Allow-Origin'] = '*';

// middleware to check authentification
const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use( (req)=> {
    console.log('api interceptors')
    if(sessionStorage.getItem('profil')){
        console.log('api profil')
        req.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem('profil')).token}`;
    }
    console.log(req)
    return req;
})
// 
const url = `http://localhost:5000`;
const AppContext = React.createContext();

// on passe des valeurs initiales 
const initialState= {
    loading: false, 
    commentModalOpen: false,
    posts:[],
    post:[],
    total_trash_collected:0,
    userPosts: [],
    comments:[],
    userActionsNumber : 0,
    userQuantityCollected: 0,
    userBadge: 'explorator',
    isEditing: false,
    userAuthenticated: false,
    userRole : null, 
    authData: null,
    userData: null,
    registerData: null,
    editModal: false, 
    selectedPost : null,
    longitude:null,
    latitude: null,
    alertInfo: false,
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

    const getMap = (data) =>{
        var requestOptions = {
            method: 'GET',
          };
        //   https://api.geoapify.com/v1/geocode/search?text=142%20rue%20Henri%20Barbusse%2C%2093300%20Aubervilliers&lang=fr&limit=1&type=street&format=json&apiKey=YOUR_API_KEY
        let postalCode = data.postalCode;
        let city = data.city;
        let street = data.street.replace(' ', '%20');
        let locationURL = `https://api.geoapify.com/v1/geocode/search?text=${street}%2C%20${postalCode}%20${city}&lang=fr&limit=1&type=street&format=json&apiKey=${process.env.REACT_APP_API_KEY}`;
        fetch(locationURL, requestOptions)
            .then(response => response.json())
            .then(result => {
                let coordinates = [];   
                coordinates.push(result.results[0].lat);
                coordinates.push(result.results[0].lon)
                return dispatch({type:SET_COORDINATES, payload: coordinates})
            })
            .catch(error => console.log('error', error));
    }
    
    const fetchPosts = async() =>{
        dispatch({type:LOADING});
        const response = await fetch(`${url}/cleaning-operation/posts`);
        const posts = await response.json();
        return dispatch({type:DISPLAY_POSTS, payload: posts})
    }

    const fetchPost = async(id) =>{
        dispatch({type:LOADING});
        const response = await fetch(`${url}/cleaning-operation/post/${id}`);
        const data = await response.json();
        console.log(data)
        const post = data.post;
        dispatch({type:DISPLAY_POST, payload: data})
        const getMAP = await getMap(post);
        return;
    }

    const fetchPostComments = async(id) =>{
        // if(!id) return;
        // dispatch({type:LOADING});
        // const response = await fetch(`${url}/cleaning-operation/post/${id}`);
        // const data = await response.json();
        // const comments = data.postComments;
        // const total = data.total;
        // dispatch({type:DISPLAY_COMMENTS, payload: comments})
    }

    const fetchActionsNumber = async() =>{
        const response = await fetch(`${url}/cleaning-operation/numberPosts`);
        const number = await response.json();
        return dispatch({type:COUNT_ACTIONS, payload: number})
    }

    const signup = async(datas)=>{
       
        const response = await API
            .post(`/auth/login`,datas)
            .then((response) =>{
                console.log(response)
                if(response.data.message) {
                    initialState.errorMessage = response.data.message;
                }
                if(response.data.token){
                    return dispatch({type:LOGIN, payload: response.data})
                }
            })
            .catch((error) => {
                console.log('error',error);
            })
    }

    const register =  async(datas)=>{

            const response = await API
            .post(`/auth/register`, datas)
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
        const response = await API
        .get(`/auth/logout`)
        .then((respServeur)=>{
            return dispatch({type:LOGOUT})
        })
        .catch((error)=> console.log(error))
    }

    const fetchPostsByUser = async(userId) =>{
        dispatch({type:LOADING});
        const response = await API
            .get(`/cleaning-operation/userposts/${userId}`)
            .then((respServeur)=>{
                // console.log('fetchPostsByUser')
                // console.log('respServeur => ',respServeur)
                return dispatch({type:DISPLAY_USER_POSTS, payload: respServeur.data.posts})
            })
            .catch((error)=> console.log(error))
    }
    // const fetchQuantityCollected = async(userId) =>{
    //     dispatch({type:LOADING});
    //     const response = await API
    //         .get(`/cleaning-operation/quantity/${userId}`)
    //         .then((respServeur)=>{
    //             console.log('respServeur => ',respServeur.data.userInfos)
                
    //         })
    //         .catch((error)=> console.log(error))
    // }
    const getUserBadge = async(userId) =>{
        dispatch({type:LOADING});
        const response = await API
            .get(`/auth/userBadge`)
            .then((respServeur)=>{
                console.log('respServeur => ',respServeur)
                return dispatch({type:PROFIL_BADGE, payload: respServeur.data.badgeLevel.level})
            })
            .catch((error)=> console.log(error))
    }

    const getUserInfo = async() =>{
        const response = await API
            .get(`/auth/userInfos`)
            .then((respServeur)=>{
                // console.log(respServeur)
                return dispatch({type:PROFIL_INFOS, payload: respServeur.data.userInfos})
            })
            .catch((error)=> console.log(error))
    }

    const registerAction = async(datas) =>{
        console.log(datas)
        const response = await API
        .post(`/cleaning-operation/post`, datas)
        .then((respServeur) => {
            return dispatch({type: ADD_POST, payload: datas})
        })
        .then(fetchPostsByUser(datas.userId))
        .catch((error)=> console.log(error))

    }

    const deleteAction = async(id) =>{
        const response = await API
        .delete(`/cleaning-operation/post/${id}`)
        .then((respServeur) => {
            return dispatch({type: DELETE_POST, payload: id})
        })
        .catch((error)=> console.log(error))
    }

    const setSelectedPost = (post) =>{
        return dispatch({type: SELECTED_POST, payload: post})
    }

    const clearSelectedPost = () =>{
        return dispatch({type: CLEAR_SELECTED_POST})
    }

    const updateAction = async(datas) =>{
        console.log('inside updateAction', datas)
        const response = await API 
        .put(`/cleaning-operation/post/${datas.postId}`,datas)
        .then((respServeur) => {
            return dispatch({type: UPDATE_POST, payload: datas})
        })
        .catch((error)=> console.log(error))

    }

    const addAComment = async(datas) =>{
        console.log('exceute add comment')
        const response = await API
        .post(`${url}/comments`, datas)
        .then((respServeur) => {
            
            return dispatch({type: ADD_COMMENT, payload: datas})
        })
        .catch((error)=> console.log(error))
    }

    // on appelle le chargement de nos données
    useEffect(()=>{
        fetchPosts();
        fetchActionsNumber()
    },[])

    useEffect(()=>{
        fetchPostComments();
    },[initialState.comments])

    return (
        <AppContext.Provider value={{...state,openModal, closeModal, fetchPostComments, fetchPost, register, signup, fetchPostsByUser, openEditModal,closeEditModal, registerAction, deleteAction, updateAction, setSelectedPost, clearSelectedPost, addAComment, fetchActionsNumber, fetchPosts, logout, getUserInfo, getUserBadge}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}