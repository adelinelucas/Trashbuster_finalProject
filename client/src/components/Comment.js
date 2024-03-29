import React, {useState, useEffect} from 'react';
import { useGlobalContext } from '../app/context';
import moment from 'moment';
import 'moment/locale/fr'
moment.locale('fr');

const url = `https://trashbuster-finalproject.onrender.com/post/`

const Comment = ({comment}) => {
    const [picture, setPicture] = useState(null);

    const getPicture = async()=>{
        try{
            const response = await fetch(`https://trashbuster-finalproject.onrender.com/cleaning-operation/picture/${comment._id}`);
            const data = await response.json();
            setPicture(data.picture.trash_picture)
        }catch(error){
            console.log(error)
        }
    }

    useEffect( ()=>{
        getPicture()

    },[]);

    return (
        <div className="w-4/5 flex flex-col items-center my-3 bg-lightGrey">
    
            <div id="one commentaire" className="w-full btnNavBarShadow flex flex-col md:flex-row items-center my-3 bg-lightGrey">
                <div className="mx-4">
                    <img src={picture ? picture :"../hero.png"} alt="photo illustrant les déchets à collecter" className="w-[250px]"/>
                </div>
                <div className="px-4 flex flex-col w-[80%]">
                    <h4 className="font-bold text-md my-1">{comment.title ? comment.title : ''}</h4>
                    <p>{comment.content}</p>
                    <div className='flex flex-row items-center'>
                        <p className="border rounded-full p-2 mr-2 bg-brightOrange text-white btnInscription shadow-lg border-white border-r-4 border-b-4">{comment.trash_quantity_collected}</p>
                        <p className="py-4">kilos de déchets collectés</p>
                    </div>
                    <div className='flex justify-end flex-col items-end'>
                        <h4 className="italic font-bold text-md my-1">Ecrit par : {comment.author ? comment.author: ''} </h4>
                        <p className="py-2 text-sm italic text-end">{moment(comment.createdAt).fromNow()}</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Comment;