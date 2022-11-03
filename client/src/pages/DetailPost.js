import React, { useState, useEffect } from 'react';
import Comments from '../components/Comments';
import Loading from '../components/Loading';
import { useParams, useLocation } from 'react-router-dom';
import AddComment from '../components/AddComment';
import { useGlobalContext } from '../app/context';
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import moment from 'moment';
import 'moment/locale/fr';

//
moment.locale('fr');
//

const url = `http://localhost:5000/cleaning-operation/post/`
const DetailPost = () => {
    const {id} = useParams();
    const {loading,openCommentModal,fetchPost, comments, commentModalOpen, post, isEditing, userAuthenticated, longitude, latitude, total_trash_collected} = useGlobalContext();
    const location = useLocation();
    // console.log(location)
    // console.log(userAuthenticated)
    const [picture, setPicture] = useState(null);
    const [progressValue, setProgressValue] = useState(0)
    const handleComment =() =>{
        openCommentModal(commentModalOpen);
    }

    const center = [latitude, longitude]
    const url = `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${process.env.REACT_APP_API_KEY}`
    
    const getPicture = async()=>{
        try{
            const response = await fetch(`http://localhost:5000/cleaning-operation/picture/${id}`);
            const data = await response.json();
            setPicture(data.picture.trash_picture)
            // setComments(post.postComments)
        }catch(error){
            console.log(error)
        }
    }

    const updateProgressValue = () =>{
        console.log(post.trash_quantity_total)
        if(post.trash_quantity_total){
            console.log(typeof(total_trash_collected))
            console.log(typeof(post.trash_quantity_total))
            let result = (parseInt(total_trash_collected) / parseInt(post.trash_quantity_total)) *100;
            console.log(result, 'line 46')
            setProgressValue(Math.ceil(parseInt(result)))
        }
    }
    useEffect( ()=>{
        getPicture();
        fetchPost(id);
        updateProgressValue()
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
            <article className="w-11/12 md:w-4/5 btnNavBarShadow flex flex-col my-3 bg-brightYellow">
                <div className='flex flex-col lg:flex-row items-center lg:items-left'>
                    <div className="mx-4 mt-4 bg-brightYellow h-fit w-fit">
                        <img src={picture ? picture : '../Trasbuster_white.png'} alt="photo illustrant les déchets à collecter" className="w-[240px]"/>
                    </div>
                    <div className="bg-brightYellow px-4 w-full">
                        <h3 className="font-bold text-xl py-2 font-Syne text-greenV2 uppercase">{post.name}</h3>
                        {post.description ?<p className="py-2">{post.description}</p>
                        : ''}
                        <div>
                            <p className="text-md">{post.street},<span className="font-bold text-lg ml-2">{post.postalCode}</span><span className="font-bold text-lg uppercase ml-2">{post.city}</span></p>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className='flex items-center md:flex-row'>
                                <p className="border rounded-full p-2 mr-2 bg-brightOrange text-white btnInscription shadow-lg border-white border-r-4 border-b-4">{post.trash_quantity_collected}</p>
                                <p className="py-4 pr-10">kilos de déchets collectés</p>
                            </div>
                            <div className='flex items-center md:flex-row'>
                                <p className="border rounded-full p-2 mr-2 bg-brightYellow text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">{post.trash_quantity_total}</p>
                                <p className="py-4">kilos de déchets à total sur l'action</p>
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-start flex-col md:flex-row">
                            <img className='w-[100px] md:w-[140px] mr-8' src='../community.png' alt="image d'illusation de la communauté TrashBuster" />
                            <div className='flex items-center md:flex-row'>
                                <p className="border rounded-full p-2 mr-2 bg-brightOrange text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">{total_trash_collected}</p>
                                <p className="py-4 pr-10">kilos de déchets collectés au total par la communauté</p>
                            </div>                            
                        </div>
                        <div className='flex flex-col'>
                            <h4>Progression de l'objectif :</h4>
                            <progress id="progressBar" max="100" value={progressValue}>{progressValue}%</progress>
                        </div>
                        {userAuthenticated && 
                        <div className="flex justify-end">
                            <button className="border rounded-full p-2 mr-2 my-4 bg-greenV2 text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4" onClick={handleComment}>Commenter l'action</button>
                        </div>}
                        <div className='flex justify-end'>
                            <p className="py-2 text-sm italic text-end">{moment(post.createdAt).fromNow()}</p>
                         </div>
                    </div> 
                </div>
                <div className="my-2 w-full z-10">
                        {longitude && latitude ? 
                            <MapContainer
                                center={center}
                                zoom={25}
                                style={{ width:'100%', height:'400px'}}
                            >
                                <TileLayer
                                url={url}
                                attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>' />
                            </MapContainer>
                        : 
                        'Chargement de la carte. Si aucune carte n\'apparaît d\'ici quelques secondes c\'est qu\'aucune carte n`\' disponible pour l\'action.' }        
                </div>
            
            </article>
            {comments.length > 0 ? <Comments comments={comments} /> : ''}
            {commentModalOpen=== true && <AddComment idPost={post._id}/>}
        </section>
    );
};

export default DetailPost;