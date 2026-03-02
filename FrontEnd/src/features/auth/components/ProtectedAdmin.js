import React from 'react'
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../authSlice';
import { Navigate } from 'react-router-dom';

const ProtectedAdmin = ({ children }) => {

    const user = useSelector(selectLoggedInUser);
    
    console.log(user);

    if (!user) {
        return <Navigate to='/login' replace={true}></Navigate>
    }

    return children
}

export default ProtectedAdmin