import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';

//CONSTANT & CONFIG
const {height, width} = Dimensions.get('screen');
import CONFIGURATION from './Config';
import ProgressView from '../Components/ProgressView';

// PACKAGES
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import SendIntentAndroid from 'react-native-send-intent';
import RNFetchBlob from 'rn-fetch-blob';

//CONTEXT
import {AuthContext} from '../Context/AuthProvider';

const Chat = props => {
  const {authDetails} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  let loginId =
    authDetails &&
    authDetails.data &&
    authDetails.data.logInCoach &&
    authDetails.data.logInCoach.id
      ? authDetails.data.logInCoach.id
      : '';
  const item = props.item;

  function getMessageTime() {
    Moment.locale('en');
    var localDate = new Date(item.createdAt);
    return Moment(localDate).format('DD MMM, yyyy hh:mm a');
  }

  function playVideo(url) {
    var fn = Platform.select({
      android() {
        SendIntentAndroid.openAppWithData(
          /* "org.videolan.vlc" */ null,
          url,
          'video/*',
        ).then(wasOpened => {});
      },
      default() {
        Linking.openURL(url).catch(err => {});
      },
    });
    fn();
  }

  const checkPermission = async (url) => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile(url);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile(url);
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadFile = (fileUrl) => {
    setLoading(true)
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        setLoading(false)
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
      });
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  if (item.from.id != loginId) {
    if (item.attachments && item.attachments.length > 0) {
      if (item.attachments[0].resource_type == 'image') {
        if (item.attachments[0].format == 'pdf') {
          return (
            <View
              style={{
                width: width / 2 + 80,
                backgroundColor: CONFIGURATION.lightGreen,
                marginLeft: 20,
                marginVertical: 10,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                padding: 5,
                overflow: 'hidden',
                alignSelf: 'flex-start',
              }}>
              <View
                style={{
                  width: width / 2 + 70,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  backgroundColor: CONFIGURATION.white,
                  borderRadius: 20,
                  padding: 10,
                }}>
                <Image
                  resizeMode={'contain'}
                  style={{height: 40, width: 40}}
                  source={require('./../assetss/PDF.png')}
                />
                <Text
                  style={{
                    fontFamily: CONFIGURATION.TextBold,
                    color: CONFIGURATION.TextDarkBlack,
                    width: '60%',
                  }}>
                  {item.attachments[0].original_filename}
                </Text>
                <TouchableOpacity
                onPress={() => {
                  checkPermission(item.attachments[0].url);
                }}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: CONFIGURATION.primaryGreen,
                  }}>
                  <Image
                    style={{height: 15, width: 15}}
                    source={require('./../assetss/Download.png')}
                  />
                </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: CONFIGURATION.TextRegular,
                      color: CONFIGURATION.TextDarkGray,
                      fontSize: 12,
                    }}>
                    {item.attachments[0].bytes / 1000}Kb - {getMessageTime()}
                  </Text>
                </View>
                <Icon
                  name="checkmark-done"
                  size={15}
                  color={CONFIGURATION.TextDarkGray}
                />
              </View>
              {loading ? 
              <ProgressView></ProgressView>
              : null }
            </View>
          );
        } else {
          return (
            <View
              style={{
                width: width / 2 + 80,
                backgroundColor: CONFIGURATION.messageBack,
                marginRight: 20,
                marginVertical: 10,
                borderRadius: 20,
                padding: 5,
                overflow: 'hidden',
                alignSelf: 'flex-start',
              }}>
              <ImageBackground
                style={{
                  height: width / 2,
                  width: width / 2 + 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                imageStyle={{borderRadius: 20}}
                source={{
                  uri: item.attachments[0].secure_url,
                }}></ImageBackground>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    fontFamily: CONFIGURATION.TextRegular,
                    color: CONFIGURATION.TextDarkGray,
                    fontSize: 12,
                  }}>
                  {getMessageTime()}
                </Text>
              </View>
            </View>
          );
        }
      } else if (item.attachments[0].resource_type == 'video') {
        //VIDEO
        return (
          <View
            style={{
              width: width / 2 + 80,
              backgroundColor: CONFIGURATION.messageBack,
              marginLeft: 20,
              marginVertical: 10,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              padding: 5,
              overflow: 'hidden',
              alignSelf: 'flex-start',
            }}>
            <ImageBackground
              style={{
                height: width / 2,
                width: width / 2 + 70,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000000',
              }}
              imageStyle={{borderRadius: 20, opacity: 0.4}}
              source={{uri: ' '}}>
              <TouchableOpacity
                onPress={() => {
                  playVideo(item.attachments[0].url);
                }}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffffc7',
                  }}>
                  <Image
                    style={{height: 15, width: 15}}
                    source={require('./../assetss/paly.png')}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: CONFIGURATION.primaryGreen,
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}
                onPress={() => {
                  checkPermission(item.attachments[0].url);
                }}>
                <Image
                  style={{height: 15, width: 15}}
                  source={require('./../assetss/Download.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: CONFIGURATION.TextBold,
                  fontSize: 12,
                  color: CONFIGURATION.white,
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                }}>
                {item.attachments[0].duration}
              </Text>
            </ImageBackground>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: CONFIGURATION.TextRegular,
                  color: CONFIGURATION.TextDarkGray,
                  fontSize: 12,
                }}>
                {getMessageTime()}
              </Text>
            </View>
            {loading ? 
              <ProgressView></ProgressView>
              : null }
          </View>
        );
      } else if (item.attachments[0].resource_type == 'application/pdf') {
        return (
          <View
            style={{
              width: width / 2 + 80,
              backgroundColor: CONFIGURATION.lightGreen,
              marginLeft: 20,
              marginVertical: 10,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              padding: 5,
              overflow: 'hidden',
              alignSelf: 'flex-start',
            }}>
            <View
              style={{
                width: width / 2 + 70,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: CONFIGURATION.white,
                borderRadius: 20,
                padding: 10,
              }}>
              <Image
                resizeMode={'contain'}
                style={{height: 40, width: 40}}
                source={require('./../assetss/PDF.png')}
              />
              <Text
                style={{
                  fontFamily: CONFIGURATION.TextBold,
                  color: CONFIGURATION.TextDarkBlack,
                  width: '60%',
                }}>
                {item.attachments[0].original_filename}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  checkPermission(item.attachments[0].url);
                }}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: CONFIGURATION.primaryGreen,
                }}>
                <Image
                  style={{height: 15, width: 15}}
                  source={require('./../assetss/Download.png')}
                />
              </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: CONFIGURATION.TextRegular,
                    color: CONFIGURATION.TextDarkGray,
                    fontSize: 12,
                  }}>
                  250Kb - 2:25 PM
                </Text>
              </View>
              <Icon
                name="checkmark-done"
                size={15}
                color={CONFIGURATION.TextDarkGray}
              />
            </View>
            {loading ? 
              <ProgressView></ProgressView>
              : null }
          </View>
        );
      }
    }
    return (
      <View
        style={{
          width: width / 2 + 50,
          backgroundColor: CONFIGURATION.messageBack,
          marginLeft: 20,
          marginVertical: 10,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: 20,
          alignSelf: 'flex-start',
        }}>
        {item.body ? (
          <Text style={{fontFamily: CONFIGURATION.TextRegular}}>
            {item.body}
          </Text>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: CONFIGURATION.TextRegular,
              color: CONFIGURATION.TextDarkGray,
              fontSize: 10,
            }}>
            {getMessageTime()}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="checkmark-done"
              size={15}
              color={CONFIGURATION.TextDarkGray}
            />
          </View>
        </View>
      </View>
    );
  } else {
    if (item.attachments && item.attachments.length > 0) {
      if (item.attachments[0].resource_type == 'image') {
        if (item.attachments[0].format == 'pdf') {
          return (
            <View
              style={{
                width: width / 2 + 80,
                backgroundColor: CONFIGURATION.lightGreen,
                marginVertical: 10,
                marginRight: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                padding: 5,
                overflow: 'hidden',
                alignSelf: 'flex-end',
              }}>
              <View
                style={{
                  width: width / 2 + 70,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  backgroundColor: CONFIGURATION.white,
                  borderRadius: 20,
                  padding: 10,
                }}>
                <Image
                  resizeMode={'contain'}
                  style={{height: 40, width: 40}}
                  source={require('./../assetss/PDF.png')}
                />
                <Text
                  style={{
                    fontFamily: CONFIGURATION.TextBold,
                    color: CONFIGURATION.TextDarkBlack,
                    width: '60%',
                  }}>
                  {item.attachments[0].original_filename}
                </Text>
                <TouchableOpacity
                onPress={() => {
                  checkPermission(item.attachments[0].url);
                }}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: CONFIGURATION.primaryGreen,
                  }}>
                  <Image
                    style={{height: 15, width: 15}}
                    source={require('./../assetss/Download.png')}
                  />
                </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: CONFIGURATION.TextRegular,
                      color: CONFIGURATION.TextDarkGray,
                      fontSize: 12,
                    }}>
                    {item.attachments[0].bytes / 1000}Kb - {getMessageTime()}
                  </Text>
                </View>
                <Icon
                  name="checkmark-done"
                  size={15}
                  color={CONFIGURATION.TextDarkGray}
                />
              </View>
              {loading ? 
              <ProgressView></ProgressView>
              : null }
            </View>
          );
        } else {
          return (
            <View
              style={{
                width: width / 2 + 80,
                backgroundColor: CONFIGURATION.messageBack,
                marginVertical: 10,
                borderRadius: 20,
                marginRight: 20,
                padding: 5,
                overflow: 'hidden',
                alignSelf: 'flex-end',
              }}>
              <ImageBackground
                style={{
                  height: width / 2,
                  width: width / 2 + 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                imageStyle={{borderRadius: 20}}
                source={{
                  uri: item.attachments[0].secure_url,
                }}></ImageBackground>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    fontFamily: CONFIGURATION.TextRegular,
                    color: CONFIGURATION.TextDarkGray,
                    fontSize: 12,
                  }}>
                  {getMessageTime()}
                </Text>
              </View>
            </View>
          );
        }
      } else if (item.attachments[0].resource_type == 'video') {
        //VIDEO
        return (
          <View
            style={{
              width: width / 2 + 80,
              backgroundColor: CONFIGURATION.messageBack,
              marginVertical: 10,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              marginRight: 20,
              padding: 5,
              overflow: 'hidden',
              alignSelf: 'flex-end',
            }}>
            <ImageBackground
              style={{
                height: width / 2,
                width: width / 2 + 70,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000000',
              }}
              imageStyle={{borderRadius: 20, opacity: 0.4}}
              source={{uri: ' '}}>
              <TouchableOpacity
                onPress={() => {
                  playVideo(item.attachments[0].url);
                }}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffffc7',
                  }}>
                  <Image
                    style={{height: 15, width: 15}}
                    source={require('./../assetss/paly.png')}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: CONFIGURATION.primaryGreen,
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}
                onPress={() => {
                  checkPermission(item.attachments[0].url);
                }}>
                <Image
                  style={{height: 15, width: 15}}
                  source={require('./../assetss/Download.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: CONFIGURATION.TextBold,
                  fontSize: 12,
                  color: CONFIGURATION.white,
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                }}>
                {item.attachments[0].duration}
              </Text>
            </ImageBackground>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: CONFIGURATION.TextRegular,
                  color: CONFIGURATION.TextDarkGray,
                  fontSize: 12,
                }}>
                {getMessageTime()}
              </Text>
            </View>
            {loading ? 
              <ProgressView></ProgressView>
              : null }
          </View>
        );
      } else if (item.attachments[0].resource_type == 'application/pdf') {
        return (
          <View
            style={{
              width: width / 2 + 80,
              backgroundColor: CONFIGURATION.lightGreen,
              marginVertical: 10,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              marginRight: 20,
              padding: 5,
              overflow: 'hidden',
              alignSelf: 'flex-end',
            }}>
            <View
              style={{
                width: width / 2 + 70,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: CONFIGURATION.white,
                borderRadius: 20,
                padding: 10,
              }}>
              <Image
                resizeMode={'contain'}
                style={{height: 40, width: 40}}
                source={{
                  uri: 'https://miro.medium.com/max/653/1*sk2TA810bDbkU_nvoHK5pQ.png',
                }}
              />
              <Text
                style={{
                  fontFamily: CONFIGURATION.TextBold,
                  color: CONFIGURATION.TextDarkBlack,
                  width: '60%',
                }}>
                {item.attachments[0].original_filename}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  checkPermission(item.attachments[0].url);
                }}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: CONFIGURATION.primaryGreen,
                }}>
                <Image
                  style={{height: 15, width: 15}}
                  source={require('./../assetss/Download.png')}
                />
              </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: CONFIGURATION.TextRegular,
                    color: CONFIGURATION.TextDarkGray,
                    fontSize: 12,
                  }}>
                  250Kb - 2:25 PM
                </Text>
              </View>
              <Icon
                name="checkmark-done"
                size={15}
                color={CONFIGURATION.TextDarkGray}
              />
            </View>
            {loading ? 
              <ProgressView></ProgressView>
              : null }
          </View>
        );
      }
    }

    return (
      <View
        style={{
          width: width / 2 + 50,
          backgroundColor: CONFIGURATION.messageBack,
          marginVertical: 10,
          borderTopLeftRadius: 20,
          marginRight: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: 20,
          alignSelf: 'flex-end',
        }}>
        {item.body ? (
          <Text style={{fontFamily: CONFIGURATION.TextRegular}}>
            {item.body}
          </Text>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: CONFIGURATION.TextRegular,
              color: CONFIGURATION.TextDarkGray,
              fontSize: 10,
            }}>
            {getMessageTime()}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="checkmark-done"
              size={15}
              color={CONFIGURATION.TextDarkGray}
            />
          </View>
        </View>
      </View>
    );
  }
};

export default Chat;
