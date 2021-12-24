import React, { createContext, useContext } from 'react';

//CONTEXT 
import { AuthContext } from './AuthProvider'

//PACKAGES
import axios from 'axios'
import { useQuery, gql } from '@apollo/client';

export const APPContext = createContext();

export const APPProvider = props => {
    const baseURL = 'https://api-nightly.nutricoach.pro/graphql';

    const { authDetails } = useContext(AuthContext)

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
                password: password,
            },
        };
        return await request('post', graphqlQuery);
    };

    const forgot = async email => {
        const graphqlQuery = {
            query: `mutation forgotPassword($email: String!) {
                forgotPassword(email: $email)
              }`,
            variables: {
                email: email,
            },
        };
        return await request('post', graphqlQuery);
    };

    const resetNewPassword = async newPassword => {
        const graphqlQuery = {
            query: `mutation resetPassword($input: ResetPasswordInput!) {
                resetPassword(input: $input){
                   userRole  
                }
            }`,
            variables: {
                input: {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGE2NzBkOGIxOWY4NDVlZmRlOTU5ZiIsImlhdCI6MTY0MDE3NDc5MywiZXhwIjoxNjQwNzc5NTkzfQ.g94Wwk5kJkYZyI3HwxyXcuhnHTcm0NFHAgl55In3h8c",
                    newPassword: newPassword,
                },
            },
        };
        return await request('post', graphqlQuery);
    };

    const changeNewPassword = async (email, oldPassword, newPassword) => {
        const graphqlQuery = {
            query: `mutation updateUserPassword($input: UpdateUserPasswordInput!) {
                updateUserPassword(input: $input){
                   id,
                   email,
                   password                    
                }
            }`,
            variables: {
                input: {
                    email: email,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                },
            },
        };
        return await request('post', graphqlQuery);
    };

    const register = async (
        firstname,
        lastname,
        middleName,
        email,
        password,
        selectDate,
        gender,
        mobile,
        referalCode,
    ) => {
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
                        landlineNum: '',
                        profileImg: '',
                    },
                },
            },
        };
        return await request('post', graphqlQuery);
    };

    async function getStrugglingClients() {
        const graphqlQuery = {
            query: `{
                me {
                  ... on Coach {
                    strugglingClients {
                      id
                      email
                      profile {
                        fullName,
                        profileImg
                      }
                    plans{id,name}
                      healthProfile {
                        medicalCondition
                        goals,
                        workout{description}
                       
                      }
                    }
                  }
                }
              }`
        };
        return await request('post', graphqlQuery);
    }

    const request = async (method, params) => {
        try {
            console.log('===================');
            console.log('URL: ', baseURL);
            console.log('METHOD: ', method);
            console.log('PARAMS: ', params);
            console.log('===================');

            let value = authDetails && authDetails.data && authDetails.data.logInCoach && authDetails.data.logInCoach.token ? authDetails.data.logInCoach.token : ''
            if (method == 'get') {
                const response = await axios.get(baseURL, {
                    params: params,
                    headers: {
                        "Authorization": `bearer ${value}`
                    },
                });

                return getResponse(response);
            } else if (method == 'put') {
                const response = await axios.put(baseURL, params, {
                    headers: {
                        "Authorization": `bearer ${value}`
                    },
                });

                return getResponse(response);
            } else {
                var response = await axios({
                    method: method,
                    url: baseURL,
                    data: params,
                    headers: {
                        "Authorization": `bearer ${value}`,
                        'Content-Type': 'application/json',
                    },
                });

                return getResponse(response);
            }
        } catch (e) {
            console.log(e);
            return getError(e);
        }
    };

    const getResponse = response => {
        console.log(JSON.stringify(response.data));
        if (response.data) {
            let result = {
                status: true,
                data: response.data,
                error: null,
            };
            return result;
        } else {
            let result = {
                status: false,
                data: {},
                error: null,
            };
            return result;
        }
    };

    const getError = error => {
        var message = '';
        if (error.response) {
            if (error.response.data) {
                console.log(error.response.data);
                if (error.response.data.msg) {
                    message = error.response.data.message;
                } else {
                    message = JSON.stringify(error.response.data.message);
                }
            } else {
                console.log(error.response);
                message = 'Something went wrong';
            }
        } else {
            console.log(error);
            message = error.message;
        }

        let data = {
            status: false,
            result: null,
            error: message,
        };
        return data;
    };

    return (
        <APPContext.Provider
            value={{
                baseURL,
                login,
                forgot,
                resetNewPassword,
                register,
                changeNewPassword,
                getStrugglingClients
            }}>
            {props.children}
        </APPContext.Provider>
    );
};
