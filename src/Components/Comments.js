import React, {useContext} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import CONFIGURATION from './Config';
const {height, width} = Dimensions.get('screen');
import Moment from 'moment';
//CONTEXT
import {AuthContext} from '../Context/AuthProvider';

const Comments = props => {
  const item = props.item;
  const {authDetails} = useContext(AuthContext);

  let loginId =
    authDetails &&
    authDetails.data &&
    authDetails.data.logInCoach &&
    authDetails.data.logInCoach.id
      ? authDetails.data.logInCoach.id
      : '';

  //   function getImage() {
  //     if (item && item.profile) {
  //       return item.profile.profileImg == '' ? null : item.profile.profileImg
  //     }
  //     else {
  //       return null
  //     }
  //   }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: CONFIGURATION.lightGray,
        borderBottomWidth: 1,
        paddingVertical: 20,
      }}>
      <Image
        style={{
          height: 60,
          width: 60,
          borderRadius: 60 / 2,
        }}
        source={{
          uri: 'https://images.squarespace-cdn.com/content/v1/5ceafa407824f80001793b84/1617145105645-4JQVM5BOCNU2XD62M3UM/modal-verbs-passive-past.jpg',
        }}
      />
      <View style={{width: '77%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: CONFIGURATION.TextBold,
              fontSize: 18,
              color: CONFIGURATION.TextDarkBlack,
            }}>
            Jaeremy gaurkau
          </Text>
          <Text
            style={{
              fontFamily: CONFIGURATION.TextRegular,
              fontSize: 12,
              color: CONFIGURATION.TextDarkGray,
            }}>
            12:20 PM
          </Text>
        </View>
        <Text
          style={{
            fontFamily: CONFIGURATION.TextRegular,
            color: CONFIGURATION.TextDarkGray,
            marginVertical: 5,
          }}>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Image
            style={{height: 20, width: 20}}
            source={require('../assetss/replay.png')}
          />
          <Text
            style={{
              fontFamily: CONFIGURATION.TextBold,
              color: CONFIGURATION.TextDarkBlack,
              fontSize: 12,
            }}>
            {' '}
            Reply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;
