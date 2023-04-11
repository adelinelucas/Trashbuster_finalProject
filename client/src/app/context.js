import React, {useContext, useReducer, useEffect} from "react"
import actionsReducer from '../reducers/actionsReducer';
import {OPEN_MODAL, CLOSE_MODAL, ADD_POST, UPDATE_POST, DELETE_POST, ADD_COMMENT,LOADING, DISPLAY_POSTS, DISPLAY_POST, DISPLAY_COMMENTS,COUNT_ACTIONS, LOGIN,DISPLAY_USER_POSTS, CLOSE_POST_MODAL, OPEN_POST_MODAL,SELECTED_POST,CLEAR_SELECTED_POST, LOGOUT,SET_COORDINATES, PROFIL_INFOS, PROFIL_BADGE,SET_MESSAGE_MODAL,REGISTER, UPDATE_TRASH_COLLECTED, UPDATE_TRASH_COLLECTED_BY_POST  } from '../constants/actionsTypes'
import axios from 'axios';
// axios.defaults.headers.patch['Access-Control-Allow-Origin'] = '*';

// middleware : creation d'une instance axios pour envoyer le bearer token au back qui pourra alors confirmer l'autorisation d'accès du user
const API = axios.create({ baseURL: 'https://trashbuster-finalproject.onrender.com/'});

API.interceptors.request.use( (req)=> {
    if(sessionStorage.getItem('profil')){
        req.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem('profil')).token}`;
    }
    return req;
})
// 
const url = `https://trashbuster-finalproject.onrender.com/`;

// initialisation du context
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
    quantityCollectedByPost: 0,
    alertInfo: {
        show:false, msg:'', type:''  
    },
}


