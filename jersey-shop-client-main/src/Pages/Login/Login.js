import React, { useContext, useState } from 'react';
import transparentLogo from '../../assets/icon_transparent_short.png'
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../../contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken/useToken';
const Login = () => {


    //using context api
    const { googleLogin, signIn } = useContext(AuthContext)

    //useForm hook

    const { register, formState: { errors }, handleSubmit } = useForm()


    //creating google login instance
    const googleProvider = new GoogleAuthProvider();

    //google login handler
    const handleGoogleLogin = () => {
        googleLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
                setLoginUserEmail(user.email);

            })
            .catch(err => {
                console.error(err);
            })
    }




    //save login email to verify jwt token with hook useToken
    const [loginUserEmail, setLoginUserEmail] = useState('')

    const [token] = useToken(loginUserEmail)

    //redirect using useNavigation
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    //after verifying jwt navigate starts
    if (token) {
        navigate(from, { replace: true });
    }

    //login error message preview
    const [loginError, setLoginError] = useState("")

    //email login handler

    const handleEmailLogin = (data) => {
        setLoginError("")
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user
                setLoginUserEmail(data.email)
            })
            .catch(err => {
                console.error(err)
                setLoginError(err.message)
            })
    }


    return (
        <div className="flex my-20 sm:my-10 md:my-16 lg:w-[450px] mx-auto overflow-hidden rounded-lg shadow-lg ">


            <div className="w-full px-6 py-8 md:px-8">

                <div className='ml-3'>
                    <div className="flex justify-center mx-auto">
                        <img className="w-20" src={transparentLogo} alt="" />
                    </div>

                    <p className="mt-3 text-xl text-center text-black-600 ">
                        Welcome back!
                    </p>
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

                    <p className="w-5/6 px-4 py-3 font-bold text-center text-black">Sign in with Google</p>
                </button>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                    <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login
                        with email</p>

                    <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                </div>

                <form onSubmit={handleSubmit(handleEmailLogin)}>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>

                        <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                        />

                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>
                            <p className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</p>
                        </div>

                        <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                        />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>

                    <div className="mt-6">
                        <button onClick={handleEmailLogin} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            Sign In
                        </button>
                    </div>
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                    <Link to={'/signup'} className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>

                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
            </div>
        </div>
    );
};

export default Login;