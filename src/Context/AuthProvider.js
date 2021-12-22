import React, { createContext, useEffect, useState } from 'react';

//PACKAGES
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [authDetails, setAuthDetails] = useState(null)

    async function setLoggedInUser(data) {
        AsyncStorage.setItem('login_user_details', JSON.stringify(data))
        setAuthDetails(data)
    }

    return (
        <AuthContext.Provider
            value={{
                authDetails,
                setAuthDetails,
                setLoggedInUser,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}
