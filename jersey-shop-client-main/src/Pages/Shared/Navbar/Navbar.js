import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import icon from '../../../assets/icon.png'
import { AuthContext } from '../../../contexts/AuthProvider';
const Navbar = () => {

    //using context
    const { user, logOut } = useContext(AuthContext)

    // console.log(user)
    //handle Logout
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err))
    }


    const menuItems = <React.Fragment>
        <li><Link className='font-medium font-serif' to="/">Home</Link></li>
        {user?.uid ?
            <>
                <li><Link className='font-medium font-serif' to="/dashboard">Dashboard</Link></li>
                <li><button className='font-medium font-serif' onClick={handleLogOut}>Sign out</button></li>
            </>
            :
            <>
                <li><Link className='font-medium font-serif' to="/login">Login</Link></li>
                <li><Link className='font-medium font-serif' to="/signup">SignUp</Link></li>
            </>
        }



    </React.Fragment>

    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/"><img className='lg:w-16 xl:w-20 md:w-10 sm:w-10 rounded-xl' src={icon} alt=''></img></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>

            {/* For Dashboard of Mobile Device */}
            <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Navbar;