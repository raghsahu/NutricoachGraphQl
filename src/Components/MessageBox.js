import React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import CONFIGURATION from './Config';
const { height, width } = Dimensions.get('screen');
import Moment from 'moment';

const MessageBox = props => {
  const item = props.item

  function getImage() {
    if (item && item.profile) {
      return item.profile.profileImg == '' ? null : item.profile.profileImg
    }
    else {
      return null
    }
  }

  function getUnreadCount() {
    if (item && item.unreadMessages && item.unreadMessages.length > 0) {
      return item.unreadMessages.length
    }
    else {
      return ""
    }
  }

  function getLastMessage() {
    if (item && item.unreadMessages && item.unreadMessages.length > 0) {
      const array = item.unreadMessages.map((item) => item.body)
      return array[0] //get latest unread message
    }
    else {
      return "No message"
    }
  }

  function getLastMessageTime() {
    Moment.locale('en');
    if (item && item.unreadMessages && item.unreadMessages.length > 0) {
      const array = item.unreadMessages.map((item) => item.createdAt)
      var localDate = new Date(array[0]);
      return Moment(localDate).format('hh:mm a')
    }
    else {
      return ""
    }
  }


  return (
    <TouchableOpacity
      onPress={props.click}
      style={{
        width: width - 40,
        marginVertical: 5,
        backgroundColor: CONFIGURATION.white,
        marginHorizontal: 20,
        elevation: 2,
      }}>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {/* <Image
          resizeMode={'cover'}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50 / 2,
          }}
          source={{
            uri: 'https://images.unsplash.com/photo-1612904372219-885abc44dfa8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZlbWFsZSUyMG1vZGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
          }}
        /> */}
        <Image
          resizeMode={"cover"}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50 / 2
          }} source={getImage() ? { uri: getImage() } : null} />

        <View style={{ width: '50%' }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontFamily: CONFIGURATION.TextBold,
              color: CONFIGURATION.TextDarkBlack,
            }}>
            {props.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              fontFamily: CONFIGURATION.TextRegular,
              color: CONFIGURATION.TextDarkGray,
            }}>
            {getLastMessage()}
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            width: '30%',
            alignItems: 'flex-end',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: CONFIGURATION.TextRegular,
              color: CONFIGURATION.TextDarkGray,
            }}>
            {getLastMessageTime()}
          </Text>

          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 20 / 2,
              backgroundColor: getUnreadCount() == '' ? null : CONFIGURATION.primaryGreen,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <Text
              style={{
                fontFamily: CONFIGURATION.TextBold,
                color: CONFIGURATION.white,
              }}>
              {getUnreadCount()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageBox;
