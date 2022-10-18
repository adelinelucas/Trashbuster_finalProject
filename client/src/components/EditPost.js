import React from 'react';

const EditPost = () => {
    return (
        <section className="w-full flex flex-col items-center my-20">
            <article className="w-4/5 btnNavBarShadow flex items-center my-3 ">
                <div className="mx-4">
                    <img src="hero.png" alt="photo illustrant les déchets à collecter" className="w-[150px]"/>
                </div>
                <div className="bg-brightYellow px-4">
                    <h3 className="font-bold text-xl py-2">Titre de l'action</h3>
                    <p className="py-2">Description de l'action Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit molestiae provident, consequatur nisi facere et aut. Voluptas praesentium deserunt dolore nam vero id sapiente laudantium.</p>
                    <div>
                        <p className="text-md">adresse,<span className="font-bold text-lg ml-2">code postal</span><span className="font-bold text-lg uppercase ml-2">ville</span></p>
                    </div>
                    <div className="flex">
                        <p className="py-4 pr-10"><span className="border rounded-full p-2 mr-2 bg-brightOrange text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">55</span>de déchets à collectés</p>
                        <p className="py-4"><span className="border rounded-full p-2 mr-2 bg-brightYellow text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">550</span>kilos de déchets à total sur l'action</p>
                    </div>
                    {/* <div className="flex justify-end">
                        <button className="border rounded-full p-2 mr-2 my-4 bg-greenV2 text-white cursor-pointer btnInscription shadow-lg border-white border-r-4 border-b-4">Commenter l'action</button>
                    </div> */}
                    <div className="flex justify-end">
                        <button className="border rounded-full p-2 mr-2 my-4 bg-aquaBlue text-white cursor-pointer btnUpdate shadow-lg border-white border-r-4 border-b-4">Editer l'action</button>
                        <button className="border rounded-full p-2 mr-2 my-4 bg-lightRed text-white cursor-pointer btnDelete shadow-lg border-white border-r-4 border-b-4">Supprimer l'action</button>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default EditPost;