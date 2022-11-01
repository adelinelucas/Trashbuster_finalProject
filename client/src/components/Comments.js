import React, {useState, useEffect} from 'react';
import moment from 'moment';
import 'moment/locale/fr'
import Comment from './Comment';
moment.locale('fr');

const url = `http://localhost:5000/cleaning-operation/post/`
const Comments = ({comments}) => {
    console.log(comments)
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