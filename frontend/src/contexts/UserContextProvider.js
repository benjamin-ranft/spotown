import React, {useEffect, useState} from 'react';
import UserContext from './UserContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
    deleteTokenFromLocalStorage,
    loadTokenFromLocalStorage,
    loadUserDataFromLocalStorage,
    saveTokenToLocalStorage,
    saveUserDataToLocalStorage,
} from '../service/LocalStorage';

export default function UserContextProvider({ children }) {
    const [token, setToken] = useState(loadTokenFromLocalStorage());
    const [userData, setUserData] = useState(loadUserDataFromLocalStorage());

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp > new Date().getTime() / 1000) {
                    setUserData(decoded);
                    saveTokenToLocalStorage(token);
                    saveUserDataToLocalStorage(decoded);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, [token]);


    const tokenIsValid = () =>
        token && userData?.exp > new Date().getTime() / 1000;

    const loginWithUserCredentials = (loginData) =>
        axios
            .post('/auth/login', loginData)
            .then((response) => setToken(response.data));

    const logout = () =>
        deleteTokenFromLocalStorage();

    return (
        <UserContext.Provider
            value={{
                token,
                setToken,
                logout,
                tokenIsValid,
                loginWithUserCredentials,
                userData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}