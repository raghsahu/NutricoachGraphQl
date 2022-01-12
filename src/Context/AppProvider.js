import React, { createContext, useContext } from 'react';

//CONTEXT
import { AuthContext } from './AuthProvider';

//PACKAGES
import axios from 'axios';
import { useQuery, gql } from '@apollo/client';

export const APPContext = createContext();

export const APPProvider = props => {
  const baseURL = 'https://api-nightly.nutricoach.pro/graphql';

  const { authDetails } = useContext(AuthContext);

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
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGE2NzBkOGIxOWY4NDVlZmRlOTU5ZiIsImlhdCI6MTY0MDE3NDc5MywiZXhwIjoxNjQwNzc5NTkzfQ.g94Wwk5kJkYZyI3HwxyXcuhnHTcm0NFHAgl55In3h8c',
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
          newPassword: newPassword,
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

  const getUserProfile = async id => {
    const graphqlQuery = {
      query: `query user($id: ID) {
                user(id: $id){
                   id,
                   email,
                   profile {
                    name{
                    firstName,
                    middleName,
                    lastName,
                    }
                  fullName,
                  dateOfBirth,
                  gender,
                  mobileNum,
                  profileImg,
                  joinedDate,
                  }                    
                }
            }`,
      variables: {
        id: id,
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
              }`,
      };
      return await request('post', graphqlQuery);
    }

    async function getClients() {
      const graphqlQuery = {
        query: `{
                me {
                  ... on Coach {
                    customers {
                      id
                      email
                      profile {
                        fullName,
                        profileImg
                      }
                      lastActivity
                      activated  
                      plans{id,name}
                      healthProfile {
                        medicalCondition
                        goals,
                        workout{description}
                      }
                      unreadMessages(
					              channel: APPOINTMENTS
                      ) {
                        id,
                        body,
          		          createdAt
                     }
                     messagesWithCoach{id, body, createdAt}
                    }
                  }
                }
              }`,
      };
      return await request('post', graphqlQuery);
    }

    const sendMessage = async (
      fromUser,
      toUser,
      message,
      attachments,
      channel,
      notifyViaEmail,
    ) => {
      const graphqlQuery = {
        query: `mutation sendMessage($input: SendMessageInput!) {
                sendMessage(input: $input){
                    id
                    body
                    createdAt
                    from {
                      id, email
                    }
                    attachments                                                                                       
                }
              }`,
        variables: {
          input: {
            from: fromUser,
            to: toUser,
            message: message,
            attachments: [],
            channel: channel,
            notifyViaEmail: notifyViaEmail,
          },
        },
      };
      return await request('post', graphqlQuery);
    };

    const sendFileToMessage = async (
      fromUser,
      toUser,
      attachments,
      channel,
      notifyViaEmail,
    ) => {
      const graphqlQuery = {
        query: `mutation sendMessage($input: SendMessageInput!) {
                sendMessage(input: $input){
                  id
                  body
                  createdAt
                  from {
                    id, email
                  }
                  attachments                                                                            
                }
              }`,
        variables: {
          input: {
            from: fromUser,
            to: toUser,
            message: '',
            attachments: [null],
            channel: channel,
            notifyViaEmail: notifyViaEmail,
          },
        },
      };

      const map = {
        0: ['variables.input.attachments'],
      };

      console.log(JSON.stringify(graphqlQuery));
      console.log(JSON.stringify(map));

      let formData = new FormData();
      formData.append('operations', JSON.stringify(graphqlQuery));
      formData.append('map', JSON.stringify(map));
      formData.append('0', attachments);
      return await request('multipart', formData);
    };

    const readMessages = async (otherMember, dateSeen, channel) => {
      let selectedChannel = `${channel}`;
      const graphqlQuery = {
        query: `mutation readMessages($input: ReadMessagesInput!) {
                readMessages(input: $input){
                     body
                     attachments
                     channel
                     seenAt
                     createdAt                                                                                    
                }
              }`,
        variables: {
          input: {
            otherMember: otherMember,
            dateSeen: dateSeen,
            channel: selectedChannel,
          },
        },
      };
      return await request('post', graphqlQuery);
    };

    // channelMessages
    const getChatMessages = async (customerId, selectedChannel) => {
      let channel = `${selectedChannel}`;
      const graphqlQuery = {
        query: `{
                me {
                  ... on Coach {
                    channelMessages(customerId: "${customerId}" , channel: ${channel}),
                    {
                     id
                    body
                    createdAt
                    seenAt
                    from {
                    id
                    email
                    }
                    otherMember{
                    id
                    email
                    }
                    attachments
                    channel
                    }
                  }
                }
              }`,
      };
      return await request('get', graphqlQuery);
    };

    // get client details
    const getClientsDetails = async customerId => {
      const graphqlQuery = {
        query: `{
                me {
                  ... on Coach {
                    customer(id: "${customerId}" ),
                    {
                      id
                      email
                      profile
                      {
                      fullName
                      dateOfBirth
                      gender
                      profileImg
                      mobileNum
                      }  
                      lastActivity
                      healthProfile{
                        height{
                        inches
                        feet
                        }
                        weight{
                        currentWeight
                        targetWeight
                        }
                        bodyMeasurements{
                        armsCm
                        abdomenCm
                        thighsCm
                        waistCm
                        hipsCm
                        chestCm
                        calvesCm
                        }
                         
                          pregnancyHistory{
                            pregnancyCount
                            firstDayOfLactation
                            lactationDurationMonths
                          }
                            coachingType
                            physicalActivityLevel
                            sports{
                              description
                              frequency
                            }
                            alcoholIntake{
                              doYouDrink
                              frequency
                            }
                            hoursOfSleep
                            foodIntolerance
                            latestBodyComposition(clientId: "${customerId}"){
                            bodyFatMassKg
                            bodyFatPercentage
                            muscleMassKg
                            muscleMassPercentage
                          }
                    }
                  }
                }
              }
            }`,
      };
      return await request('get', graphqlQuery);
    };

    // get client unread count
    const getClientsUnreadMessage = async (selectedChannel, customerId) => {
      let channel = `${selectedChannel}`;
      const graphqlQuery = {
        query: `{
                me {
                  ... on Coach {
                    customer(id: "${customerId}" ),
                    {
                      id
                      unreadMessages(
					              channel: ${channel}
                      ) {
                        body,
          		          createdAt,
                        channel
                     }
                    }
                  }
                }
              
            }`,
      };
      return await request('get', graphqlQuery);
    };

    const request = async (method, params) => {
      try {
        console.log('===================');
        console.log('URL: ', baseURL);
        console.log('METHOD: ', method);
        console.log('PARAMS: ', params);
        console.log('===================');

        let value =
          authDetails &&
            authDetails.data &&
            authDetails.data.logInCoach &&
            authDetails.data.logInCoach.token
            ? authDetails.data.logInCoach.token
            : '';
        console.log(value);
        if (method == 'get') {
          const response = await axios.get(baseURL, {
            params: params,
            headers: {
              Authorization: `bearer ${value}`,
            },
          });

          return getResponse(response);
        } else if (method == 'put') {
          const response = await axios.put(baseURL, params, {
            headers: {
              Authorization: `bearer ${value}`,
            },
          });

          return getResponse(response);
        } else if (method == 'multipart') {
          var response = await axios({
            method: 'POST',
            url: baseURL,
            data: params,
            headers: {
              Authorization: `bearer ${value}`,
              'Content-Type': 'multipart/form-data',
            },
          });

          return getResponse(response);
        } else {
          var response = await axios({
            method: method,
            url: baseURL,
            data: params,
            headers: {
              Authorization: `bearer ${value}`,
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
        if (response.data.data) {
          let result = {
            status: true,
            data: response.data,
            error: null,
          };
          return result;
        } else if (response.data.errors && response.data.errors.length > 0) {
          let error = response.data.errors[0].message;
          let result = {
            status: false,
            data: null,
            error: error,
          };
          return result;
        }
      } else {
        let result = {
          status: false,
          data: null,
          error: 'Something went wrong',
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
          getUserProfile,
          getStrugglingClients,
          getClients,
          sendMessage,
          readMessages,
          getChatMessages,
          getClientsDetails,
          sendFileToMessage,
          getClientsUnreadMessage,
        }}>
        {props.children}
      </APPContext.Provider>
    );

  
}

