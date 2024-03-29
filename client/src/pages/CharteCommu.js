import React, { useEffect, useState } from 'react';
import charteEngagement from '../datas/charteEngament';

const CharteCommu = () => {

    const engagements = charteEngagement;
    const [tabs, setTabs] = useState([]);
    const [value, setValue] = useState(0);

    useEffect( ()=>{
        setTabs([]);
        engagements.map( (data)=>{
            return setTabs((tabs) => [...tabs, data.categorie])
        });
    },[])

    const {categorie, reponses} = engagements[value];

    return (
        <section className='w-full my-10 mx-0 md:mx-8 min-h-screen'>
            <h1 className='text-4xl my-4 text-greenV2 text-center'>Charte de la commuanuté</h1>
            <div className='flex flex-col lg:flex-row justify-center'>
                <aside className='flex flex-col mr-12 '>
                    {
                        tabs.map((tab, index)=>{
                            return(
                                <button key={index} onClick={()=>{setValue(index)}} className='m-2 text-white px-8 hover:underline bg-greenV2 btnNavBarShadow cursor-pointer text-xl'>{tab}</button>
                            )
                        })
                    }
                </aside>
                <article className='w-11/12 lg:w-6/12 mt-4 lg:mt-0 bg-greenV2 text-white p-4 cardBoxShadow'>
                    <div>
                        <h3 className='text-2xl text-center mb-4 underline'>{categorie}</h3>
                    </div>
                    {
                        reponses.map((reponse, index)=>{
                            
                            return( 
                                <div key={index}>
                                    <p className='mb-8 text-center'>{reponse}</p>
                                </div>
                            )
                        })
                    }
                </article>
            </div>
            
        </section>
    );
};

export default CharteCommu;