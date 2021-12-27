import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Animated,
  SafeAreaView,
} from 'react-native';
import CONFIGURATION from '../../Components/Config';
import GeneralStatusBar from './../../Components/GeneralStatusBar';
import LinearGradient from 'react-native-linear-gradient';
import style from './style';
import ClientsBox from '../../Components/ClientsBox';
import Chat from '../../Components/Chat';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import PagerView from 'react-native-pager-view';
import { APPContext } from '../../Context/AppProvider';

const DATA = [{}];

const {height, width} = Dimensions.get('screen');

const index = props => {
  const { sendMessage } = useContext(APPContext);

  const [selected, setselected] = useState(0);
  const [animation, setanimation] = useState(new Animated.Value(0));
  const [startend, setstartend] = useState(false);
  const [fileData, setfileData] = useState('');
  const [userdata, setuserdata] = useState({document: {}});
  //const [filePath, setFilePath] = useState({});
  //const [toptab,settoptab] = useState('0')
  console.log('===============sdgdfggdf=====================');
  console.log(userdata);
  console.log('====================================');
  useEffect(() => {
    if (startend) {
      startAnimation();
    } else {
      EndAnimation();
    }
  }, [startend]);
  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 70,
      duration: 1000,
    }).start(() => {});
  };
  const EndAnimation = () => {
    Animated.timing(animation, {
      toValue: -100,
      duration: 1000,
    }).start(() => {});
  };

  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
    };
    launchCamera({mediaType: 'mixed'}, response => {
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
        let imageurl = {
          name: 'gallery.png',
          uri: response.assets[0].uri,
          type: '*/*',
        };
        setfileData(response.uri);
        // Setimage(image)
        setuserdata(imageurl);
      }
    });
  };

  const image = () => {
    let options = {
      mediaType: 'photo',
    };
    launchImageLibrary({mediaType: 'photo'}, response => {
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
        let imageurl = {
          name: 'gallery.png',
          uri: response.assets[0].uri,
          type: '*/*',
        };
        setfileData(response.uri);
        // Setimage(image)
        setuserdata(imageurl);
      }
    });
  };

  const Videoss = () => {
    let options = {
      mediaType: 'photo',
    };
    launchImageLibrary({mediaType: 'video'}, response => {
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
        let imageurl = {
          name: 'gallery.png',
          uri: response.assets[0].uri,
          type: '*/*',
        };
        setfileData(response.uri);
        // Setimage(image)
        setuserdata(imageurl);
      }
    });
  };

  const filePiker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      const pdf = {
        uri: res.uri,
        type: '*/*',
        name: res.name,
      };
      console.log('================xzdfdsfs====================');
      console.log(res);

      setfileData(RNFetchBlob.wrap(res.uri));
      // console.log('====================================');
      setuserdata(pdf);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

   const sendMessages = async () => {
    const result = await sendMessage(id, "", "","", "", "", false);

  };

  return (
    <View style={style.container}>
      <GeneralStatusBar
        backgroundColor={CONFIGURATION.statusbarColor}
        barStyle="light-content"
      />
      <LinearGradient
        colors={[CONFIGURATION.lightYellow, CONFIGURATION.DarkYellow]}
        style={style.yellowView}>
        <View
          style={{
            padding: 10,
            borderColor: CONFIGURATION.loginInputBorder,
            borderBottomWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            width: width - 40,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image
              style={{height: 20, width: 20}}
              source={require('./../../assetss/back.png')}
            />
          </TouchableOpacity>
          <Image
            resizeMode={'cover'}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50 / 2,
              borderColor: CONFIGURATION.white,
              borderWidth: 2,
            }}
            source={{
              uri: 'https://images.unsplash.com/photo-1612904372219-885abc44dfa8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZlbWFsZSUyMG1vZGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ClientsDetail');
            }}
            style={{width: '70%'}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: CONFIGURATION.TextBold,
                color: CONFIGURATION.white,
              }}>
              Erin George
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
            }}
            style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 15,
                fontFamily:
                  selected == 0
                    ? CONFIGURATION.TextBold
                    : CONFIGURATION.TextRegular,
                color: CONFIGURATION.white,
              }}>
              Appointments
            </Text>
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
            }}
            style={{alignItems: 'center'}}>
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
                height: 3,
                width: 50,
                backgroundColor: selected == 1 ? CONFIGURATION.white : null,
                marginTop: 10,
              }}></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setselected(2);
            }}
            style={{alignItems: 'center'}}>
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
                height: 3,
                width: 50,
                backgroundColor: selected == 2 ? CONFIGURATION.white : null,
                marginTop: 10,
              }}></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setselected(3);
            }}
            style={{alignItems: 'center'}}>
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
                height: 3,
                width: 50,
                backgroundColor: selected == 3 ? CONFIGURATION.white : null,
                marginTop: 10,
              }}></View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={style.whiteView}>
        <PagerView
          style={style.pagerView}
          initialPage={0}
          onPageSelected={e => {
            console.log(e.nativeEvent.position);
            setselected(e.nativeEvent.position);
          }}>
          <View key="1">
            <FlatList
              data={DATA}
              showsVerticalScrollIndicator={false}
              renderItem={() => {
                return <Chat />;
              }}
              keyExtractor={item => item.id}
            />
          </View>
          <View key="2">
            <Text>Meal plan</Text>
          </View>
          <View key="3">
            <Text>Progress</Text>
          </View>
          <View key="4">
            <Text>Questions</Text>
          </View>
        </PagerView>

        <View style={style.inputView}>
          <View style={style.inputrow}>
            <TextInput style={style.input} placeholder="Send message" />
            <TouchableOpacity
              onPress={() => {
                setstartend(!startend);
              }}
              style={{}}>
              <Image
                style={{height: 20, width: 20}}
                source={require('./../../assetss/paperClip.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '20%',
              backgroundColor: CONFIGURATION.primaryGreen,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            <TouchableOpacity
            onPress={() => {
                sendMessages();
              }}
               style={{}}>
            <Text
              style={{
                fontFamily: CONFIGURATION.TextBold,
                color: CONFIGURATION.white,
              }}>
              Send
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: animation,
          height: 100,
          width: width,
          backgroundColor: CONFIGURATION.white,
          zIndex: 1,
          flexDirection: 'row',
          elevation: 5,
          borderColor: CONFIGURATION.loginInputBorder,
          borderBottomWidth: 1,
        }}>
        {userdata.uri ? (
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
              marginHorizontal: 10,
            }}>
            <Image
              style={{height: 80, width: 80, marginTop: 10, borderRadius: 10}}
              source={{uri: userdata.uri}}
            />
            {userdata.uri ? (
              <TouchableOpacity
                onPress={() => {
                  setuserdata({document: {}});
                }}
                style={{
                  backgroundColor: CONFIGURATION.primaryRed,
                  height: 15,
                  width: 15,
                  borderRadius: 15 / 2,
                  position: 'absolute',
                  top: 5,
                  right: -5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{height: 10, width: 10}}
                  source={require('./../../assetss/closes.png')}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        ) : (
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
                style={{height: 30, width: 30}}
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
                filePiker();
              }}
              style={{
                height: 100,
                width: width / 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('./../../assetss/File.png')}
                style={{height: 30, width: 30}}
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
                style={{height: 30, width: 30}}
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
                style={{height: 30, width: 30}}
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
        )}
      </Animated.View>
      <SafeAreaView />
    </View>
  );
};

export default index;
