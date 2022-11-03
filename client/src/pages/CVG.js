import React from 'react';
import {MdConstruction} from 'react-icons/md'

const CVG = () => {

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='flex flex-col my-8 items-center w-10/12'>
                <img src='../underConstruction.png' className='w-[150px]' alt="site en cours de construction"/>
                <div className="flex flex-row">
                    <MdConstruction/>
                    <p>Site en construction, il n'y pas encore de CGV.</p>
                </div>
                <p className="text-center ">Pour patienter je vous laisse consulter cette table de valorisation des déchets!</p>
            </div>
            
            <img  src='../tableValorisation.png' alt='table de valorisation des déchets' className='w-10/12 lg:w-6/12'/>
        </div>
    );
};

export default CVG;