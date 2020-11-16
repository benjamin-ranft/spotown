import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export default function ProtectedRoute(props) {
    const { tokenIsValid } = useContext(UserContext);
    return tokenIsValid() ? <Route {...props} /> : <Redirect to="/login" />;
}