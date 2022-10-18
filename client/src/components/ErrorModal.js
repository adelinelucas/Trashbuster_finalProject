import React from 'react';
import {FaWindowClose} from 'react-icons/fa'
import { useGlobalContext } from '../app/context';

const ErrorModal = () => {
    const {errorMessage, errorModal,closeErrorModal} = useGlobalContext();

    const handelModal = () =>{
        closeErrorModal()
    }
    return (
        <section className="absolute w-full flex flex-col justify-center items-center bg-popUp z-10 top-[15%] h-min-screen py-12">
            <div id="add comment" className="w-3/5 btnNavBarShadow flex flex-col items-center my-3 bg-lightGrey p-5">
                <div className='relative top-[-15px] right-[-50%] text-3xl cursor-pointer'>
                   <FaWindowClose  onClick={handelModal}/> 
                </div>
                <h4 className='text-red-900 w-full mb-1 px-1 font-bold text-2xl text-center'>Une erreur est survenue : </h4>
                <p className='text-red-900'>{errorMessage}</p>
            </div>
        </section>
    );
};

export default ErrorModal;