import React, { useContext } from "react";
import BookingModal from "../BookingModal/BookingModal";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import Loading from "../Loading/Loading"
const AnimatedCard = ({ advertisedProduct }) => {

    const { name, pic, description, rePrice, orgPrice, _id } = advertisedProduct;

    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />
    }
    const booking = {
        productId: _id,
        productName: name,
        price: rePrice,
        pic
    }

    //report handler
    const handleReport = () => {

        fetch(`http://localhost:5000/product/reported/${_id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearrer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success("Reported to Admin")
                }
                else if (data.modifiedCount === 0) {
                    toast.error("This item is already reported")
                }
            })

    }
    return (
        <div className="animatedCard">
            <div className="container">
                <div className="card">
                    <div className="image rounded-lg">
                        <img className="max-h-[350px] rounded-lg" src={pic} alt="" />
                    </div>
                    <h3 className="text-black text-2xl font-serif font-bold -mt-6 text-center align-middle name">{name}</h3>
                    <div className="content">
                        <h3 className="text-black text-xl font-bold font-serif">{name}</h3>
                        <p className=" text-black">
                            {description.slice(0, 70)}
                        </p>

                        <div className="px-3 flex justify-center mt-1">
                            <div className=''>
                                <span className='font-bold text-sm text-gray-800'>Price: </span>
                                <span className="font-semibold text-sm text-gray-800">{rePrice}k$</span>
                                <span className=" line-through font-medium text-xs text-slate-500 ml-1">{orgPrice}k</span>
                            </div>
                        </div>

                        <div className='px-5 py-2 text-gray-800 dark:text-gray-200 flex justify-evenly'>
                            <button className="px-2 py-1 text-xs font-bold text-white  transition-colors duration-300 transform bg-emerald-600 rounded hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:font-bold"><label htmlFor="bookingModal">Book Now</label></button>
                            {/* The button to open modal */}

                            <button onClick={handleReport} className="px-2 py-1 text-xs font-bold text-white  transition-colors duration-300 transform bg-red-700 rounded hover:bg-emerald-500 dark:hover:bg-red-600">Report</button>

                        </div >
                        <BookingModal booking={booking} />


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
        background-color : #fff;
        margin : 30px 10px;
        padding : 20px 15px;
        display : flex;
        flex-direction : column;
        box-shadow : 0 5px 20px rgba(0,0,0,0.5);
        transition : 0.3s ease-in-out;
        border-radius : 15px;
      }
      
      .container .card:hover {
        height : 350px;    
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
        text-align : center;
        visibility : hidden;
        opacity : 0;
        transition : 0.3s ease-in-out;
      }
      
      .container .card:hover .content {
         margin-top : 10px;
         visibility : visible;
         opacity : 1;
         transition-delay: 0.2s;  
      }
    `}
        </style>
    );
};

export default function Card({ advertisedProduct }) {
    return (
        <>
            <AnimatedCard advertisedProduct={advertisedProduct} />
            <CardStyle />
        </>
    );
}
