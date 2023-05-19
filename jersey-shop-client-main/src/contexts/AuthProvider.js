import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config';




export const AuthContext = createContext();

const auth = getAuth(app)



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    //create user via email
    const createUser = (email, password) => {
        setLoading(true);

        return createUserWithEmailAndPassword(auth, email, password);
    }


    //login user via email
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    //logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    //if there is any need of updating user any credentials
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }


    //google signIn
    const googleLogin = (provider) => {
        return signInWithPopup(auth, provider)
    }

    //update user state to interface using user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('User State Changing');

            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])
    const authInfo = {
        createUser,
        signIn,
        logOut,
        updateUser,
        googleLogin,
        user,
        loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;