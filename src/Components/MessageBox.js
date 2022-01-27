import React, {useContext} from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import CONFIGURATION from './Config';
const { height, width } = Dimensions.get('screen');
import Moment from 'moment';
//CONTEXT
import {AuthContext} from '../Context/AuthProvider';

const MessageBox = props => {
  const item = props.item;
  const {authDetails} = useContext(AuthContext);

  let loginId =
    authDetails &&
    authDetails.data &&
    authDetails.data.logInCoach &&
    authDetails.data.logInCoach.id
      ? authDetails.data.logInCoach.id
      : '';

  function getImage() {
    if (item && item.profile) {
      return item.profile.profileImg == '' ? null : item.profile.profileImg
    }
    else {
      return null
    }
  }

  function getUnreadCount() {
    let countMessage = 0;
    if (item && item.unreadMessages && item.unreadMessages.length > 0) {
      for (let i = 0; i < item.unreadMessages.length; i++) {
        if (item.unreadMessages[i].from.id != loginId) {
          if (item.unreadMessages[i].seenAt == null) {
            countMessage = countMessage + 1 
          }
              
        }
      }
    
      return countMessage
    }
    else {
      return ""
    }
  }

  function getLastMessage() {
    let lastMessage = 'No unread message';
    if (item && item.unreadMessages && item.unreadMessages.length > 0) {
       for (let i = 0; i < item.unreadMessages.length; i++) {
        if (item.unreadMessages[i].from.id != loginId) {
          lastMessage = item.unreadMessages[0].body
       }
      }
     // const array = item.unreadMessages.map((item) => item.body)
      return lastMessage //get last message
    }
    else {
      return "No unread message"
    }
  }

  function getLastMessageTime() {
     let lastUnreadTime = '';
    Moment.locale('en');
    if (item && item.unreadMessages && item.unreadMessages.length > 0) {
       for (let i = 0; i < item.unreadMessages.length; i++) {
        if (item.unreadMessages[i].from.id != loginId) {
          lastUnreadTime = item.unreadMessages[0].createdAt
       }
      }
     // const array = item.unreadMessages.map((item) => item.createdAt)
     // var localDate = new Date(array[0]);
      return lastUnreadTime ? Moment(new Date(lastUnreadTime)).format('hh:mm a') : ''
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
