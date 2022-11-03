import React, { useEffect} from 'react';
import { useGlobalContext } from '../app/context';
import Post from './Post';
import {HiUserGroup} from 'react-icons/hi'
import EditPost from './EditPost';
import { useLocation } from 'react-router-dom';

const UserPosts = () => {
    const {loading,userPosts, openPostModal, editModal, fetchPostsByUser, authData, closeEditModal, getUserInfo} = useGlobalContext();
    const location = useLocation();

    const handelClick = (e) =>{
        e.preventDefault()
        openPostModal()
    }

    useEffect( ()=>{
        if(location.pathname === '/profil'){
            if(authData.userId){
                fetchPostsByUser(authData.userId)
                getUserInfo()
            }else {
                fetchPostsByUser(authData.user._id)
                getUserInfo()
            }            
        } 
    }, [location])

    if(!userPosts || userPosts.length == 0){
        return(
            <>
                <section className="w-full flex flex-col items-center my-0 lg:my-20">
                    <HiUserGroup className='text-3xl text-greenApple'/>
                    <p className='text-2xl text-greenApple text-center md:text-left'> Aucune action encore créée sur votre compte. </p>
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
        <section className="w-full flex flex-col items-center my-0  mb-10 lg:my-20">
            
            {userPosts.map((post, index)=>{
                return <Post post={post} key={index} action={'edit'}/>
            })} 
        </section>
        
        </>
    );
    
};

export default UserPosts;