import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-darkGreen h-20 text-white text-sm flex flex-col items-center justify-center">
            <nav >
                <ul className="flex">
                    <li className="px-4 cursor-pointer hover:underline"><NavLink  to={'/charte_de_la_communaute'}>La Charte du Recycleur</NavLink></li>
                    <li className="px-4 cursor-pointer hover:underline"><NavLink  to={'/question&response'}>FAQ</NavLink></li>
                    <li className="px-4 cursor-pointer hover:underline"><NavLink  to={'/CVG'}>Nos conditions d'utilisation</NavLink></li>
                </ul>
            </nav>
            <aside className="py-2">
                <h4>Trash Buster © - Lucas Adeline - 2022</h4> 
            </aside>
        </footer>
    );
};

export default Footer;