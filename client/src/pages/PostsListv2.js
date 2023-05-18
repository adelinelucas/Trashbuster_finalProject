import React, { useEffect } from 'react';
import Posts from '../components/Posts';
import Loading from '../components/Loading';
import { useGlobalContext } from '../app/context';
import { NavLink } from 'react-router-dom';
import fakePosts from '../datas/fakePosts';

const PostsListv2 = () => {
    const posts = fakePosts;
    const actionsNumber = fakePosts.length;
    return (
        <>
            <section className="w-full flex justify-center">
                <h1 className="text-center md:text-left text-greenV2 text-4xl font-bold py-4">Les actions de la communauté</h1>
            </section>
            <section className="w-full flex justify-start">
                <h4 className="text-greenV2 text-xl font-bold py-4 ml-8">Total des actions de la communauté: {actionsNumber}</h4>
            </section>
            <section className="w-full flex flex-col items-center min-h-screen">
                <Posts posts={posts} fakePosts={'fakePosts'} />
            </section>
        </>
    );
};

export default PostsListv2;