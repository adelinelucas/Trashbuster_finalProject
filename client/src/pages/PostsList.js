import React, { useEffect, useState } from 'react';
import Posts from '../components/Posts';
import Loading from '../components/Loading';
import { useGlobalContext } from '../app/context';

const PostsList = () => {
    const {posts, loading,actionsNumber, fetchActionsNumber, fetchPosts} = useGlobalContext();

    console.log('PostsList',posts)
    // const[loading, setLoading] = useState(true);
    // const[posts, setPosts] = useState([]);
    // const [actionsNumber, setActionsNumber] = useState(0);

    // const getPosts = async()=>{
    //     setLoading(true);

    //     try{
    //         const response = await fetch('http://localhost:5000/cleaning-operation/posts');
    //         const posts = await response.json();
    //         // console.log(posts)
    //         setLoading(false)
    //         setPosts(posts)
    //     }catch(error){
    //         setLoading(false)
    //         console.log(error)
    //     }
    // }

    // const getactionsNumber = async() =>{
    //     try{
    //         const response = await fetch('http://localhost:5000/cleaning-operation/numberPosts');
    //         const number = await response.json();
    //         setActionsNumber(number.numberOfPost)
    //     }catch(error){
    //         // setLoading(false)
    //         console.log(error)
    //     }
    // }

    useEffect( ()=>{
        // loading = false;
        fetchPosts();
        fetchActionsNumber();
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
            <section className="w-full flex justify-start">
                <h4 className="text-greenV2 text-xl font-bold py-4 ml-8">Total des actions: {actionsNumber.numberOfPost}</h4>
            </section>
            <section className="w-full flex flex-col items-center min-h-screen">
                <Posts posts={posts.posts} />
            </section>
        </>
    );
};

export default PostsList;