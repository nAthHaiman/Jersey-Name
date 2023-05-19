import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../component/Loading/Loading';
import useDashAuth from '../../hooks/useDashAuth/useDashAuth';
import AuthorizationFailed from '../../Pages/AuthorizationFailed/AuthorizationFailed';

const DashAuth = ({ children, role }) => {

    const { user } = useContext(AuthContext)
    const [isAuthorized, isUserLoading] = useDashAuth(user?.email, role)
    console.log(isAuthorized)

    if (isUserLoading) {
        return <Loading />
    }

    if (isAuthorized) {
        return children;
    }
    if (!isAuthorized) {
        return <AuthorizationFailed />
    }

};

export default DashAuth;