import React, { useState } from 'react';
import {FaWindowClose} from 'react-icons/fa'
import { useGlobalContext } from '../app/context';

const AddComment = ({idPost}) => {

    const {closeModal, commentModalOpen} = useGlobalContext();
    const handelComment = () =>{
        closeModal()
    }

    return (
        <section className="absolute w-full flex flex-col justify-center items-center bg-popUp z-10 top-[15%] h-min-screen py-12">
            <div id="add comment" className="w-3/5 btnNavBarShadow flex flex-col items-center my-3 bg-lightGrey p-5">
                <div className='relative top-[-15px] right-[-50%] text-3xl cursor-pointer'>
                   <FaWindowClose  onClick={handelComment}/> 
                </div>
                <h4 className='text-greenV2 w-full mb-1 px-1 font-bold text-2xl text-center'>Ajouter un commentaire </h4>
            <form className="w-full">
                <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                    <label htmlFor="title" className="text-greenV2 w-full mb-1 px-1 font-bold">Titre du commentaire</label>
                    <input type="text" autocomplete="off" name="title" id="title" className="border-2 border-greenV2 leading-normal w-full"/>
                </div>
                <div class="mx-6 mb-2 px-4 py-1 flex flex-col">
                    <label htmlFor="comment" className="text-greenV2 w-full mb-1 px-1 font-bold">Contenu du commentaire</label>
                    <textarea autocomplete="off" name="comment" id="comment" className="border-2 border-greenV2 leading-normal w-full"></textarea>
                </div>
                <div class="mx-6 mb-2 px-4 py-1 flex flex-col">
                    <label htmlFor="picture" className="text-greenV2 w-full mb-1 px-1 font-bold">Ajouter une photo à votre commentaire</label>
                    <input type="file" name="picture" id="picture" className="border-2 border-greenV2 leading-normal"/>
                </div>
                <div class="mx-6 mb-2 px-4 py-1 flex flex-col">
                    <label htmlFor="quantityCollected" className="text-greenV2 w-full mb-1 px-1 font-bold">Quantité collectée</label>
                    <input type="number" name="picture" id="picture" className="border-2 border-greenV2 leading-normal w-full"/>
                </div>
                <div class="w-full flex justify-end">
                    <button type="submit" className="border rounded-full p-2 mr-2 my-4 bg-greenV2 text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">Commenter l'action</button>
                </div> 
            </form>
        </div>
        </section>
    );
};

export default AddComment;