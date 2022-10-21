import React, { useState, useEffect } from 'react';
import Comments from '../components/Comments';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';
import AddComment from '../components/AddComment';
import { useGlobalContext } from '../app/context';
import {MapContainer, TileLayer} from 'react-leaflet';

const url = `http://localhost:5000/cleaning-operation/post/`
const DetailPost = () => {
    const {id} = useParams();
    const {loading,openModal, fetchPostComments,fetchPost, comments, commentModalOpen, post, isEditing, userAuthenticated} = useGlobalContext();

    console.log(userAuthenticated)
    const handleComment =() =>{
        openModal(commentModalOpen);
    }

    // const getPost = async()=>{
    //     setLoading(true);
    //     try{
    //         const response = await fetch('http://localhost:5000/cleaning-operation/post/6339ccb44e67b4673eae2057');
    //         const post = await response.json();
    //         console.log(post)
    //         setLoading(false)
    //         setPost(post.post)
    //         // setComments(post.postComments)
    //     }catch(error){
    //         setLoading(false)
    //         console.log(error)
    //     }
    // }

    useEffect( ()=>{
        //getPost();
        fetchPost(id)
        fetchPostComments(id)
    },[]);

    // useEffect( ()=>{
    //     fetchPostsByUser(authData.userId)
    // }, [])

    if(loading){
        return (
            <section className="w-full flex justify-center min-h-screen">
                <Loading/>
            </section>
        )
    }
    
    return (
        <section className="w-full flex flex-col justify-center items-center">
            <article className="w-4/5 btnNavBarShadow flex items-center my-3 bg-brightYellow">
                <div className="mx-4  bg-white h-100% w-2/5">
                    <img src="./hero.png" alt="photo illustrant les déchets à collecter" className="w-[550px]"/>
                </div>
                <div className="bg-brightYellow px-4 w-fit">
                    <h3 className="font-bold text-xl py-2 font-Syne text-greenV2 uppercase">{post.name}</h3>
                    {post.description ?<p className="py-2">{post.description}</p>
                    : ''}
                    <div>
                        <p className="text-md">{post.street},<span className="font-bold text-lg ml-2">{post.postalCode}</span><span className="font-bold text-lg uppercase ml-2">{post.city}</span></p>
                    </div>
                    <div className="flex">
                        <p className="py-4 pr-10"><span className="border rounded-full p-2 mr-2 bg-brightOrange text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">{post.trash_quantity_collected}</span>kilos de déchets à collectés</p>
                        <p className="py-4"><span className="border rounded-full p-2 mr-2 bg-brightYellow text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">{post.trash_quantity_total}</span>kilos de déchets à total sur l'action</p>
                    </div>
                    <div className="my-2 flex justify-center">
                        plage for map
                        <MapContainer
                            
                        ></MapContainer>
                    </div>
                    {userAuthenticated && <div className="flex justify-end">
                        <button className="border rounded-full p-2 mr-2 my-4 bg-greenV2 text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4" onClick={handleComment}>Commenter l'action</button>
                    </div>}
                    {isEditing &&
                        <div className="flex justify-end">
                            <button className="border rounded-full p-2 mr-2 my-4 bg-aquaBlue text-white cursor-pointer btnUpdate shadow-lg border-white border-r-4 border-b-4">Editer l'action</button>
                            <button className="border rounded-full p-2 mr-2 my-4 bg-lightRed text-white cursor-pointer btnDelete shadow-lg border-white border-r-4 border-b-4">Supprimer l'action</button>
                        </div>
                    }
                </div>
            </article>
            <Comments comments={comments} />
            {commentModalOpen=== true && <AddComment idPost={post._id}/>}
        </section>
    );
};

export default DetailPost;