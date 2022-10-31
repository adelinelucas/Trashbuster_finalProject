import React, {useState} from 'react';
import {FaWindowClose} from 'react-icons/fa'
import { useGlobalContext } from '../app/context';
import FileBase from 'react-file-base64';


const EditPost = ({action}) => {
    const {closeEditModal, editModal, authData, registerAction, selectedPost, clearSelectedPost, updateAction} = useGlobalContext();

    const registerData = {name:'', description:'', userId:authData.userId, street:'', postalCode:'', city:'',trash_quantity_total:'',trash_quantity_collected:'',trash_picture:'' }

    if(selectedPost){
        registerData.name = selectedPost.name;
        registerData.description = selectedPost.description;
        registerData.street = selectedPost.street;
        registerData.postalCode = selectedPost.postalCode;
        registerData.city = selectedPost.city;
        registerData.trash_quantity_total = selectedPost.trash_quantity_total;
        registerData.trash_quantity_collected = selectedPost.trash_quantity_collected;
        registerData.postId = selectedPost._id;
    }
    // console.log(action)
    const [formData, setFormData] = useState(registerData);

    const handelComment = () =>{
        closeEditModal();
        clearSelectedPost()
    }
    
    const handleChange =(e) =>{
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    const handelActionForm = (e) =>{
        e.preventDefault();
        // console.log(e.currentTarget)
        // const form = new FormData(e.currentTarget);
        // console.log(form)
        console.log(formData)
        if(selectedPost){
            updateAction(formData)
        }else {
            
            registerAction(formData)
        }
        closeEditModal()
        clearSelectedPost()
    }
    return (
        <div className="absolute w-full flex flex-col justify-center items-center bg-popUp z-10 top-[15%] h-min-screen py-12">
            <section className="w-full flex flex-col items-center justify-center">
                <article className="w-4/5 flex items-center my-3 justify-center relative ">
                    <div className='absolute top-[15px] right-[18%] text-3xl cursor-pointer'>
                    <FaWindowClose  onClick={handelComment}/> 
                    </div>
                    <div className="bg-white border-8 border-brightYellow px-4 py-8 w-8/12">
                        <form className="w-full" onSubmit={handelActionForm}>
                            <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                                <label htmlFor="name" className="text-orangeV2 w-full mb-1 px-1 font-bold">Titre de l'action</label>
                                <input type="text" autoComplete="off" name="name" id="name" className="border-2 border-orangeV2 leading-normal w-full" required value={formData.name} onChange={handleChange}/>
                            </div>
                            <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                                <label htmlFor="description" className="text-orangeV2 w-full mb-1 px-1 font-bold">Description de l'action</label>
                                <textarea autoComplete="off" name="description" id="description" className="border-2 border-orangeV2 leading-normal w-full" value={formData.description} onChange={handleChange}></textarea>
                            </div>
                            <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                                <label htmlFor="street" className="text-orangeV2 w-full mb-1 px-1 font-bold">Rue où se situe le point de collecte</label>
                                <input type="text" autoComplete="off" name="street" id="street" className="border-2 border-orangeV2 leading-normal w-full" required value={formData.street} onChange={handleChange} />
                            </div>
                            <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                                <label htmlFor="postalCode" className="text-orangeV2 w-full mb-1 px-1 font-bold">Code postal du point de collecte</label>
                                <input type="text" autoComplete="off" name="postalCode" id="postalCode" className="border-2 border-orangeV2 leading-normal w-full" required value={formData.postalCode} onChange={handleChange}/>
                            </div>
                            <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                                <label htmlFor="city" className="text-orangeV2 w-full mb-1 px-1 font-bold">Ville du point de collecte</label>
                                <input type="text" autoComplete="off" name="city" id="city" className="border-2 border-orangeV2 leading-normal w-full" required value={formData.city} onChange={handleChange}/>
                            </div>
                            <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                                <label htmlFor="trash_quantity_total" className="text-orangeV2 w-full mb-1 px-1 font-bold">Quantité de déchets (approximative) à collecter en kg</label>
                                <input type="number" min="0" max="1000" step="5" name="trash_quantity_total" id="trash_quantity_total" className="border-2 border-orangeV2 leading-normal w-full" value={formData.trash_quantity_total} onChange={handleChange}/>
                            </div>
                            <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                                <label htmlFor="trash_quantity_collected" className="text-orangeV2 w-full mb-1 px-1 font-bold">Quantité de déchets (approximative) déjà collectée en kg</label>
                                <input type="number" min="0" max="1000" step="1" name="trash_quantity_collected" id="trash_quantity_collected" className="border-2 border-orangeV2 leading-normal w-full" value={formData.trash_quantity_collected} onChange={handleChange}/>
                            </div>
                            {selectedPost ? '' : 
                                <div className="mx-6 mb-2 px-4 py-1 flex flex-col">
                                    <label htmlFor="trash_picture" className="text-orangeV2 w-full mb-1 px-1 font-bold">Charger une photographie du point de collecte</label>
                                    {/* <input type="file" name="trash_picture" id="trash_picture" className="border-2 border-orangeV2 leading-normal w-full" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, trash_picture: base64 })}/> */}
                                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, trash_picture: base64 })}  className="border-2 border-orangeV2 leading-normal w-full"/>
                                </div>
                            }
                            
                            <div className="flex justify-end">
                                <button className="border rounded-full p-2 mr-2 my-4 bg-orangeV2 text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">{selectedPost ?"Mettre à jour l'action" : "Publier l'action"}</button>
                            </div>
                        </form>                     
                    </div>
                </article>
            </section>
        </div>
        
    );
};

export default EditPost;