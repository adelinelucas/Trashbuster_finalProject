import React, { useState } from 'react';
import {FaWindowClose} from 'react-icons/fa'
import { useGlobalContext } from '../app/context';

const AddComment = ({idPost}) => {
    const {closeModal, commentModalOpen, post, addAComment} = useGlobalContext();

    const commentData = {userId:'', postId:post._id, userId:post.userId,title:'', content:'', trash_picture:'picture.test', trash_quantity_collected:'' }
    /*
    console.log(post)
    if(post.length == 0 ){
        commentData.postId = post._id, 
        commentData.userId = post.userId
    }
    */

    const [formCommentData, setFormCommentData] = useState(commentData);

    const closeComment = () =>{
        closeModal()
    }

    const handleChange =(e) =>{
        setFormCommentData({...formCommentData, [e.target.name]: e.target.value })
    }

    const handelCommentForm = (e) =>{
        e.preventDefault();
        console.log('handelCommentForm')
        console.log(formCommentData)
        addAComment(formCommentData)
        closeModal()
    }
    return (
        <section className="absolute w-full flex flex-col justify-center items-center bg-popUp z-10 top-[15%] h-min-screen py-12">
            <div id="add comment" className="w-3/5 btnNavBarShadow flex flex-col items-center my-3 bg-lightGrey p-5">
                <div className='relative top-[-15px] right-[-50%] text-3xl cursor-pointer'>
                   <FaWindowClose  onClick={closeComment}/> 
                </div>
                <h4 className='text-greenV2 w-full mb-1 px-1 font-bold text-2xl text-center'>Ajouter un commentaire </h4>
                <form className="w-full" onSubmit={handelCommentForm}>
                    <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                        <label htmlFor="title" className="text-greenV2 w-full mb-1 px-1 font-bold">Titre du commentaire</label>
                        <input type="text" autoComplete="off" name="title" id="title" className="border-2 border-greenV2 leading-normal w-full" value={formCommentData.title} onChange={handleChange} required/>
                    </div>
                    <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                        <label htmlFor="content" className="text-greenV2 w-full mb-1 px-1 font-bold">Contenu du commentaire</label>
                        <textarea name="content" id="content" className="border-2 border-greenV2 leading-normal w-full" value={formCommentData.content} onChange={handleChange} required></textarea>
                    </div>
                    <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                        <label htmlFor="trash_picture" className="text-greenV2 w-full mb-1 px-1 font-bold">Ajouter une photo à votre commentaire</label>
                        <input type="file" name="trash_picture" id="trash_picture" className="border-2 border-greenV2 leading-normal" />
                    </div>
                    <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                        <label htmlFor="trash_quantity_collected" className="text-greenV2 w-full mb-1 px-1 font-bold">Quantité collectée</label>
                        <input type="number" name="trash_quantity_collected" id="trash_quantity_collected" className="border-2 border-greenV2 leading-normal w-full" required value={formCommentData.trash_quantity_collected} onChange={handleChange}/>
                    </div>
                    <div className="w-full flex justify-end">
                        <button type="submit" className="border rounded-full p-2 mr-2 my-4 bg-greenV2 text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">Commenter l'action</button>
                    </div> 
                </form>
            </div>
        </section>
    );
};

export default AddComment;