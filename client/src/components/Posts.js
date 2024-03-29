import React from 'react';
import Post from './Post';

const Posts = ({posts}) => {
    const allPost = posts;

    return (
        <>
           {allPost.map((post, index)=>{
            return <Post post={post} key={index} action={'consultation'}/>
           })} 
        </>
    );
};

export default Posts;