import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../app/context';
import { Navigate,useNavigate  } from 'react-router-dom';

const Logout = () => {
    const {logout} = useGlobalContext();
    const navigate = useNavigate();
    const [redirecToHome, setRedirectToHome] = useState(false)

    const handleLogout = () =>{
        console.log('logout')
        let btn = document.getElementById('btnLogout');
        btn.style.animation= 'myJello 1s ease 0s 1 normal forwards'; 
        console.log(btn)
        logout();
        setTimeout( ()=>{
            setRedirectToHome(true)
            console.log('setimeout')
        }, 1000)
    }

    useEffect(()=>{
        if(redirecToHome) navigate('/')
    }, [redirecToHome])

    return (
        <div className='flex flex-col justify-center h-fit'>
            <section className="w-full bg-brightYellow flex flex-col justify-center py-10 text-greenV2 font-medium items-center" id="presentationBloc">
                <article className="w-2/4 border-greenV2 border-x-8 rounded-2xl flex flex-col items-center py-10 ">
                    <h2 className="text-2xl my-4">Trash Buster </h2>
                    <i className="text-xl my-4">vous remercie pour votre engagement</i>
                    <p><span className="font-bold flex justify-center text-xl text-white">Chaque geste compte !</span></p>
                </article>
                <article className="my-6 w-full flex justify-center py-8">
                    <button id="btnLogout" className={`bg-hero-HP2 bg-no-repeat bg-btnLogout rounded-2xl shadow-lg py-6 px-6 text-orangeV2 border-darkGreen border-r-8 border-b-8 text-3xl font-extrabold  w-2/4 h-44 m-auto hover:animate-wobbleAnim`} onClick={handleLogout}>Me déconnecter</button>
                </article>
            </section>
        </div>
    );
};

export default Logout;