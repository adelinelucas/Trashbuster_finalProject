import React from 'react';
import { useGlobalContext } from '../app/context';

const Logout = () => {
    const {logout} = useGlobalContext();
    let clickCss = ''
    let btn = document.getElementById('btnLogout');

    if(btn){
        console.log('in btn')
        btn.addEventListener('mouseenter', ()=>{
            btn.style.animation= 'myAnim 1s ease 0s 1 normal forwards';
        })
        btn.addEventListener('mouseleave', ()=>{
            btn.style = 'no style';
        })
    }
   

    const handleLogout = () =>{
        console.log('logout')
        btn.style.animation= 'myJello 1s ease 0s 1 normal forwards'; 
        console.log(btn)
        logout()
    }

    return (
        <div className='flex flex-col justify-center h-fit'>
            <section className="w-full bg-brightYellow flex flex-col justify-center py-10 text-greenV2 font-medium items-center" id="presentationBloc">
                <article className="w-2/4 border-greenV2 border-x-8 rounded-2xl flex flex-col items-center py-10 ">
                    <h2 className="text-2xl my-4">Trash Buster </h2>
                    <i className="text-xl my-4">vous remercie pour votre engagement</i>
                    <p><span className="font-bold flex justify-center text-xl text-white">Chaque geste compte !</span></p>
                </article>
                <article className="my-6 w-full flex justify-center py-8">
                    <button id="btnLogout" className={`bg-hero-HP2 bg-no-repeat bg-btnLogout rounded-2xl shadow-lg py-6 px-6 text-orangeV2 border-darkGreen border-r-8 border-b-8 text-3xl font-extrabold  w-2/4 h-44 m-auto `} onClick={handleLogout}>Me déconnecter</button>
                </article>
            </section>
        </div>
    );
};

export default Logout;