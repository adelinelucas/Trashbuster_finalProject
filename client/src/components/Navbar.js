import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../app/context';

const Navbar = () => {
    const {userAuthenticated} = useGlobalContext();
    return (
        <nav className="flex justify-between w-full py-10 px-4 shadow-lg">
        <div id="backHP" >
            <NavLink to={'/'}><img src="./logoTB.png" alt="back to home page" className="w-[160px] cursor-pointer"/>
            </NavLink>
        </div>
        <div className="flex">
            <ul className="flex">
                <li  className="m-2 p-2 bg-orangeV2 text-white cursor-pointer btnNavBar btnNavBarShadow">
                    <NavLink to={'/liste_des_actions'}>Voir toutes les actions
                    </NavLink>
                </li>
                <li  className="m-2 p-2 bg-brightYellow text-white cursor-pointer btnNavBar btnNavBarShadow ">
                    <NavLink to={'/charte_de_la_communaute'}>
                    Voir la charte de la communauté
                    </NavLink>
                </li>
            </ul>
            <ul className="flex ml-4">
                {userAuthenticated && 
                    <li className="m-2 p-2 bg-lightRed text-white cursor-pointer btnNavBar btnNavBarShadow">
                        <NavLink to={'/profil'}>Mon profil
                        </NavLink>
                    </li>
                }
                
                {!userAuthenticated && 
                    <>
                        <li className="m-2 p-2 bg-lightRed text-white cursor-pointer btnNavBar btnNavBarShadow">
                            <NavLink to={'/register'}>M'inscrire
                            </NavLink>
                        </li>
                        <li className="m-2 p-2 bg-lightRed text-white cursor-pointer btnNavBar btnNavBarShadow">
                            <NavLink to={'/connexion'}>Me connecter
                            </NavLink>
                        </li>
                    </>
                }  
            </ul>
        </div>
    </nav>
    );
};

export default Navbar;