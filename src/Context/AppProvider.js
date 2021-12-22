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

    const register = async (firstname, lastname, middleName, email, password, selectDate, gender, mobile, referalCode) => {
        const graphqlQuery = {
            query: `mutation createCoach($input: CreateCoachInput!) {
                createCoach(input: $input){
                    id                  
                }
              }`,
            variables: {
                input: {
                    email: email,
                    password: password,
                    profile: {
                        firstName: firstname,
                        middleName: middleName,
                        lastName: lastname,
                        dateOfBirth: selectDate,
                        gender: `${gender}`,
                        mobileNum: mobile,
                        landlineNum: "",
                        profileImg: "",
                    }
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
                register
            }}>
            {props.children}
        </APPContext.Provider>
    )
}