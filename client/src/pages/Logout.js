import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../app/context';
import { useNavigate  } from 'react-router-dom';

const Logout = () => {
    const {logout} = useGlobalContext();
    const navigate = useNavigate();
    const [redirecToHome, setRedirectToHome] = useState(false)

    const handleLogout = () =>{
        let btn = document.getElementById('btnLogout');
        btn.style.animation= 'myJello 1s ease 0s 1 normal forwards'; 
        logout();
        setTimeout( ()=>{
            setRedirectToHome(true)
        }, 1000)
    }

    useEffect(()=>{
        if(redirecToHome) navigate('/')
    }, [navigate, redirecToHome])

    return (
        <div className='flex flex-col justify-center h-fit'>
            <section className="w-full bg-brightYellow flex flex-col justify-center py-10 text-greenV2 font-medium items-center" id="presentationBloc">
                <article className="w-11/12 md:w-8/12 lg:w-2/4 border-greenV2 border-x-8 rounded-2xl flex flex-col items-center py-10 ">
                    <h2 className="text-2xl my-4">Trash Buster </h2>
                    <i className="text-xl my-4 text-center md:text-left">vous remercie pour votre engagement</i>
                    <p><span className="font-bold flex justify-center text-xl text-white">Chaque geste compte !</span></p>
                </article>
                <article className="my-6 w-full flex justify-center py-8">
                    <button id="btnLogout" className={`bg-hero-HP2 bg-no-repeat bg-btnLogout rounded-2xl shadow-lg py-6 px-6 text-orangeV2 border-darkGreen border-r-8 border-b-8 text-3xl font-extrabold w-10/12 md:w-2/4 h-28 lg:h-64 m-auto hover:animate-wobbleAnim drop-shadow-2xl `} onClick={handleLogout}><span className='btnText'>Me déconnecter</span></button>
                </article>
            </section>
        </div>
    );
};

export default Logout;