import {OPEN_MODAL, CLOSE_MODAL, ADD_POST, UPDATE_POST, DELETE_POST, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT,LOADING, DISPLAY_POSTS, DISPLAY_POST, DISPLAY_COMMENTS, COUNT_ACTIONS, LOGOUT, REGISTER, OPEN_ERROR_MODAL,CLOSE_ERROR_MODAL, LOGIN,DISPLAY_USER_POSTS,CLOSE_EDIT_MODAL, OPEN_EDIT_MODAL, SELECTED_POST,CLEAR_SELECTED_POST, SET_COORDINATES } from '../constants/actionsTypes'
const reducer= (state, action) =>{
    switch(action.type){
        case OPEN_MODAL:
            return {...state, commentModalOpen:true};
        case CLOSE_MODAL:
            return {...state, commentModalOpen:false};
        case OPEN_EDIT_MODAL:
            return {...state, editModal:true};
        case CLOSE_EDIT_MODAL:
            return {...state, editModal:false};
        case OPEN_ERROR_MODAL:
            return {...state, errorModal:true};
        case CLOSE_ERROR_MODAL:
            return {...state, errorModal:false};
        case ADD_POST:
            state.userPosts.push(action.payload);
            return {...state};
        case SELECTED_POST:
            return {...state, selectedPost:action.payload};
        case CLEAR_SELECTED_POST:
            return {...state, selectedPost: null}
        case UPDATE_POST:
            state.userPosts =  state.userPosts.map( (post) => post._id === action.payload.postId ? action.payload : post)
            return {
                ...state  
            }
        case DELETE_POST:
            return {...state, 
                userPosts:state.userPosts.filter((post) => post._id !== action.payload)
            };
        case ADD_COMMENT:
            state.comments.push(action.payload)
            return {
                ...state
            } 
        case UPDATE_COMMENT:
            return
        case DELETE_COMMENT :
            return
        case DISPLAY_POSTS : 
            return {...state, posts:action.payload, loading:false}
        case DISPLAY_USER_POSTS : 
            return {...state, 
                userPosts:action.payload, 
                loading:false,
                latitude:null,
                longitude:null
            }
        case DISPLAY_POST:
            return {...state, post:action.payload, loading:false, latitude:null,
                longitude:null}
        case DISPLAY_COMMENTS : 
            return {...state, comments:action.payload, loading:false}
        case LOADING : 
            return {...state, loading:true }
        case COUNT_ACTIONS :
            return {...state, actionsNumber:action.payload }
        case LOGIN:
           sessionStorage.setItem('profil', JSON.stringify(action.payload)); 
        //    console.log('action.payload=>', action.payload)
        //    console.log('type of action.payload=>', typeof(action.payload))
            return{...state, 
                errorMessage: '',
                userAuthenticated: true, 
                authData: action.payload,
                userData: action.payload.userInfo };
        case REGISTER : 
            return state;
        case LOGOUT:
            sessionStorage.setItem('profil', ''); 
            return{...state, userAuthenticated:false, authData:null, userPosts:[], userData:null,registerData: null };
        case SET_COORDINATES:
            console.log(action.payload) 
                return {...state, latitude:action.payload[0],
                longitude:action.payload[1]}
        default: 
            return state
    }
}

export default reducer;