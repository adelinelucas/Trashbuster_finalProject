import React, { useState, useEffect } from 'react';
import Comments from '../components/Comments';
import { useParams, useLocation } from 'react-router-dom';
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import moment from 'moment';
import 'moment/locale/fr';
import fakePosts from '../datas/fakePosts';
import fakeComments from '../datas/fakeComments';
import fakePicture from '../datas/fakePicture';
//
moment.locale('fr');
//


const DetailPostv2 = () => {
    const {id} = useParams();
    const posts = fakePosts;
    let post;
    let comments=[];
    let picture;
    let total_trash_collected = 0;
    for (const [key, value] of Object.entries(posts)) {
        if(value._id === id) {
            post = posts[key];
            total_trash_collected += Number(posts[key].trash_quantity_collected)
        }
    }
    for (const [key, value] of Object.entries(fakeComments)) {
        if(value.postId === post._id){
            comments.push(fakeComments[key])
            total_trash_collected += Number(fakeComments[key].trash_quantity_collected)
        } 
    }
    for (const [key, value] of Object.entries(fakePicture)) {
        if(value.postId === post._id) picture= fakePicture[key].trash_picture
    }
    const [longitude, setLongitude]= useState(null); 
    const [latitude, setLatitude]= useState(null); 

    const getMap = (data) =>{
        var requestOptions = {
            method: 'GET',
          };
        //   https://api.geoapify.com/v1/geocode/search?text=142%20rue%20Henri%20Barbusse%2C%2093300%20Aubervilliers&lang=fr&limit=1&type=street&format=json&apiKey=YOUR_API_KEY
        let postalCode = data.postalCode;
        let city = data.city;
        let street = data.street.replace(' ', '%20');
        let locationURL = `https://api.geoapify.com/v1/geocode/search?text=${street}%2C%20${postalCode}%20${city}&lang=fr&limit=1&type=street&format=json&apiKey=${process.env.REACT_APP_API_KEY}`;
        fetch(locationURL, requestOptions)
            .then(response => response.json())
            .then(result => {  
                setLatitude(result.results[0].lat);
                setLongitude(result.results[0].lon);
            })
            .catch(error => console.log('error', error));
    }
    getMap(post)

    const [progressValue, setProgressValue] = useState(0)
    const center = [latitude, longitude]
    const url = `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${process.env.REACT_APP_API_KEY}`

    const updateProgressValue = () =>{
        if(post.trash_quantity_total){
            let result = ( 100* parseInt(total_trash_collected)) / parseInt(post.trash_quantity_total);
            setProgressValue(Math.ceil(parseInt(result)))
        }
    }

    useEffect( ()=>{
        updateProgressValue()
    },[updateProgressValue]);

    // useEffect( ()=>{
    //     fetchPostsByUser(authData.userId)
    // }, [])
    
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
                            <progress id="progressBar" max={post.trash_quantity_total} value={total_trash_collected}>{progressValue}%</progress>
                        </div>
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
            {comments && comments.length > 0 ? <Comments comments={comments} /> : ''}
        </section>
    );
};

export default DetailPostv2;