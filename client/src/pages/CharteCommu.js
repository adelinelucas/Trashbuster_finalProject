import React, { useEffect, useState } from 'react';
import charteEngagement from '../datas/charteEngament';

const CharteCommu = () => {

    const [engagements, setEngagements] = useState(charteEngagement);
    const [tabs, setTabs] = useState([]);
    const [value, setValue] = useState(0);
    console.log(charteEngagement);
    console.log(tabs)

    useEffect( ()=>{
        let datas = engagements;
        setTabs([]);
        datas.map( (data)=>{
            setTabs((tabs) => [...tabs, data.categorie])
        });
    },[])

    const {id,categorie, reponses} = engagements[value];
    console.log(engagements[value])

    return (
        <section className='w-full my-10 mx-8 min-h-screen'>
            <h1 className='text-2xl my-4 text-greenV2 text-center'>Charte de la commuanuté</h1>
            <div className='flex flex-row justify-center'>
                <aside className='flex flex-col mr-12 '>
                    {
                        tabs.map((tab, index)=>{
                            return(
                                <button key={index} onClick={()=>{setValue(index)}} className='m-2 text-white px-8 hover:underline bg-greenV2 btnNavBarShadow cursor-pointer text-xl'>{tab}</button>
                            )
                        })
                    }
                </aside>
                <article className='w-2/5 bg-greenV2 text-white p-4 cardBoxShadow'>
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

{/* <article className='w-2/5 bg-greenV2 text-white p-4'>
{
    engagements.map((engagement, index)=>{
        
        return( 
            <div key={index}>
                {engagement.reponse.map((reponse, i)=>{
                    return( 
                        <p key={i}>{reponse}</p>
                    )
                })}
            </div>
        )
    })
}
</article> */}