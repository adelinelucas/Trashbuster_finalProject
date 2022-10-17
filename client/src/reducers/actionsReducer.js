import {OPEN_MODAL, CLOSE_MODAL, ADD_POST, UPDATE_POST, DELETE_POST, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT,LOADING, DISPLAY_POSTS, DISPLAY_POST, DISPLAY_COMMENTS, COUNT_ACTIONS } from '../constants/actionsTypes'
const reducer= (state, action) =>{
    switch(action.type){
        case OPEN_MODAL:
            return {...state, commentModalOpen:true};
        case CLOSE_MODAL:
            return {...state, commentModalOpen:false};
        case ADD_POST:
            return 
        case UPDATE_POST:
            return
        case DELETE_POST:
            return
        case ADD_COMMENT:
            return 
        case UPDATE_COMMENT:
            return
        case DELETE_COMMENT :
            return
        case DISPLAY_POSTS : 
            return {...state, posts:action.payload, loading:false}
        case DISPLAY_POST:
            return {...state, post:action.payload, loading:false}
        case DISPLAY_COMMENTS : 
            return {...state, comments:action.payload, loading:false}
        case LOADING : 
            return {...state, loading:true }
        case COUNT_ACTIONS :
            return {...state, actionsNumber:action.payload }
        default: 
            return state
    }
}

export default reducer;