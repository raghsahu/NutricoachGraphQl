import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput, FlatList, Animated, SafeAreaView, Modal, ActivityIndicator, StyleSheet, } from 'react-native';
import style from './style';

//CONFIG & COMPONENTS
import CONFIGURATION from '../../Components/Config';
import GeneralStatusBar from './../../Components/GeneralStatusBar';
import Chat from '../../Components/Chat';
import ProgressView from '../../Components/ProgressView';

//CONTEXT
import { APPContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';

// PACKAGES
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PagerView from 'react-native-pager-view';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import LinearGradient from 'react-native-linear-gradient';

//const DATA = [{}];
const { height, width } = Dimensions.get('screen');

const index = props => {
  const toUser = props.route.params.toUser;
  const toFullName = props.route.params.fullName;
  const profileImage = props.route.params.profileImage;

  const { sendMessage, readMessages, sendFileToMessage, getChatMessages, getClientsUnreadMessage } = useContext(APPContext);
  const { authDetails } = useContext(AuthContext);

  const [selected, setselected] = useState(0);
  // const [selectedChannel, setselectedChannel] = useState('APPOINTMENTS');
  const [selectedChannel, setselectedChannel] = useState('APPOINTMENTS');
  const [isModalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [chatData, setChatData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isImageLoading, setImageLoading] = useState(false);

  const [appointmentsUnread, setAppointmentsUnread] = useState(false);
  const [mealplanUnread, setMealPlanUnread] = useState(false);
  const [progressUnread, setProgressUnread] = useState(false);
  const [questionUnread, setQuestionUnread] = useState(false);

  useEffect(() => {

    getAppointsUnreadCount('APPOINTMENTS');
    getMealUnreadCount('MEAL_PLAN');
    getProgressUnreadCount('PROGRESS');
    getQuestionUnreadCount('QUESTIONS');

    readMessage();
    getMessages();

    return () => { };
  }, [selectedChannel]);

  useEffect(() => {
    getMessages();
    return () => { };
  }, [selectedChannel]);

  const MINUTE_MS = 5 * 1000; //Logs every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
    }, MINUTE_MS);
    return () =>
      clearInterval(interval);
    // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [selectedChannel]);

  useEffect(() => {
    const interval = setInterval(() => {
      // getAppointsUnreadCount('APPOINTMENTS');
      // getMealUnreadCount('MEAL_PLAN');
      // getProgressUnreadCount('PROGRESS');
      // getQuestionUnreadCount('QUESTIONS');
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);

  async function getAppointsUnreadCount(channelName) {
    const result = await getClientsUnreadMessage(channelName, toUser);
    if (result && result.data && result.data.data && result.data.data.me) {
      if (result.data.data.me.customer.unreadMessages != null) {
        if (result.data.data.me.customer.unreadMessages.length > 0) {
          for (let i = 0; i < result.data.data.me.customer.unreadMessages.length; i++) {
            if (result.data.data.me.customer.unreadMessages[i].channel == 'APPOINTMENTS') {
              setAppointmentsUnread(true);
            }
          }
          console.log("appoints_unread " + appointmentsUnread);
        }
        else {
          setAppointmentsUnread(false);
        }

      }
    }
  }

  async function getMealUnreadCount(channelName) {
    const result = await getClientsUnreadMessage(channelName, toUser);
    if (result && result.data && result.data.data && result.data.data.me) {
      if (result.data.data.me.customer.unreadMessages != null) {
        if (result.data.data.me.customer.unreadMessages.length > 0) {
          setMealPlanUnread(true);
        } else {
          setMealPlanUnread(false);
        }
        console.log("meal_unread " + mealplanUnread);
      }
    }
  }

  async function getProgressUnreadCount(channelName) {
    const result = await getClientsUnreadMessage(channelName, toUser);
    if (result && result.data && result.data.data && result.data.data.me) {
      // setClient(result.data.data.me.customers)
      if (result.data.data.me.customer.unreadMessages != null) {
        if (result.data.data.me.customer.unreadMessages.length > 0) {
          setProgressUnread(true);
        } else {
          setProgressUnread(false);
        }
        console.log("progress_unread " + progressUnread);
      }
    }
  }

  async function getQuestionUnreadCount(channelName) {
    const result = await getClientsUnreadMessage(channelName, toUser);
    console.log("QUESTIONCOUNT=====>",JSON.stringify(result))
    // if (result && result.data && result.data.data && result.data.data.me) {
    //   if (result.data.data.me.customer.unreadMessages != null) {
    //     if (result.data.data.me.customer.unreadMessages.length > 0) {
    //       for (let i = 0; i < result.data.data.me.customer.unreadMessages.length; i++) {
    //         if (result.data.data.me.customer.unreadMessages[i].channel == 'QUESTIONS') {
    //           setQuestionUnread(true);
    //         }
    //       }
    //     } else {
    //       setQuestionUnread(false);
    //       console.log("question_unread " + questionUnread);
    //     }

    //   }
    // }
  }



  const readMessage = async () => {
    const now = new Date();
    const result = await readMessages(
      toUser,
      now.toISOString(),
      selectedChannel,
    );
  };

  async function getMessages() {
    setLoading(true);
    const result = await getChatMessages(toUser, selectedChannel);
    setLoading(false);
    if (result && result.data && result.data.data && result.data.data.me) {
      setChatData(result.data.data.me.channelMessages);
    } else {
      setChatData([]);
      Toast.show(result.error, 2000);
    }
  }

  const chooseFile = () => {
    launchCamera({ mediaType: 'mixed' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const file = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type ? response.assets[0].type : 'image/jpeg',
        };
        setTimeout(() => {
          setModalVisible(false);
          setTimeout(() => {
            sendFile(file);
          }, 200);
        }, 100);
      }
    });
  };

  const image = () => {
    try {
      launchImageLibrary({ mediaType: 'photo' }, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log(response.fileName);
          console.log(response.uri);

          const file = {
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type
              ? response.assets[0].type
              : 'image/jpeg',
          };

          setTimeout(() => {
            setModalVisible(false);
            setTimeout(() => {
              sendFile(file);
            }, 200);
          }, 100);
        }
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const Videoss = () => {
    let options = {
      mediaType: 'photo',
    };
    launchImageLibrary({ mediaType: 'video' }, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const file = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type ? response.assets[0].type : 'video/mp4',
        };

        setTimeout(() => {
          setModalVisible(false);
          setTimeout(() => {
            sendFile(file);
          }, 200);
        }, 100);
      }
    });
  };

  const filePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      const file = {
        uri: res.uri,
        type: res.type ? res.type : 'application/pdf',
        name: res.name,
      };

      setTimeout(() => {
        setModalVisible(false);
        setTimeout(() => {
          sendFile(file);
        }, 200);
      }, 100);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const sendMessages = async messageText => {
    if (!messageText) {
      return;
    } else {
      let loginId =
        authDetails &&
          authDetails.data &&
          authDetails.data.logInCoach &&
          authDetails.data.logInCoach.id
          ? authDetails.data.logInCoach.id
          : '';

      const result = await sendMessage(
        loginId,
        toUser,
        messageText,
        '',
        selectedChannel,
        false,
      );

      if (result.data && result.data.data.sendMessage != null) {
        setTimeout(() => {
          setMessage('');
          let data = [...chatData];
          data.splice(0, 0, result.data.data.sendMessage);
          setChatData(data);
        }, 100);
      } else {
        Toast.show('Something went wrong', 2000);
      }
    }
  };

  const sendFile = async file => {
    if (!file) {
      return;
    } else {
      setImageLoading(true);
      let loginId =
        authDetails &&
          authDetails.data &&
          authDetails.data.logInCoach &&
          authDetails.data.logInCoach.id
          ? authDetails.data.logInCoach.id
          : '';

      const result = await sendFileToMessage(
        loginId,
        toUser,
        file,
        selectedChannel,
        false,
      );

      if (result.data && result.data.data.sendMessage != null) {
        setTimeout(() => {
          setMessage('');
          let data = [...chatData];
          data.splice(0, 0, result.data.data.sendMessage);
          setChatData(data);
          setImageLoading(false);
        }, 100);
      } else {
        setImageLoading(false);
        setTimeout(() => {
          Toast.show('Something went wrong', 2000);
        }, 1000);
      }
    }
  };

  function getImage() {
    if (profileImage) {
      return profileImage == '' ? null : profileImage;
    } else {
      return null;
    }
  }

  return (
    <View style={style.container}>
      <View style={style.container}>
        <GeneralStatusBar
          backgroundColor={CONFIGURATION.statusbarColor}
          barStyle="light-content"
        />
        <LinearGradient
          colors={[CONFIGURATION.lightYellow, CONFIGURATION.DarkYellow]}
          style={style.yellowView}>
          <View
            style={style.goback}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Image
                style={{ height: 20, width: 20 }}
                source={require('./../../assetss/back.png')}
              />
            </TouchableOpacity>
            <Image
              resizeMode={'cover'}
              style={style.userImage}
              source={ //{{
                getImage() ? { uri: getImage() } : null
              }
            />
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ClientsDetail', {
                  toUser: toUser,
                });
              }}
              style={{ width: '70%' }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: CONFIGURATION.TextBold,
                  color: CONFIGURATION.white,
                }}>
                {toFullName}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: CONFIGURATION.TextRegular,
                  color: CONFIGURATION.white,
                }}>
                Active
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 0,
              width: width,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                setselected(0);
                setselectedChannel('APPOINTMENTS');
              }}
              style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', marginTop: 12 }}>

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: selected == 0 ? CONFIGURATION.TextBold : CONFIGURATION.TextRegular,
                    color: CONFIGURATION.white,
                  }}>
                  Appointments
                </Text>
                <View
                  style={{
                    height: 8,
                    width: 8,
                    backgroundColor: appointmentsUnread ? CONFIGURATION.primaryRed : null,
                    borderRadius: 8 / 2,
                    alignSelf: 'center',
                    marginStart: 4
                  }}></View>
              </View>
              <View
                style={{
                  height: 3,
                  width: 50,
                  backgroundColor: selected == 0 ? CONFIGURATION.white : null,
                  marginTop: 10,
                }}></View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setselected(1);
                setselectedChannel('MEAL_PLAN');
              }}
              style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', marginTop: 12 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily:
                      selected == 1
                        ? CONFIGURATION.TextBold
                        : CONFIGURATION.TextRegular,
                    color: CONFIGURATION.white,
                  }}>
                  Meal plan
                </Text>
                <View
                  style={{
                    height: 8,
                    width: 8,
                    backgroundColor: mealplanUnread ? CONFIGURATION.primaryRed : null,
                    borderRadius: 8 / 2,
                    alignSelf: 'center',
                    marginStart: 4

                  }}></View>
              </View>

              <View
                style={{
                  height: 3,
                  width: 50,
                  backgroundColor: selected == 1 ? CONFIGURATION.white : null,
                  marginTop: 10,
                }}></View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setselected(2);
                setselectedChannel('PROGRESS');
              }}
              style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', marginTop: 12 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily:
                      selected == 2
                        ? CONFIGURATION.TextBold
                        : CONFIGURATION.TextRegular,
                    color: CONFIGURATION.white,
                  }}>
                  Progress
                </Text>
                <View
                  style={{
                    height: 8,
                    width: 8,
                    backgroundColor: progressUnread ? CONFIGURATION.primaryRed : null,
                    borderRadius: 8 / 2,
                    alignSelf: 'center',
                    marginStart: 4
                  }}></View>
              </View>
              <View
                style={{
                  height: 3,
                  width: 50,
                  backgroundColor: selected == 2 ? CONFIGURATION.white : null,
                  marginTop: 10,
                }}></View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setselected(3);
                setselectedChannel('QUESTIONS');
              }}
              style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', marginTop: 12 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily:
                      selected == 3
                        ? CONFIGURATION.TextBold
                        : CONFIGURATION.TextRegular,
                    color: CONFIGURATION.white,
                  }}>
                  Questions
                </Text>
                <View
                  style={{
                    height: 8,
                    width: 8,
                    backgroundColor: questionUnread ? CONFIGURATION.primaryRed : null,
                    borderRadius: 8 / 2,
                    alignSelf: 'center',
                    marginStart: 4
                  }} />
              </View>
              <View
                style={{
                  height: 3,
                  width: 50,
                  backgroundColor: selected == 3 ? CONFIGURATION.white : null,
                  marginTop: 10,
                }}></View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={style.whiteView}>
          <View style={{ flex: 1.0 }}>
            <FlatList
              data={chatData && chatData.length > 0 ? chatData : null}
              inverted={true}
              showsVerticalScrollIndicator={false}
              extraData={chatData}
              keyExtractor={(item, index) => item.id}
              ListFooterComponent={() => {
                if (isLoading) {
                  return (
                    <View style={{ height: 100, justifyContent: 'center' }}>
                      <ActivityIndicator
                        color={'#000'}
                        animating={true}></ActivityIndicator>
                    </View>
                  );
                } else {
                  return null;
                }
              }}
              renderItem={({ item, index }) => {
                return <Chat item={item} selectedChannel={selectedChannel} />;
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={style.inputView}>
            <View style={style.inputrow}>
              <TextInput
                style={style.input}
                value={message}
                placeholder="Send message"
                onChangeText={text => {
                  setMessage(text);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{}}>
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require('./../../assetss/paperClip.png')}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                sendMessages(message);
              }}
              style={{
                width: '20%',
                backgroundColor: CONFIGURATION.primaryGreen,
                paddingVertical: 12,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <View style={{}}>
                <Text
                  style={{
                    fontFamily: CONFIGURATION.TextBold,
                    color: CONFIGURATION.white,
                  }}>
                  Send
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          style={{ flex: 1.0 }}
          animationType="slide"
          visible={isModalVisible}
          transparent={true}>
          <View style={{ flex: 1.0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <TouchableOpacity
              style={{ flex: 1.0 }}
              onPress={() => {
                setModalVisible(false);
              }}></TouchableOpacity>
            <View
              style={{
                width: width,
                backgroundColor: CONFIGURATION.white,
                zIndex: 1,
                flexDirection: 'row',
                elevation: 5,
                borderColor: CONFIGURATION.loginInputBorder,
                borderBottomWidth: 1,
              }}>
              <>
                <TouchableOpacity
                  onPress={() => {
                    chooseFile();
                  }}
                  style={{
                    height: 100,
                    width: width / 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('./../../assetss/Cameras.png')}
                    style={{ height: 30, width: 30 }}
                  />
                  <Text
                    style={{
                      fontFamily: CONFIGURATION.TextBold,
                      color: CONFIGURATION.TextDarkBlack,
                      marginTop: 5,
                    }}>
                    Camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    filePicker();
                  }}
                  style={{
                    height: 100,
                    width: width / 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('./../../assetss/File.png')}
                    style={{ height: 30, width: 30 }}
                  />
                  <Text
                    style={{
                      fontFamily: CONFIGURATION.TextBold,
                      color: CONFIGURATION.TextDarkBlack,
                      marginTop: 5,
                    }}>
                    Files
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    image();
                  }}
                  style={{
                    height: 100,
                    width: width / 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('./../../assetss/Photo.png')}
                    style={{ height: 30, width: 30 }}
                  />
                  <Text
                    style={{
                      fontFamily: CONFIGURATION.TextBold,
                      color: CONFIGURATION.TextDarkBlack,
                      marginTop: 5,
                    }}>
                    Photos
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Videoss();
                  }}
                  style={{
                    height: 100,
                    width: width / 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('./../../assetss/Video.png')}
                    style={{ height: 30, width: 30 }}
                  />
                  <Text
                    style={{
                      fontFamily: CONFIGURATION.TextBold,
                      color: CONFIGURATION.TextDarkBlack,
                      marginTop: 5,
                    }}>
                    Videos
                  </Text>
                </TouchableOpacity>
              </>
            </View>
            <SafeAreaView />
          </View>
        </Modal>
      </View>
      {isImageLoading && <ProgressView />}
      <SafeAreaView />
    </View>
  );
};


export default index;
