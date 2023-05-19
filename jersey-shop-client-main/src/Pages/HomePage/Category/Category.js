import React, { useEffect, useState } from 'react';
import CatCard from '../../../component/CatCard/CatCard';
const Category = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/category")
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, [])
    return (
        <div className='flex justify-center'>
            <div className="mt-8">
                <div className='flex justify-center'>
                    <h1 className='text-5xl font-serif font-bold mb-9'>
                        Categories
                    </h1>
                </div>
                <div className='mainCard grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-20 gap-y-10'>
                    {
                        categories.map(category => <CatCard key={category._id} category={category} />)
                    }
                </div>



            </div>
        </div>
    );
};

export default Category;