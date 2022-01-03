import React from 'react';
import {View, Text, Dimensions, ImageBackground, Image} from 'react-native';
import CONFIGURATION from './Config';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('screen');
import Moment from 'moment';

const Chat = props => {
       const item = props.item

       function getMessageTime() {
        Moment.locale('en');
           var localDate = new Date(item.createdAt);
            return  Moment(localDate).format('DD MMM, yyyy hh:mm a')
    
    }

  return (
    <>
      <ScrollView>
        {/* <View
          style={{
            width: width / 2 + 50,
            backgroundColor: CONFIGURATION.messageBack,
            marginLeft: 20,
            marginVertical: 10,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            padding: 20,
          }}>
          <Text style={{fontFamily: CONFIGURATION.TextRegular}}>
            Does anyone know where I can find the reading due today?
          </Text>
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
              2:25 PM
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="checkmark-done"
                size={15}
                color={CONFIGURATION.TextDarkGray}
              />
              <Text
                style={{
                  fontFamily: CONFIGURATION.TextRegular,
                  color: CONFIGURATION.TextDarkGray,
                  fontSize: 12,
                }}>
                R
              </Text>
            </View>
          </View>
        </View> */}
         {props.selectedChannel === item.channel ? 
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
         
          <Text style={{fontFamily: CONFIGURATION.TextRegular}}>
          {item.body}
          </Text>
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
              {/* <Text
                style={{
                  fontFamily: CONFIGURATION.TextRegular,
                  color: CONFIGURATION.TextDarkGray,
                  fontSize: 12,
                }}>
                R
              </Text> */}
            </View>
          </View>
        </View>

        : null}

        {/* <View
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
            }}
            imageStyle={{borderRadius: 20}}
            source={{
              uri: 'https://miro.medium.com/max/653/1*sk2TA810bDbkU_nvoHK5pQ.png',
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
              00:19
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
              250Kb - 2:25 PM
            </Text>
          </View>
        </View> */}
        {/* <View
          style={{
            width: width / 2 + 80,
            backgroundColor: CONFIGURATION.messageBack,
            marginRight: 20,
            marginVertical: 10,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            padding: 5,
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
              uri: 'https://miro.medium.com/max/653/1*sk2TA810bDbkU_nvoHK5pQ.png',
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
              00:19
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
              250Kb - 2:25 PM
            </Text>
          </View>
        </View> */}
        {/* <View
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
              Diet plan.pdf
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
        <View
          style={{
            width: width / 2 + 80,
            backgroundColor: CONFIGURATION.lightGreen,
            marginRight: 20,
            marginVertical: 10,
            borderTopLeftRadius: 20,
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
              Diet plan.pdf
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
        </View> */}
      </ScrollView>
    </>
  );
};

export default Chat;
