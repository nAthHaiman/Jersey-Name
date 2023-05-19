import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';


const DisplayError = () => {
    const error = useRouteError();
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .then(err => console.error(err))
    }
    return (
        <div>
            <p className="text-red-500">Soemthing went wrong</p>
            <p className="text-res-400">{error.statusText || error.message}</p>
            <h4 className='text-3xl'>Please <button onClick={handleLogOut}>Signout</button> & Sign back in</h4>
        </div>
    );
};

export default DisplayError;