import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Loading from "../../../../component/Loading/Loading"


const ReportedItem = () => {

    const { data: reportedProducts, isLoading, refetch } = useQuery({
        queryKey: ["reportedProducts"],
        queryFn: async () => {
            try {
                const res = await fetch("http://localhost:5000/product/allReported", {
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
                        <th>Seller</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        reportedProducts.map((reportedProduct, i) =>
                            <tr key={reportedProduct._id}>
                                <td>{i + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={reportedProduct.pic} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{reportedProduct.name}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{reportedProduct.sellerName}</div>
                                        <div className="text-sm">{reportedProduct.sellerEmail}</div>

                                    </div>
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
                                                    <button htmlFor="deleteProduct" onClick={() => { handleDeleteProduct(reportedProduct._id) }} className="btn btn-ghost btn-xs bg-red-600 text-white hover:bg-red-700">Delete</button>
                                                </label>

                                                <label htmlFor="deleteProduct" className="btn btn-xs mt-[2px]">Cancel</label>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>)
                    }

                </tbody>



            </table>
        </div>
    );
};

export default ReportedItem;