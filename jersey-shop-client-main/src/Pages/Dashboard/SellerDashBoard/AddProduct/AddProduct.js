import React, { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const { user } = useContext(AuthContext);

    //useForm hook
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const handleAddProduct = data => {
        const formData = data;
        formData.sellerEmail = `${user.email}`
        formData.sellerName = `${user.displayName}`
        formData.report = "false"
        formData.isAdvertised = "false"
        formData.status = "unsold"
        console.log(formData)

        fetch('http://localhost:5000/product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success("Product Added Successfully")
                navigate('/dashboard/myProduct')
            })
    }
    return (
        <div className='w-3/4 mx-auto rounded-xl py-7 dark:bg-slate-600 bg-slate-600 '>

            <h3 className='text-3xl font-serif text-white text-center font-semibold underline'>Add Product</h3>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className='flex justify-around mb-3'>
                    <div className="form-control w-full max-w-[250px]">
                        <label className="label">
                            <span className="label-text text-white">Product Name</span>
                        </label>
                        <input type="text" placeholder="Ex:Argentina Home" className="input input-bordered input-sm rounded-md"  {...register("name", {
                            required: "Product Name is required"
                        })} />
                    </div>


                    <div className="form-control w-full max-w-[250px]">
                        <label className="label">
                            <span className="label-text text-white">Product Image URL</span>
                        </label>
                        <input type="text" placeholder="Ex:www.photourl.com" className="input input-bordered input-sm rounded-md"  {...register("pic", {
                            required: "Photo URL is required"
                        })} />
                    </div>
                </div>




                <div className='flex justify-around mb-3'>
                    <div className="form-control w-full max-w-[250px]">
                        <label className="label">
                            <span className="label-text text-white">Category</span>
                        </label>
                        <select className="select rounded-md select-sm select-bordered"  {...register("catId", {
                            required: "Select A Category"
                        })}>
                            <option disabled defaultValue>Select Category</option>
                            <option value={"1"}>Soccer</option>
                            <option value={"2"}>Cricket</option>
                            <option value={"3"}>Custom Made</option>
                        </select>
                    </div>


                    <div className="form-control w-full max-w-[250px]">
                        <label className="label">
                            <span className="label-text text-white">Jersey Description</span>
                        </label>
                        <input type="text" placeholder="Describe About Your Jersey" className="input input-bordered input-sm rounded-md"  {...register("description", {
                            required: "Description is required"
                        })} />
                    </div>
                </div>



                <div className='flex justify-around mb-3'>

                    <div className="form-control w-full max-w-[250px]">
                        <label className="label">
                            <span className="label-text text-white">Seller Name</span>
                        </label>
                        <input type="text" disabled defaultValue={user.displayName} placeholder="Type here" className="input input-bordered input-sm rounded-md" />
                    </div>

                    <div className="form-control w-full max-w-[250px]">
                        <label className="label">
                            <span className="label-text text-white">Email Address</span>
                        </label>
                        <input type="text" defaultValue={user.email} disabled placeholder="user@gmail.com" className="input input-bordered input-sm rounded-md" />
                    </div>
                </div>



                <div className='flex justify-around mb-3'>
                    <div className="form-control w-full max-w-[250px]">
                        <label className="label">
                            <span className="label-text text-white">Orginal Price(in k $)</span>
                        </label>
                        <input type="number" placeholder="Market Value Here" className="input input-bordered input-sm rounded-md"  {...register("orgPrice", {
                            required: "Market Price here"
                        })} />
                    </div>


                    <div className="form-control w-full max-w-[250px]">
                        <label className="label">
                            <span className="label-text text-white">Discounted Price (in k $)</span>
                        </label>
                        <input type="number" placeholder="Selling Price After Discount" className="input input-bordered input-sm rounded-md"  {...register("rePrice", {
                            required: "Discounted Price here"
                        })} />
                    </div>
                </div>


                {/* 
                <div className='flex justify-around mb-3'>

                    <div className="form-control w-full max-w-[250px]">
                        <label className="label">
                            <span className="label-text text-white">Condition</span>
                        </label>
                        <select className="select rounded-md select-sm select-bordered"
                            {...register("condition", {
                                required: "Select Your Product Condition"
                            })}
                        >
                            <option disabled defaultValue>Pick one</option>
                            <option value={"Almost New"}>Almost New</option>
                            <option value={"Decent"}>Decent</option>
                            <option value={"Rusted"}>Rusted</option>
                        </select>
                    </div>


                    <div className="form-control w-full max-w-[250px]">
                        <label className="label">
                            <span className="label-text text-white">Product Used(in yrs.)</span>
                        </label>
                        <input type="number" placeholder="Ex: 2 Years" className="input input-bordered input-sm rounded-md" {...register("usedFor", {
                            required: "Asking Price here"
                        })} />
                    </div>

                </div> */}



                <div className='flex justify-center mt-7 mb-4'>
                    <input className='btn btn-sm w-1/3 rounded-lg bg-blue-600 border-blue-600 hover:bg-blue-700 text-white' value="Add Product" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default AddProduct;