const AppProvider = ({children}) =>{
    const [state, dispatch] = useReducer(actionsReducer, initialState); 
    /**
     * USER
     * methode pour le login 
     */
     const login = async(datas)=>{
       
        const signIn = await axios
            .post(`/auth/login`,datas)
            .then((response) =>{
                if(199< response.status <300){
                    return dispatch({type:LOGIN, payload: response.data})
                }
                if(response.status < 400){
                    let alertPayload = {
                        show: true,
                        msg : response.data.message,
                        type: 'red'
                    }
                    return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
                }
            })
            .catch((error) => {
                let alertPayload = {
                    show: true,
                    msg : error.response.data.message,
                    type: 'red'
                }
                return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
            })
    }

    const register =  async(datas)=>{
            const signUp = await API
            .post(`/auth/register`, datas)
            .then((response) =>{ 
                if(response.status === 200){
                    return dispatch({type:REGISTER, payload: response.data})
                }
            })
            .catch((error) => {
                let alertPayload = {
                    show: true,
                    msg : error.response.data.message,
                    type: 'red'
                }
                return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
            })    
    }

    const logout = async()=>{
        const logout = await API
        .get(`/auth/logout`)
        .then((response)=>{
            return dispatch({type:LOGOUT})
        })
        .catch((error) => {
            let alertPayload = {
                show: true,
                msg : error.response.data.message,
                type: 'red'
            }
            return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
        })
    }

    /**
     * POSTS
     */

    // méthodes pour le display des modales
    //comment modale
    const openCommentModal = () =>{
        dispatch({type: OPEN_MODAL})
    }
    const closeCommentModal = () =>{
        dispatch({type: CLOSE_MODAL})
    }
    // post modal
    const openPostModal = () =>{
        dispatch({type: OPEN_POST_MODAL})
    }
    const closeEditModal = () =>{
        dispatch({type: CLOSE_POST_MODAL})
    }
    // gestion de la modal d'alert
    const closeAlert = () =>{
        let alertPayload = {
            show: false,
            msg : null,
            type: ''
        }
        return dispatch({type: SET_MESSAGE_MODAL, payload: alertPayload})
    }
    // 

    /**
     * methode pour générer la map grâce aux coordonnées récuprées dans le post
     */
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
    
    /**
     * methode pour récupérer tous les posts 
     */
    const fetchPosts = async() =>{
        dispatch({type:LOADING});
        const response = await fetch(`${url}/cleaning-operation/posts`);
        const posts = await response.json();
        return dispatch({type:DISPLAY_POSTS, payload: posts})
    }

    /**
     * methode pour récupérer 1 seul post + appel de la méthode get map 
     */
    const fetchPost = async(id) =>{
        dispatch({type:LOADING});
        const response = await fetch(`${url}/cleaning-operation/post/${id}`);
        const data = await response.json();
        const post = data.post;
        dispatch({type:DISPLAY_POST, payload: data})
        const getMAP = await getMap(post);
        return;
    }

    /**
     * methode pour récupérer le nombre de posts 
     */
    const fetchActionsNumber = async() =>{
        const response = await fetch(`${url}/cleaning-operation/numberPosts`);
        const number = await response.json();
        return dispatch({type:COUNT_ACTIONS, payload: number})
    }

    
    /**
     * methode pour récupérer les posts d'un user 
     */
    const fetchPostsByUser = async(userId) =>{
        dispatch({type:LOADING});
        const response = await API
            .get(`/cleaning-operation/userposts/${userId}`)
            .then((respServeur)=>{
                if(199< respServeur.status <300){
                    return dispatch({type:DISPLAY_USER_POSTS, payload: respServeur.data.posts})
                }
                if(respServeur.status < 400){
                    let alertPayload = {
                        show: true,
                        msg : respServeur.data.message,
                        type: 'red'
                    }
                    return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
                }
            })
            .catch((error) => {
                let alertPayload = {
                    show: true,
                    msg : error.response.data.message,
                    type: 'red'
                }
                return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
            })
    }
    
    /**
     * methode pour récupérer les posts d'un user 
     */
    const getUserBadge = async(userId) =>{
        dispatch({type:LOADING});
        const response = await API
            .get(`/auth/userBadge`)
            .then((respServeur)=>{
                return dispatch({type:PROFIL_BADGE, payload: respServeur.data.badgeLevel.level})
            })
            .catch((error) => {
                let alertPayload = {
                    show: true,
                    msg : error.response.data.message,
                    type: 'red'
                }
                return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
            })
    }

    /**
     * methode pour récupérer les infos du user
     */
    const getUserInfo = async() =>{
        const response = await API
            .get(`/auth/userInfos`)
            .then((respServeur)=>{
                return dispatch({type:PROFIL_INFOS, payload: respServeur.data.userInfos})
            })
            .catch((error)=> console.log(error))
    }

    /**
     * methode pour enregister une action 
     */
    const registerAction = async(datas) =>{
        const response = await API
        .post(`/cleaning-operation/post`, datas)
        .then((respServeur) => {
            if(199< respServeur.status <300){
                return dispatch({type: ADD_POST, payload: respServeur.data.post})
            }
            if(response.status < 400){
                let alertPayload = {
                    show: true,
                    msg : response.data.message,
                    type: 'red'
                }
                return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
            }
        })
        .then(getUserBadge)
        .then(getUserInfo)
        .catch((error) => {
            let alertPayload = {
                show: true,
                msg : error.response.data.message,
                type: 'red'
            }
            return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
        })
    }

    /**
     * methode pour supprimer une action 
     */
    const deleteAction = async(id) =>{
        const response = await API
        .delete(`/cleaning-operation/post/${id}`)
        .then((respServeur) => {
            return dispatch({type: DELETE_POST, payload: id})
        })
        .then(getUserBadge)
        .then(getUserInfo)
        .catch((error) => {
            let alertPayload = {
                show: true,
                msg : error.response.data.message,
                type: 'red'
            }
            return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
        })
    }

    /**
     * methode pour selectionner une action dans le forme d'édition du post
     */
    const setSelectedPost = (post) =>{
        return dispatch({type: SELECTED_POST, payload: post})
    }

    const clearSelectedPost = () =>{
        return dispatch({type: CLEAR_SELECTED_POST})
    }

    /**
     * methode pour mettre à jour une action 
     */
    const updateAction = async(datas) =>{
        const response = await API 
        .put(`/cleaning-operation/post/${datas.postId}`,datas)
        .then((respServeur) => {
            return dispatch({type: UPDATE_POST, payload: respServeur.data.post})
        })
        .then(getUserBadge)
        .then(getUserInfo)
        .catch((error) => {
            let alertPayload = {
                show: true,
                msg : error.response.data.message,
                type: 'red'
            }
            return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
        })

    }

    /**
     * methode pour ajouter un commentaire
     */
    const addAComment = async(datas) =>{
        const response = await API
        .post(`${url}/comments`, datas)
        .then((respServeur) => {
            dispatch({type: ADD_COMMENT, payload: respServeur.data.comment})
            if(respServeur.status === 200) actualisationTrashCollectedByPost(datas.postId)
        })
        .catch((error) => {
            let alertPayload = {
                show: true,
                msg : error.response.data.message,
                type: 'red'
            }
            return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
        })
    }

    /**
     * methode pour actualiser le total des déchets collectés
     */
    const actualisationTrashCollected = async(postId)=>{
        const response = await API
        .get(`/comments/updateInfosPost/${postId}`)
        .then((respServeur) => {
            return dispatch({type: UPDATE_TRASH_COLLECTED, payload: respServeur.data.total})
        })
        .catch((error) => {
            let alertPayload = {
                show: true,
                msg : error.response.data.message,
                type: 'red'
            }
            return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
        })
    } 

    /**
     * methode pour actualiser le total des déchets collectés
     */
    const actualisationTrashCollectedByPost = async(postId)=>{
        const response = await API
        .get(`/comments/updateInfosPost/${postId}`)
        .then((respServeur) => {
            return dispatch({type: UPDATE_TRASH_COLLECTED_BY_POST, payload: respServeur.data.total})
        })
        .catch((error) => {
            let alertPayload = {
                show: true,
                msg : error.response.data.message,
                type: 'red'
            }
            return dispatch({type:SET_MESSAGE_MODAL, payload:alertPayload})
        })
    } 

    // on appelle le chargement de nos données
    useEffect(()=>{
        fetchPosts();
        fetchActionsNumber()
    },[])

    return (
        <AppContext.Provider value={{...state,openCommentModal, closeCommentModal, fetchPost, register, login, fetchPostsByUser, openPostModal,closeEditModal, registerAction, deleteAction, updateAction, setSelectedPost, clearSelectedPost, addAComment, fetchActionsNumber, fetchPosts, logout, getUserInfo, getUserBadge, closeAlert, actualisationTrashCollected, actualisationTrashCollectedByPost}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}