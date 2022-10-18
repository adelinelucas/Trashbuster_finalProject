import axios from 'axios';

export default axios.create({baseURL : 'http://localhost:5000'})

const API=''; 
API.interceptors.request.use( (req)=> {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})