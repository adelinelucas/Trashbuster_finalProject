import { LOGIN, LOGOUT, REGISTER } from "../constants/actionsTypes";

const authReducer = (state, action) =>{
    switch(action.type){
        case LOGIN:
            return{...state, userAuthenticated:true, userRole:0, authData:action.data };
        case REGISTER : 
            return 
        case LOGOUT:
            return{...state, userAuthenticated:false, userRole:null, authData:null };
        default: 
            return state;
    }
}

export default authReducer;