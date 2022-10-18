import React from 'react';
import EditPost from '../components/EditPost';
import UserInfo from '../components/UserInfo';

const Profil = () => {
    return (
        <>
            <section className="w-full flex justify-center">
                <h1 className="text-greenV2 text-2xl font-bold py-4">Mes actions & participations</h1>
            </section>
            <div className="flex">
            <UserInfo />
            <EditPost />
            </div>
            
        </>
    );
};

export default Profil;