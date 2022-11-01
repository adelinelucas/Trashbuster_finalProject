import React, {useState} from 'react';
import moment from 'moment';
import 'moment/locale/fr'
moment.locale('fr');

const url = `http://localhost:5000/cleaning-operation/post/`
const Comments = ({comments}) => {
    console.log(comments)
    const [loading, setLoading]= useState(true);
    const [editing, setEditing]= useState(false);
    return (
        <div className="w-4/5 flex flex-col items-center my-3 bg-lightGrey">
            {
                comments.map((comment, index)=>{
                   return( <div key={index} id="one commentaire" className="w-full btnNavBarShadow flex flex-col md:flex-row items-center my-3 bg-lightGrey">
                    <div className="mx-4">
                        <img src="../hero.png" alt="photo illustrant les déchets à collecter" className="w-[250px]"/>
                    </div>
                    <div className="px-4 flex flex-col w-[80%]">
                        <h4 className="font-bold text-md my-1">{comment.author ? comment.author: ''} </h4>
                        <h4 className="font-bold text-md my-1">{comment.title ? comment.title: ''}</h4>
                        <p>{comment.content}</p>
                        <div className='flex flex-row items-center'>
                            <p className="border rounded-full p-2 mr-2 bg-brightOrange text-white btnInscription shadow-lg border-white border-r-4 border-b-4">{comment.trash_quantity_collected}</p>
                            <p className="py-4">kilos de déchets collectés</p>
                        </div>
                        <div className='flex justify-end'>
                            <p className="py-2 text-sm italic text-end">{moment(comment.createdAt).fromNow()}</p>
                        </div>
                    </div>
                    
                </div>)
                })
            }
        </div>
    );
};

export default Comments;