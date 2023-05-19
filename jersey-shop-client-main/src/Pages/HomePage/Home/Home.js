import React from 'react';
import Hero from '../Hero/Hero';
import NewsLetter from '../NewsLetter/NewsLetter';
import Category from '../Category/Category';
import HotProducts from '../HotProducts/HotProducts';

const Home = () => {
    return (
        <div>
            <Hero />
            <HotProducts />
            <div>
                <Category />
            </div>
            <NewsLetter />
        </div>
    );
};

export default Home;