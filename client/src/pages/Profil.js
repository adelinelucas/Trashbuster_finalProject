import React, { useState, useEffect } from 'react';
import EditPost from '../components/EditPost';
import UserInfo from '../components/UserInfo';
import { useLocation, useNavigate   } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Profil = () => {
    let location = useLocation();
    const [messageUser, setMessageUser] = useState('')

    console.log(location)
    const history = useNavigate();
    console.log(history);
    useEffect(() => {
        if (location.pathname == '/connexion')setMessageUser('Bienvenue sur votre espace utilisateur cher soldat du recyclage ! :)')
        else{
            setMessageUser('')
        }
    }, [location]);

    return (
        <>
        
            <section className="w-full flex justify-center">
                <h1 className="text-greenV2 text-2xl font-bold py-4">Mes actions & participations</h1>
            </section>
            {messageUser && 
                <section className="w-full flex justify-center">
                    <h2 className="text-orangeV2 text-xl font-bold py-4 italic text-center">{messageUser}</h2>
                </section> 
            }
            <div className="flex">
            <UserInfo />
            <EditPost />
            </div>
            
        </>
    );
};

export default Profil;