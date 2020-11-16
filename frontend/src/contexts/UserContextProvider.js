import React, { useEffect, useState } from 'react';
import UserContext from './UserContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const ACCESS_TOKEN = 'ACCESS_TOKEN';

export default function UserContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem(ACCESS_TOKEN));
    const [userData, setUserData] = useState();

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp > new Date().getTime() / 1000) {
                    localStorage.setItem(ACCESS_TOKEN, token);
                    setUserData(decoded);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, [token]);

    const tokenIsValid = () =>
        token && userData?.exp > new Date().getTime() / 1000;

    const postLogin = (loginData) =>
        axios
            .post('/auth/login', loginData)
            .then((response) => setToken(response.data));

    return (
        <UserContext.Provider value={{ token, tokenIsValid, postLogin, userData }}>
            {children}
        </UserContext.Provider>
    );
}