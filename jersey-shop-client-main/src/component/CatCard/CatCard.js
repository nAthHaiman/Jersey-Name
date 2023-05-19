import React from "react";
import { Link } from "react-router-dom";
const AnimatedCard = ({ category }) => {
    const { _id, category: cat, description, pic } = category
    return (
        <div className="animatedCard">
            <div className="container">
                <div className="card">
                    <div className="image rounded-lg">
                        <img className="max-h-[350px] rounded-lg" src={pic} alt="" />
                    </div>
                    <h3 className="text-black text-2xl font-serif font-bold -mt-10 text-center align-middle name">{cat}</h3>
                    <div className="content">
                        <h3 className="text-black text-2xl font-serif font-bold ">{cat}</h3>
                        <p className=" text-black">
                            {description}
                        </p>
                        <Link to={`./category/${_id}`}>
                            <button className="py-2 mt-5 px-4 shadow-md no-underline rounded-full  text-white font-sans font-semibold text-sm border-blue btn-secondary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">Browse More</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

const CardStyle = () => {
    return (
        <style>
            {`
      * { 
        margin : 0;
        padding: 0;
        box-sizing : border-box;
        font-family : "Poppins", sans-serif;
      }
        
      .container .card {
        position: relative;
        max-width : 300px;
        height : 200px;  
        margin : 30px 10px;
        padding : 20px 15px;
        display : flex;
        flex-direction : column;
        box-shadow : 0 5px 20px rgba(0,0,0,0.5);
        transition : 0.3s ease-in-out;
        border-radius : 15px;
      }
      
      .container .card:hover {
        height : 270px;    
      }
      
      .container .card .image {
        position : relative;
        width : 260px;
        height : 260px;
        top : -40%;
        left: 8px;
        box-shadow : 0 5px 20px rgba(0,0,0,0.2);
        z-index : 1;
      }
      
      .container .card .image img {
        max-width : 100%;
      }
      
      .container .card .content {
        position : relative;
        top : -140px;
        padding : 10px 15px;
        visibility : hidden;
        opacity : 0;
        transition : 0.3s ease-in-out;
      }
      
      .container .card:hover .content {
         margin-top : 30px;
         padding-top: 40px;
         visibility : visible;
         opacity : 1;
         transition-delay: 0.2s;  
      }

      .container .card:hover .name{
         visibility:hidden
      }
    `}
        </style>
    );
};

export default function CatCard({ category }) {
    return (
        <>
            <AnimatedCard category={category} />
            <CardStyle />
        </>
    );
}
