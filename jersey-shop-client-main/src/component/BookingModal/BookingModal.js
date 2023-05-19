import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../Loading/Loading';

const BookingModal = ({ booking }) => {

    const { productName, price, productId, pic } = booking;

    const { user, isLoading } = useContext(AuthContext)

    const bookingData = {
        productId,
        productName,
        price,
        buyerEmail: user?.email,
        buyerName: user?.displayName,
        pic,
        payment: "false"
    }
    //toast show
    const handleSubmit = () => {
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(bookingData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success("Product Booked")
                }
                else {
                    toast.error("Unknown Error Occured")
                }

            })
    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="bookingModal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Booking Form</h3>
                    <h3 className="font-bold text-base font-serif text-center uppercase">{productName}</h3>

                    <form action="">
                        <div className='max-w-sm mx-auto'>
                            <input type="text" placeholder="Product Name" disabled value={productName} className="input input-bordered input-sm w-full rounded-lg mt-3" />

                            <input type="text" placeholder="Price" disabled value={`${price}k $`} className="input input-bordered input-sm w-full rounded-lg mt-3" />

                            <input type="text" placeholder="Your Name" disabled value={user?.displayName} className="input input-bordered input-sm w-full rounded-lg mt-3" />
                            <input type="text" placeholder="Your Email" disabled value={user?.email} className="input input-bordered input-sm w-full rounded-lg mt-3" />

                            <input type="number" placeholder="Contact Number" className="input input-bordered input-sm w-full rounded-lg mt-3" />

                            <input type="text" placeholder="Location" className="input input-bordered input-sm w-full rounded-lg mt-3" />
                        </div>



                    </form>
                    <div className='flex justify-center'>
                        <>
                            <div onClick={handleSubmit} className="flex justify-center mt-6 mr-4 ">
                                <label htmlFor="bookingModal" className="btn rounded-xl btn-sm transition-colors duration-300 transform bg-emerald-500 hover:bg-emerald-400 hover:font-bold text-white">Submit</label>
                            </div>
                            <div className="flex justify-center mt-6 ">
                                <label htmlFor="bookingModal" className="btn rounded-xl btn-sm transition-colors duration-300 transform bg-red-500 hover:bg-red-400 hover:font-bold text-white">Cancel</label>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default BookingModal;