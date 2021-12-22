import React, { createContext, useEffect, useState, useContext } from 'react';
import { Alert } from 'react-native';

import { useQuery, gql } from '@apollo/client';



export const APPContext = createContext();

export const APPProvider = (props) => {

    const baseURL = "https://api-nightly.nutricoach.pro/graphql"


    // const LOGIN = (email, password) => {
    //     gql`
    //     query logInCoach {
    //         logInCoach(email: ${email}, password: ${password}) {
    //         edges {
    //           node {
    //             id,
    //             token
    //           }
    //         }
    //       }
    //     }
    //   `;
    // }

    function login(username, password) {


    }

    return (
        <APPContext.Provider
            value={{
                baseURL,
                login
            }}>
            {props.children}
        </APPContext.Provider>
    )
}