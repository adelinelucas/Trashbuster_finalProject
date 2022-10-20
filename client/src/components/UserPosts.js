import React, { useState,useEffect} from 'react';
import { useGlobalContext } from '../app/context';
import Loading from './Loading';
import Post from './Post';
import {HiUserGroup} from 'react-icons/hi'
import EditPost from './EditPost';


const UserPosts = () => {
    const {loading,userPosts, openEditModal, editModal, fetchPostsByUser, authData, closeEditModal} = useGlobalContext();
    
    //  console.log(userPosts)
    //  console.log(userPosts[0])
    // if(loading){
    //     return(
    //         <>
    //         <Loading />
    //         </>
    //     )
    // }

    const handelClick = (e) =>{
        e.preventDefault()
        openEditModal()
    }

    useEffect( ()=>{
        fetchPostsByUser(authData.userId)
    }, [])

    if(!userPosts || userPosts.length == 0){
        return(
            <>
                <section className="w-full flex flex-col items-center my-20">
                    <HiUserGroup className='text-3xl text-greenApple'/>
                    <p className='text-2xl text-greenApple'> Aucune action encore créée sur votre compte. </p>
                    <div className='flex justify-center flex-col'>
                        <h4>Créer ma première action :</h4>
                        <button className="border rounded-full p-2 mr-2 my-4 bg-orangeV2 text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4" onClick={handelClick}>Créer un point de collecte</button>
                    </div>
                </section> 
                {editModal && <EditPost action={'addPost'} />}
            </>    
        )
    }
    

    return (
        <>
        <section className="w-full flex flex-col items-center my-20">
            
            {userPosts.map((post, index)=>{
                return <Post post={post} key={index} action={'edit'}/>
            })} 
        </section>
        
        </>
    );
    
};

export default UserPosts;