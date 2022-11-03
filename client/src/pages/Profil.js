import React, { useState, useEffect } from 'react';
import EditPost from '../components/EditPost';
import UserInfo from '../components/UserInfo';
import { useLocation, useNavigate   } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../app/context';
import UserPosts from '../components/UserPosts';

const Profil = () => {
    let location = useLocation();
    const [messageUser, setMessageUser] = useState('');
    const {fetchPostsByUser, authData, userPosts, openPostModal, editModal, getUserInfo, getUserBadge } = useGlobalContext();
    // console.log(authData)
    const [userInfo, setUserInfo] = useState(null);


    const handelClick = (e) =>{
        e.preventDefault()
        openPostModal()
    }
    // console.log(location)
    const history = useNavigate();
    // console.log(history);
    useEffect(() => {
        if (location.pathname !== '/connexion')setMessageUser('Bienvenue sur votre espace utilisateur cher soldat du recyclage ! :)')
        else{
            setMessageUser('')
        }
    }, [location]);

    useEffect( ()=>{
        // console.log(authData.userId)
        // fetchPostsByUser(authData.userId)
        getUserInfo();
        getUserBadge()
    }, [])

    return (
        <>
        
            <section className="w-full flex justify-center">
                <h1 className="text-center md:text-left text-greenV2 text-2xl font-bold py-4">Mes actions & participations</h1>
            </section>
            {messageUser && 
                <section className="w-full flex justify-center">
                    <h2 className="text-orangeV2 text-xl font-bold py-4 italic text-center">{messageUser}</h2>
                </section> 
            }
            {!userPosts || userPosts.length === 0 ? '' : 
                <section className="w-full flex justify-center md:justify-end">
                    <div className="flex justify-center md:justify-end">
                        <button className="border rounded-full p-2 mr-2 my-4 bg-orangeV2 text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4" onClick={handelClick}>Créer un point de collecte</button>
                    </div>
                </section>
            }
            
            <div className="flex flex-col lg:flex-row">
            <UserInfo />
            {editModal && <EditPost action={'addPost'} />}
            <UserPosts />
            </div>
            
        </>
    );
};

export default Profil;