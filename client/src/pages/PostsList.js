import React, { useEffect, useState } from 'react';
import Posts from '../components/Posts';
import Loading from '../components/Loading';

const PostsList = () => {

    const[loading, setLoading] = useState(true);
    const[posts, setPosts] = useState([]);

    const getPost = async()=>{
        setLoading(true);

        try{
            const response = await fetch('http://localhost:5000/cleaning-operation/posts');
            const posts = await response.json();
            console.log(posts)
            setLoading(false)
            setPosts(posts)
        }catch(error){
            setLoading(false)
            console.log(error)
        }
    }

    useEffect( ()=>{
        getPost();
    },[]);

    if(loading){
        return (
            <section className="w-full flex justify-center min-h-screen">
                <Loading/>
            </section>
        )
    }
    return (
        <>
        <section className="w-full flex justify-center">
            <h1 className="text-greenV2 text-2xl font-bold py-4">Les actions de la communauté</h1>
        </section>
        <section className="w-full flex flex-col items-center min-h-screen">
            <Posts posts={posts} />
        </section>
        </>
    );
};

export default PostsList;