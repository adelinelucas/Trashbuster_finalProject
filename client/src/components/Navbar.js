import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav class="flex justify-between w-full py-10 px-4 shadow-lg">
        <div id="backHP" >
            <NavLink to={'/'}><img src="logoTB.png" alt="back to home page" class="w-[160px] cursor-pointer"/>
            </NavLink>
        </div>
        <div class="flex">
            <ul class="flex">
                <li  class="m-2 p-2 bg-orangeV2 text-white cursor-pointer btnNavBar btnNavBarShadow">
                    <NavLink to={'/liste_des_actions'}>Voir toutes les actions
                    </NavLink>
                </li>
                <li  class="m-2 p-2 bg-brightYellow text-white cursor-pointer btnNavBar btnNavBarShadow ">
                    <NavLink to={'/charte_de_la_communaute'}>
                    Voir la charte de la communauté
                    </NavLink>
                </li>
            </ul>
            <ul class="flex ml-4">
                {/* si connecté  */}
                <li class="m-2 p-2 bg-lightRed text-white cursor-pointer btnNavBar btnNavBarShadow">
                <NavLink to={'/connexion'}>Mon profil
                </NavLink>
                </li>
                {/* si non connecté  */}
                <li class="m-2 p-2 bg-lightRed text-white cursor-pointer btnNavBar btnNavBarShadow">
                <NavLink to={'/connexion'}>M'inscrire
                </NavLink>
                </li>
                <li class="m-2 p-2 bg-lightRed text-white cursor-pointer btnNavBar btnNavBarShadow">
                <NavLink to={'/connexion'}>Me connecter
                </NavLink>
                </li>
            </ul>
        </div>
    </nav>
    );
};

export default Navbar;