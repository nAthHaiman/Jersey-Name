import React, { useContext, useEffect, useState } from 'react';

import BookingModal from '../BookingModal/BookingModal';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import VerificationBadge from '../VerificationBadge/VerificationBadge';
import Loading from '../Loading/Loading';

const DetailsCard = ({ product }) => {
    const { _id, description, name, orgPrice, rePrice, pic, sellerName, sellerEmail } = product;



    const { isLoading } = useContext(AuthContext);


    const [sellerVerified, setSellerVerified] = useState("")

    //to ensure seller is verified or not to show the badge
    useEffect(() => {
        fetch(`http://localhost:5000/users/verification/${sellerEmail}`)
            .then(res => res.json())
            .then(data => {
                console.log(data[0].verified)
                setSellerVerified(data[0].verified)
            })
    }, [sellerEmail])

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


    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
            <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style={{ backgroundImage: `url(${pic})` }}></div>

            <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-80 dark:bg-gray-800">
                <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{name}

                </h3>

                <div className="px-3 flex justify-center py-2 bg-gray-200 dark:bg-gray-700">
                    <div className='font-sans'>
                        <span className='font-bold text-gray-800 dark:text-gray-200'>Price: </span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{rePrice}k $</span>
                        <span className=" line-through font-medium text-sm text-slate-500 ml-1">{orgPrice}k</span>
                    </div>
                </div>

                <div className=' text-gray-800 dark:text-gray-200'>
                    <div className='px-3 py-2'>
                        <p className='font-semibold underline text-center'>Description</p>
                        <p className='text-center w-full'>
                            {
                                description.slice(0, 199)
                            }
                        </p>
                        {/* <p className='text-center w-full'>
                            <span className='underline mr-1'> Used For:</span>{usedFor} Year
                        </p> */}
                    </div>
                </div>

                <div className='px-3 py-2   text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700'>
                    <p className='justify-center flex'>Posted By: {sellerName}
                        {
                            sellerVerified === "true" && <VerificationBadge />

                        }
                    </p>
                    {/* <div className='flex justify-center px-2'>
                        <p className=''>
                            Condition: {condition}
                        </p>
                    </div> */}
                </div>

                <div className='px-5 py-2  text-gray-800 dark:text-gray-200 flex justify-evenly'>
                    <button className="px-2 py-1 text-xs font-bold text-white  transition-colors duration-300 transform bg-emerald-600 rounded hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:font-bold"><label htmlFor="bookingModal">Book Now</label></button>
                    {/* The button to open modal */}

                    <button onClick={handleReport} className="px-2 py-1 text-xs font-bold text-white  transition-colors duration-300 transform bg-red-700 rounded hover:bg-emerald-500 dark:hover:bg-red-600">Report</button>

                </div>
            </div >
            <BookingModal booking={booking} />
        </div >
    );
};

export default DetailsCard;
