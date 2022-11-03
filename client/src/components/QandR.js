import React, { useState } from 'react';
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from 'react-icons/md'

const QandR = ({question, reponse}) => {

    const [showInfo, setShowInfo] = useState(false)
    return (
        <article className="w-10/12 lg:w-6/12 bg-greenApple mx-10 px-4 md:px-8 py-4 flex justify-center border-4 border-lightGrey items-center  cardBoxShadow flex-col mb-8">
            <div>
                <header className='flex flex-row'>
                    <h3 className="text-white text-lg hover:underline">{question}</h3>
                    <button className='text-white text-xl ml-4' onClick={()=>{
                    setShowInfo(!showInfo)}}>
                        {showInfo ? <MdOutlineKeyboardArrowUp/> : <MdOutlineKeyboardArrowDown />}
                    </button>
                </header>
                    {showInfo && <p className="text-white text-md bg-darkGreen py-4 px-1 md:px-8">{reponse}</p>}
            </div>
        </article>
    );
};

export default QandR;