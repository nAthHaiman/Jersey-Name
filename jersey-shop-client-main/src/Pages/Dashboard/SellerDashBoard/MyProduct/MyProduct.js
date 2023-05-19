import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Loading from "../../../../component/Loading/Loading"
import { AuthContext } from '../../../../contexts/AuthProvider';


const MyProduct = () => {
    const { user } = useContext(AuthContext);
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/seller/product/${user.email}`, {
                    headers: {
                        authorization: `bearrer ${localStorage.getItem('accessToken')}`
                    }
                })

                const data = await res.json();

                return data;
            }

            catch (err) {
                console.error(err)
            }

        }
    })

    const handleAdvertisement = (id) => {

        fetch(`http://localhost:5000/product/advertise/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearrer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refetch()
                if (data.modifiedCount > 0) {
                    toast.success("Your Product Is Advertised")
                }
                else if (data.modifiedCount === 0) {
                    toast.error("Something Went Wrong")
                }
            })

    }

    const handleDeleteProduct = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/product/delete/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearrer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
                data.deletedCount === 1 && toast.success("Reported Item Deleted Successfully")

            })

    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="overflow-x-auto w-full mx-7">
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Advertise</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        products.map((product, i) =>
                            <tr key={product._id}>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.pic} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.name}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {
                                        product.isAdvertised === "false" ? <>
                                            <button onClick={() => { handleAdvertisement(product._id) }} className="btn btn-xs bg-lime-600 text-white hover:bg-lime-700">Advertise</button>
                                        </> : <>
                                            <p className="rounded-lg w-[90px] px-[10px] py-1 text-sm font-semibold bg-lime-600 text-white ">Advertised</p>
                                        </>
                                    }
                                </td>

                                <td>
                                    <button className="btn btn-ghost btn-xs bg-red-600 text-white hover:bg-red-700"> <label htmlFor="deleteProduct">Delete</label></button>

                                    {/* Modal */}
                                    <input type="checkbox" id="deleteProduct" className="modal-toggle" />
                                    <div className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Are You Sure to delete these seller?</h3>
                                            <p className="py-4">Note: This Action cannot be undone</p>
                                            <div className="modal-action">
                                                <label htmlFor="deleteProduct">
                                                    <button htmlFor="deleteProduct" onClick={() => { handleDeleteProduct(product._id) }} className="btn btn-ghost btn-xs bg-red-600 text-white hover:bg-red-700">Delete</button>
                                                </label>

                                                <label htmlFor="deleteProduct" className="btn btn-xs mt-[2px]">Cancel</label>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    }

                </tbody>



            </table>
        </div>
    );
};

export default MyProduct;