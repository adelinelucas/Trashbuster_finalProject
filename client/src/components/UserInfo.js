import React from 'react';
import { useGlobalContext } from '../app/context';

const UserInfo = () => {
    const {userData} = useGlobalContext();
    console.log(userData)

    let userType = userData.userType; 
    let userInfoBorder; 
    let userBadge; 
    if(userType === 'particulier'){
        userInfoBorder = 'border-greenV2';
    }else if (userType === 'ecole'){
        userInfoBorder = 'border-orangeV2';
    }
    else if(userType === 'association'){
        userInfoBorder = 'border-aquaBlue'
    }else {
        userInfoBorder = 'border-black'
    }


    return (
        <aside id="profilBloc" className={`w-[550px] my-20 ml-20 border-8 flex justify-evenly flex-col profilShadow p-4 h-[550px] ${userInfoBorder} relative`}>
            <div className="absolute top-[6px]">
                    <img src="hero.png" alt="photo du profil utilisateur"  className={`w-[130px] rounded-full border-8 ${userInfoBorder}`}/>
            </div>
            <h3 className="text-greenV2 text-right text-lg font-bold mt-16">Mes informations</h3>
            <div id="separator" className="w-full h-2 border-b-8 border-greenV2"></div>
            <div className="flex flex-row w-full justify-between">
                <div className="w-full flex flex-col justify-end py-4 ml-4">
                    <h4 >Mes informations personnelles :</h4>
                    <p className="text-greenV2">{userData.pseudo}</p>
                    <p className="text-greenV2">{userData.name} {userData.lastname}</p>
                    <p className="text-greenV2">{userData.email}</p>
                    <h4>Mes actions dans la communauté :</h4>
                    <p className="text-greenV2 my-4"><span className="border rounded-full p-2 mr-2 bg-greenApple text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">{userData.actionsNumber ? userData.actionsNumber : '0' }</span>actions réalisées</p>
                    <p className=" text-greenV2 my-4"><span className="border rounded-full p-2 mr-2 bg-brightYellow text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">{userData.quantityTrashCollected ? userData.quantityTrashCollected : '0' }</span>kilos collectés</p>
                </div>
            </div>
            {userData.quantityTrashCollected == 0 ? 
            <i className="text-center text-greenV2 font-bold">La communauté du recyclage vous attend ! </i>
            : 
            <i className="text-center text-greenV2 font-bold">Merci pour votre implication dans la communauté du recyclage ! </i>
            }
            
        </aside>
    );
};

export default UserInfo;