import React, {useState, useEffect} from 'react';
import moment from 'moment';
import 'moment/locale/fr'
import Comment from './Comment';
moment.locale('fr');

const url = `https://trashbuster-finalproject.onrender.com/post/`
const Comments = ({comments}) => {
    const [loading, setLoading]= useState(true);
    const [editing, setEditing]= useState(false);

    return (
        <>
            {
                comments.map((comment, index)=>{
                   return( <Comment comment={comment} key={index}/>)
                })
            }
        </>
    );
};

export default Comments;