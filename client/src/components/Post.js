import React from 'react';
import {Link} from 'react-router-dom'
import Posts from './Posts';

const Post = ({post}) => {

    return (
        <article className="w-3/5 btnNavBarShadow flex items-center my-3">
            <div className="mx-4">
                <img src="./hero.png" alt="photo illustrant les déchets à collecter" className="w-[150px]"/>
            </div>
            <div class="bg-brightYellow px-4 min-w-[84%] ">
                <h3 className="font-bold text-xl py-2 uppercase">{post.name}</h3>
                {post.description ? <p className="py-2">{post.description}</p> : ''}
                <div>
                    <p className="text-md">{post.street},<span className="font-bold text-lg ml-2">{post.postalCode}</span><span class="font-bold text-lg uppercase ml-2">{post.city}</span></p>
                </div>
                <div className="flex">
                    <p className="py-4 pr-10"><badge className="border rounded-full p-2 mr-2 bg-brightOrange text-white btnInscription shadow-lg border-white border-r-4 border-b-4">{post.trash_quantity_collected}</badge>de déchets à collectés</p>
                    <p className="py-4"><badge className="border rounded-full p-2 mr-2 bg-brightYellow text-white btnInscription shadow-lg border-white border-r-4 border-b-4">{post.trash_quantity_total}</badge>kilos de déchets à total sur l'action</p>
                </div>
                {/* <button className="border rounded-full p-2 mr-2 my-4 bg-greenApple text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4" onClick={()=>{console.log('click')}}>Voir le détail de l'action</button> */}
                <div className='my-4'>
                    <Link to={`/detail_action/${post._id}`} className="border rounded-full p-2 mr-2 my-4 bg-greenApple text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4" onClick={()=>{console.log('click')}}>Voir le détail de l'action</Link>
                </div>
            </div>
        </article>
    );
};

export default Post;