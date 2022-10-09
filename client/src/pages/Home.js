import React from 'react';
import {FaRecycle, FaLocationArrow, FaBalanceScale} from 'react-icons/fa';

const Home = () => {
    return (
        <>
            <section className=" w-full flex justify-end h-20" id="connexionBloc">
                <button className="border rounded-full m-4 p-4 pb-10 bg-greenV2 text-white cursor-pointer btnInscription shadow-lg border-r-4 border-b-4">Inscription</button>
                <button className="border border-greenV2 rounded-full m-4 p-4 pb-10 text-greenV2 cursor-pointer btnConnexion shadow-lg border-r-4 border-b-4" >Connexion</button>
            </section>
            <div className="shadow-md w-full h-1" id="separator"></div>
            <section className="shadow-md h-auto w-full flex flex-col items-center py-28 bg-hero-HP2 bg-no-repeat bg-center bg-cover"  id="heroBloc"> 
                <article className="my-6">
                    <img src="logoTB.png" alt="Trash Buster logo" className="w-[430px] h-auto"  />
                </article>
                <h1 class="text-purpleGrey my-6 text-xl font-bold">Trash Buster,</h1>
                <h2 class="text-purpleGrey my-6 text-lg font-bold">Une communauté engagée pour trier et collecter les déchets</h2>
                <article className="my-6">
                    <button className="bg-greenV2 rounded-2xl shadow-lg py-6 px-6 text-white btnHero border-darkGreen border-r-8 border-b-8 text-xl">Je crée un point de collecte des déchets</button>
                </article>
            </section>
            <div className="shadow-md w-full h-1" id="separator"></div>
            <section className="w-full bg-brightYellow flex justify-center py-10 text-greenV2 font-medium" id="presentationBloc">
                <article className="w-2/4 border-greenV2 border-x-8 rounded-2xl flex flex-col items-center py-10 ">
                    <h2 className="text-2xl my-4">Trash Buster </h2>
                    <i className="text-xl my-4">Quel est le but de la plateforme ?</i>
                    <p className="text-xl">L'objectif est de constuire une communauté engagée pour <br/>
                        <span className="font-bold flex justify-center text-xl text-white">répérer , collecter , tirer, réutiliser</span>les déchets qui jonchent nos espaces ou jeter selon les consignes de tri.  </p>
                </article>
            </section>
            <section className="bg-white w-full flex px-40 py-20 justify-center" id="keyInfoBloc">
                <article className="w-1/4 md:w-2/12 bg-greenV2 mx-4 px-8 py-4 flex justify-center shadow-2xl hover:scale-110 cardBoxShadow">
                    <h3 className="text-white text-lg"><span class="font-bold">500</span><br/> membres dans la communauté</h3>
                </article>
                <article className="w-1/4 md:w-2/12 bg-brightYellow mx-4 px-8 py-4 flex justify-center shadow-2xl hover:scale-110 cardBoxShadow">
                    <h3 className="text-purpleGrey text-lg"><span class="font-bold">750</span><br/> kilos collectés, triés</h3>
                </article>
                <article className="w-1/4 md:w-2/12 bg-orangeV2 mx-4 px-8 py-4 flex justify-center shadow-2xl hover:scale-110 cardBoxShadow">
                    <h3 className="text-white text-lg"><span class="font-bold">120</span><br/>communes impliquées</h3>
                </article>
            </section>
            <section className="bg-greenApple w-full flex px-40 py-20 justify-center" id="recycleInfoBloc">
                <article className="w-1/4 md:w-2/12 bg-darkGreen mx-4 px-8 py-4 flex justify-center border-4 border-lightGrey items-center hover:scale-105 cardBoxShadow flex-col">
                    <a href="#" className="text-white text-lg hover:underline">Voir les actions</a>
                    <p class="text-white text-lg mt-2"><FaLocationArrow /></p>
                </article>
                <article className="w-1/4 md:w-2/12 bg-greenApple mx-4 px-8 py-4 flex justify-center border-4 border-lightGrey items-center hover:scale-105 cardBoxShadow flex-col">
                    <a href="#" className="text-white text-lg hover:underline">En savoir plus sur le recyclage</a>
                    <p class="text-white text-lg mt-2"><FaRecycle /></p>
                </article>
                <article class="w-1/4 md:w-2/12 bg-brightYellow mx-4 px-8 py-4 flex justify-center border-4 border-lightGrey items-center hover:scale-105 cardBoxShadow flex-col">
                    <a href="#" className="text-black text-lg hover:underline">Comment estimer la quantité de déchets</a>
                    <p className="text-black text-lg mt-2"><FaBalanceScale /></p>
                </article>
            </section>
        </>
    );
};

export default Home;