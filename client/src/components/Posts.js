import React from 'react';
import Post from './Post';

const Posts = ({posts}) => {
    console.log(posts)
    // console.log(posts.posts)
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