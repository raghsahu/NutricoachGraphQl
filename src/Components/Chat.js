import React, {useContext} from 'react';
import {View, Text, Dimensions, ImageBackground, Image} from 'react-native';

//CONSTANT & CONFIG
const {height, width} = Dimensions.get('screen');
import CONFIGURATION from './Config';

// PACKAGES
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

//CONTEXT
import {AuthContext} from '../Context/AuthProvider';

const Chat = props => {
  const {authDetails} = useContext(AuthContext);

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

  // async function getThumbnail(uri) {
  //   // uri is the local path of the video
  //   try {
  //     RNThumbnail.get(uri).then((result) => {
  //        console.log("Thumbnail path: " + result.path); // thumbnail path
  //       // this.setState({ thumbUri: result.path });
  //         return result.path
  //     });
  //   } catch (exp) {
  //     console.log(exp);
  //     return '';
  //   }
  // }

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
          </View>
        );
        }else{
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
              source={{uri: item.attachments[0].secure_url}}></ImageBackground>
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
            }}>
            <ImageBackground
              style={{
                height: width / 2,
                width: width / 2 + 70,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000000',             
              }}
              imageStyle={{borderRadius: 20, opacity:0.4}}
              source={{uri: ' ' }}
              >
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
              <View
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
                }}>
                <Image
                  style={{height: 15, width: 15}}
                  source={require('./../assetss/Download.png')}
                />
              </View>
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
          </View>
        );
      }
    }

    return (
      <View
        style={{
          width: width / 2 + 50,
          backgroundColor: CONFIGURATION.messageBack,
          marginRight: 20,
          marginVertical: 10,
          borderTopLeftRadius: 20,
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
  } else {
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
          </View>
        );
        }else{
      return (
          <View
            style={{
              width: width / 2 + 80,
              backgroundColor: CONFIGURATION.messageBack,
              marginLeft: 20,
              marginVertical: 10,
              borderRadius: 20,
              padding: 5,
              overflow: 'hidden',
            }}>
            <ImageBackground
              style={{
                height: width / 2,
                width: width / 2 + 70,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              imageStyle={{borderRadius: 20}}
              source={{uri: item.attachments[0].secure_url}}>

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
            }}>
            <ImageBackground
              style={{
                height: width / 2,
                width: width / 2 + 70,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000000',             
              }}
              imageStyle={{borderRadius: 20, opacity:0.4}}
              source={{uri: ' ' }}
              >
           
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
              <View
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
                }}>
                <Image
                  style={{height: 15, width: 15}}
                  source={require('./../assetss/Download.png')}
                />
              </View>
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
          borderTopLeftRadius: 20,
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
  }
};

export default Chat;
