import React, {useEffect, useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../app/context';
import decode from 'jwt-decode';

const Navbar = () => {
    const {userAuthenticated, logout} = useGlobalContext();
    const [user, setUser] = useState('')
    const location = useLocation();

    useEffect(() => {
        if(sessionStorage.getItem('profil')){
            setUser(JSON.parse(sessionStorage.getItem('profil')))
        }
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
    }, [location]);

    return (
        <nav className="flex flex-col sm:flex-row items-center sm:items-end justify-between w-full py-10 px-4 shadow-lg">
        <div id="backHP" >
            <NavLink to={'/'}><img src='/logoTB.png' alt="back to home page" className="w-[160px] cursor-pointer"/>
            </NavLink>
        </div>
        <div className="flex flex-col sm:flex-row text-sm sm:text-base">
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
            <ul className="flex ml-4 mt-4 sm:mt-0">
                {userAuthenticated && 
                    <>
                        <li className="m-2 p-2 bg-lightRed text-white cursor-pointer btnNavBar btnNavBarShadow">
                            <NavLink to={'/profil'}>Mon profil
                            </NavLink>
                        </li>
                        <li className="m-2 p-2 bg-black text-white cursor-pointer btnNavBar btnNavBarShadow">
                        <NavLink to={'/logout'}>Me déconnecter
                        </NavLink>
                        </li>
                    </>
                    
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