import React from 'react';
import { useLoaderData } from 'react-router-dom';
import DetailsCard from '../../component/DetailsCard/DetailsCard';

const Products = () => {
    const products = useLoaderData();


    return (
        <div className='my-5 gap-y-7 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {
                products.map(product => <DetailsCard key={product._id} product={product}></DetailsCard>)
            }
        </div>
    );
};

export default Products;