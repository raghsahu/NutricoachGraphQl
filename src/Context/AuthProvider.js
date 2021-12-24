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

    async function setUserEmail(email) {
        AsyncStorage.setItem('login_user_email', email)
        
    }

    return (
        <AuthContext.Provider
            value={{
                authDetails,
                setAuthDetails,
                setLoggedInUser,
                setUserEmail,
            
                
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}
