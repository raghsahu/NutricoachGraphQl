import React, { createContext, useEffect, useState, useContext } from 'react';
import { Alert } from 'react-native';

import { useQuery, gql } from '@apollo/client';

//PACKAGES
import axios from 'axios'

export const APPContext = createContext();

export const APPProvider = (props) => {

    const baseURL = "https://api-nightly.nutricoach.pro/graphql"


    const login = async (email, password) => {
        const graphqlQuery = {
            query: `mutation logInCoach($email: String!, $password: String!) {
                logInCoach(email: $email, password: $password){
                    id,
                    token                  
                }
              }`,
            variables: {
                email: email,
                password: password
            }
        };
        return await request('post', graphqlQuery)
    }

  const forgot = async (email) => {
        const graphqlQuery = {
            query: `mutation forgotPassword($email: String!) {
                forgotPassword(email: $email)
                
              }`,
            variables: {
                email: email 
            }
        };
        return await request('post', graphqlQuery)
    }

    const resetNewPassword = async (newPassword) => {
        const graphqlQuery = {
            query: `mutation  {
                resetPassword(input:
                {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGE2NzBkOGIxOWY4NDVlZmRlOTU5ZiIsImlhdCI6MTY0MDE3NDc5MywiZXhwIjoxNjQwNzc5NTkzfQ.g94Wwk5kJkYZyI3HwxyXcuhnHTcm0NFHAgl55In3h8c",
                newPassword: $newPassword
                }
                ){
                   userRole                 
                }
              }`,
            variables: {
                input: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGE2NzBkOGIxOWY4NDVlZmRlOTU5ZiIsImlhdCI6MTY0MDE3NDc5MywiZXhwIjoxNjQwNzc5NTkzfQ.g94Wwk5kJkYZyI3HwxyXcuhnHTcm0NFHAgl55In3h8c",
                newPassword: newPassword
                }
            }
        };
        return await request('post', graphqlQuery)
    }


    const request = async (method, params) => {
        try {
            console.log("===================")
            console.log("URL: ", baseURL)
            console.log("METHOD: ", method)
            console.log("PARAMS: ", params)
            console.log("===================")


            if (method == 'get') {
                const response = await axios.get(baseURL, {
                    params: params,
                    headers: {
                    },
                });

                return getResponse(response)
            }
            else if (method == 'put') {
                const response = await axios.put(baseURL, params, {
                    headers: {
                    },
                })

                return getResponse(response)
            }
            else {
                var response = await axios({
                    method: method,
                    url: baseURL,
                    data: params,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                return getResponse(response)
            }
        }
        catch (e) {
            console.log(e)
            return getError(e)
        }
    }

    const getResponse = (response) => {
        console.log(JSON.stringify(response.data))
        if (response.data) {
            let result = {
                status: true,
                data: response.data,
                error: null
            }
            return result
        } else {
            let result = {
                status: false,
                data: {},
                error: null
            }
            return result
        }
    }

    const getError = (error) => {
        var message = ""
        if (error.response) {
            if (error.response.data) {
                console.log(error.response.data)
                if (error.response.data.msg) {
                    message = error.response.data.message
                }
                else {
                    message = JSON.stringify(error.response.data.message)
                }
            }
            else {
                console.log(error.response)
                message = "Something went wrong"
            }
        }
        else {
            console.log(error)
            message = error.message
        }

        let data = {
            status: false,
            result: null,
            error: message
        }
        return data

    }


    return (
        <APPContext.Provider
            value={{
                baseURL,
                login,
                forgot,
                resetNewPassword,
            }}>
            {props.children}
        </APPContext.Provider>
    )
}