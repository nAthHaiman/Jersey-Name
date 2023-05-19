import React, { useContext, useState } from 'react';
import transparentLogo from '../../assets/icon_transparent_short.png'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../hooks/useToken/useToken';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const SignUp = () => {

    //signUp error preview
    const [signUpError, setSignUpError] = useState('')

    //react hook form for controlled submission
    const { register, handleSubmit, formState: { errors } } = useForm();


    //using context api
    const { createUser, updateUser, googleLogin } = useContext(AuthContext);


    //save user on state to verify with jwt
    const [createdUserEmail, setCreatedUserEmail] = useState("");

    //verifying email with the hook UseToken
    const [token] = useToken(createdUserEmail)

    const navigate = useNavigate()

    //if token verified it will navigate you to homepage
    if (token) {
        navigate('/')
    }

    const [accountType, setAccountType] = useState('buyer');

    const handleAccountTypeChange = (event) => {
        setAccountType(event.target.value);
    };

    //main signupHandler function
    const handleSignup = (data) => {
        setSignUpError('')
        createUser(data.email, data.password)
            .then(result => {
                // const user = result.user;
                setSignUpError("")
                toast.success("Sign Up Complete")

                const userInfo = {
                    displayName: data.name,
                    photoURL: data.photoURL
                }

                //update user name
                updateUser(userInfo)
                    .then(() => {
                        //saveUser is a fucntion to save user info to database
                        saveUser(data.name, data.email, accountType, data.photoURL)
                    })
                    .catch(err => {
                        console.error(err);
                    })
            })
            .catch(err => {
                console.error(err)
                setSignUpError(err.message)
            })
    }



    //this function is for save user to DB
    const saveUser = (name, email, roleValue, photoURL) => {

        const user = { name, email, role: roleValue, verified: "false", photoURL };

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            })
    }

    //creating google login instance
    const googleProvider = new GoogleAuthProvider();

    //google login handler
    const handleGoogleLogin = () => {
        setAccountType("buyer")
        googleLogin(googleProvider)
            .then(result => {
                const user = result.user;
                const gmailDefaultRole = "buyer";
                setCreatedUserEmail(user.email);
                saveUser(user.displayName, user.email, gmailDefaultRole);
                navigate("/")
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <div>
            <section className="bg-white text-black">
                <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                    <form onSubmit={handleSubmit(handleSignup)} className="w-full max-w-md">
                        <div className="flex justify-center mx-auto">
                            <img className="w-auto h-7 sm:h-8" src={transparentLogo} alt="" />
                        </div>

                        <div className="flex items-center justify-center mt-6">
                            <p className="w-1/3 pb-4 font-medium text-center text-black capitalize border-b-2 ">
                                Sign Up
                            </p>
                        </div>

                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>

                            <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" {...register("name", {
                                required: "Username is required"
                            })} />
                            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                        </div>
                        {/* for */}
                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                            </span>

                            <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Photo URL"
                                {...register("photoURL", {
                                    required: "Photo URL is required"
                                })} />
                            {errors.photoURL && <p className='text-red-500'>{errors.photoURL.message}</p>}
                        </div>



                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <input type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"
                                {...register("email", {
                                    required: "Email is required"
                                })} />


                            {/* Showing error if email is empty with the help of formState:{errors} */}
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                })}
                            />


                            {/* Showing error if password is empty with the help of formState:{errors} */}
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        </div>
                        <div className='flex justify-around mt-4'>
                            <div className='flex'>
                                <p className='text-lg mr-2 font-sans'>Buyer</p>
                                <input
                                    type="radio"
                                    name="accountType"
                                    value="buyer"
                                    className="radio-xs my-auto radio-info"
                                    checked={accountType === 'buyer'}
                                    onChange={handleAccountTypeChange}
                                />
                            </div>

                            <div className='flex'>
                                <p className='text-lg mr-2 font-sans'>Seller</p>
                                <input
                                    type="radio"
                                    name="accountType"
                                    value="seller"
                                    className="radio-xs my-auto radio-info"
                                    checked={accountType === 'seller'}
                                    onChange={handleAccountTypeChange}
                                />
                            </div>
                        </div>

                        {/* <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password" />
                        </div> */}

                        <div className="mt-6">
                            <input className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />
                        </div>




                    </form>

                </div>

                <div className='container flex flex-col mb-9 items-center justify-center px-6 mx-auto max-w-md w-full'>
                    <div>
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                    </div>
                    <div className="mt-6 text-center ">
                        <Link to={'/login'} className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                            Already have an account?
                        </Link>
                    </div>
                    <button onClick={handleGoogleLogin} className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border w-full rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-300">
                        <div className="px-4 py-2">
                            <svg className="w-6 h-6" viewBox="0 0 40 40">
                                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                            </svg>
                        </div>

                        <p className="w-5/6 px-4 py-3 font-bold text-center text-black">Sign Up with Google</p>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SignUp;