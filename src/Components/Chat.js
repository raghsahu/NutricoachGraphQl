import React, { useContext } from 'react';
import { View, Text, Dimensions, ImageBackground, Image } from 'react-native';

//CONSTANT & CONFIG
const { height, width } = Dimensions.get('screen');
import CONFIGURATION from './Config';

// PACKAGES
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

//CONTEXT
import { AuthContext } from '../Context/AuthProvider';

const Chat = props => {

  const { authDetails } = useContext(AuthContext);

  let loginId =
    authDetails &&
      authDetails.data &&
      authDetails.data.logInCoach &&
      authDetails.data.logInCoach.id
      ? authDetails.data.logInCoach.id
      : '';

  const item = props.item

  function getMessageTime() {
    Moment.locale('en');
    var localDate = new Date(item.createdAt);
    return Moment(localDate).format('DD MMM, yyyy hh:mm a')

  }

  if (item.from.id == loginId) {
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
        <Text style={{ fontFamily: CONFIGURATION.TextRegular }}>
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
          <View style={{ flexDirection: 'row' }}>
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
  else {
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
        <Text style={{ fontFamily: CONFIGURATION.TextRegular }}>
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
          <View style={{ flexDirection: 'row' }}>
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
