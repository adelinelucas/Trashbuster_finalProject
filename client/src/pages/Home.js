import React from 'react';
import {FaRecycle, FaLocationArrow, FaBalanceScale} from 'react-icons/fa';
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className="shadow-md w-full h-1" id="separator"></div>
            <section className="shadow-md h-auto w-full flex flex-col items-center py-38 lg:py-48 bg-hero-HP2 bg-no-repeat bg-center bg-cover"  id="heroBloc"> 
                <article className=" my-0 sm:my-6">
                    <img src="logoTB.png" alt="Trash Buster logo" className="w-[430px] h-auto"  />
                </article>
                <h1 className="text-purpleGrey my-6 text-xl font-bold">Trash Buster,</h1>
                <h2 className="text-purpleGrey my-6 text-lg font-bold text-center sm:text-left">Une communauté engagée pour trier et collecter les déchets</h2>
                <article className="my-6">
                    <Link to={`/liste_des_actions`} className="bg-greenV2 rounded-2xl shadow-lg py-6 px-6 text-white btnHero border-darkGreen border-r-8 border-b-8 text-sm md:text-xl">Voir les actions de la communauté</Link>
                </article>
            </section>
            <div className="shadow-md w-full h-1" id="separator"></div>
            <section className="w-full bg-brightYellow flex justify-center py-10 text-greenV2 font-medium" id="presentationBloc">
                <article className="w-11/12 md:w-8/12 lg:w-2/4 border-greenV2 border-x-8 rounded-2xl flex flex-col items-center py-10 px-2 ">
                    <h2 className="text-2xl my-4">Trash Buster </h2>
                    <i className="text-xl my-4 text-center md:text-left">Quel est le but de la plateforme ?</i>
                    <p className="text-xl text-center md:text-left">L'objectif est de constuire une communauté engagée pour <br/>
                        <span className="font-bold flex justify-center md:text-xl text-white text-center md:text-left text-base ">répérer , collecter , tirer, réutiliser</span>les déchets qui jonchent nos espaces ou jeter selon les consignes de tri.  </p>
                </article>
            </section>
            <section className="bg-white w-full flex flex-col md:flex-row px-0 pr-10 lg:px-40 py-20 justify-center" id="keyInfoBloc">
                <article className="w-full lg:w-3/12 xl:w-2/12 bg-greenV2 mx-4 px-8 py-4 flex justify-center shadow-2xl cardBoxShadow">
                    <h3 className="text-white text-lg"><span className="font-bold">500</span><br/> membres dans la communauté</h3>
                </article>
                <article className="w-full lg:w-3/12 xl:w-2/12 bg-brightYellow mx-4 px-8 py-4 flex justify-center shadow-2xl cardBoxShadow">
                    <h3 className="text-purpleGrey text-lg"><span className="font-bold">750</span><br/> kilos collectés, triés</h3>
                </article>
                <article className="w-full lg:w-3/12 xl:w-2/12 bg-orangeV2 mx-4 px-8 py-4 flex justify-center shadow-2xl cardBoxShadow">
                    <h3 className="text-white text-lg"><span className="font-bold">120</span><br/>communes impliquées</h3>
                </article>
            </section>
            <section className="bg-greenApple w-full flex flex-col md:flex-row px-0 pr-10 lg:px-40 py-20 justify-center" id="recycleInfoBloc">
                <article className="w-full lg:w-3/12 xl:w-2/12 bg-darkGreen mx-4 px-8 py-4 flex justify-center border-4 border-lightGrey items-center hover:scale-105 cardBoxShadow flex-col">
                    <Link className="text-white text-lg hover:underline" to={`/liste_des_actions`} >
                    Voir les actions <p className="text-white text-lg mt-2"><FaLocationArrow /></p>
                    </Link>                    
                </article>
                <article className="w-full lg:w-3/12 xl:w-2/12 bg-greenApple mx-4 px-8 py-4 flex justify-center border-4 border-lightGrey items-center hover:scale-105 cardBoxShadow flex-col">
                    <a href="https://www.citeo.com/info-tri" target="_blank" className="text-white text-lg hover:underline">En savoir plus sur le recyclage</a>
                    <p className="text-white text-lg mt-2"><FaRecycle /></p>
                </article>
                <article className="w-full lg:w-3/12 xl:w-2/12 bg-brightYellow mx-4 px-8 py-4 flex justify-center border-4 border-lightGrey items-center hover:scale-105 cardBoxShadow flex-col">
                    <Link className="text-black text-lg hover:underline" to={`/question&response`} >
                    Comment estimer la quantité de déchets <p className="text-black text-lg mt-2"><FaBalanceScale /></p>
                    </Link>                    
                </article>
            </section>
        </>
    );
};

export default Home;