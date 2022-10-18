import React from 'react';

const UserInfo = () => {
    return (
        <aside id="profilBloc" className="w-[550px] my-20 mx-20 border-8 border-greenV2 flex justify-evenly flex-col profilShadow p-4 h-[450px]">
            <h3 className="text-greenV2 text-center text-lg font-bold">Mes informations</h3>
            <div id="separator" className="w-full h-2 border-b-8 border-greenV2"></div>
            <div className="flex flex-row w-full justify-between">
                <div className="py-4">
                    <img src="hero.png" alt="photo du profil utilisateur"  className="w-[130px] rounded-full"/>
                </div>
                <div className="w-full flex flex-col justify-end py-4 ml-4">
                    <h4 >Mes informations personnelles :</h4>
                    <p className="text-greenV2">adresse, code postal, ville</p>
                    <h4>Mes actions dans la communauté :</h4>
                    <p className="text-greenV2 my-4"><span className="border rounded-full p-2 mr-2 bg-greenApple text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">4</span>actions réalisées</p>
                    <p className=" text-greenV2 my-4"><span className="border rounded-full p-2 mr-2 bg-brightYellow text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">75</span>kilos collectés</p>
                </div>
            </div>
            <i className="text-center text-greenV2 font-bold">Merci pour votre implication dans la communauté du recyclage ! </i>
        </aside>
    );
};

export default UserInfo;