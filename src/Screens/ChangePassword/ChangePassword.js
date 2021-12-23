import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import CONFIGURATION from '../../Components/Config';
import GeneralStatusBar from './../../Components/GeneralStatusBar';
import Button from './../../Components/Button';
import ProgressView from '../../Components/ProgressView';
const {height, width} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import SVG from './../../Components/SVG/ResetPass';
import Toast from 'react-native-simple-toast';
import {APPContext} from '../../Context/AppProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = props => {
  const {changeNewPassword} = useContext(APPContext);
  const [newPassword, setnewPassword] = useState('');
  const [oldPassword, setoldPassword] = useState('');
  const [email, setemail] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangePassword = async () => {
    AsyncStorage.getItem('login_user_email', (err, result) => {
      if (result) {
        setemail(result);
        // console.log("email_local "+ result );
      }
    });

    if (!oldPassword) {
      Toast.show('Please enter old password');
    } else if (!newPassword) {
      Toast.show('Please enter new password');
    }
    // else if (newPassword != confirmPassword) {
    //     Toast.show('New password & confirm password does not match')
    // }
    else {
      setLoading(true);
      const result = await changeNewPassword(email, oldPassword, newPassword);
      setLoading(false);
      //console.log('changeNewPassword', result);
      if (result.data && result.data.data.updateUserPassword != null) {
        setTimeout(() => {
          Toast.show('Password Changed Successfully.', 2000);
          props.navigation.goBack();
        }, 100);
      } else {
        Toast.show('Old password is incorrect.', 2000);
      }
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <GeneralStatusBar
          backgroundColor={CONFIGURATION.statusbarColor}
          barStyle="light-content"
        />
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={style.backarrView}>
          <Image
            resizeMode={'contain'}
            source={require('./../../assetss/backArr.png')}
            style={style.backArr}
          />
        </TouchableOpacity>
        <ScrollView>
          <View style={style.imageView}>
            <SVG />
          </View>
          <Text style={style.forgottext}>Change password</Text>
          <Text style={style.des}>
            Please enter your old password and new password
          </Text>
          <View style={style.mainView}>
            <View
              style={[
                style.InputBox,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <TextInput
                style={[style.textInput, {width: '80%'}]}
                placeholder="Old Password"
                placeholderTextColor={CONFIGURATION.loginpalceholder}
                secureTextEntry={true}
                onChangeText={text => {
                  setoldPassword(text);
                }}
              />
              {/* <Icon name="eye" size={18} color={CONFIGURATION.loginIconeye} /> */}
            </View>
            <View
              style={[
                style.InputBox,
                {flexDirection: 'row', alignItems: 'center', marginTop: 15},
              ]}>
              <TextInput
                style={[style.textInput, {width: '80%'}]}
                placeholder="New Password"
                placeholderTextColor={CONFIGURATION.loginpalceholder}
                secureTextEntry={true}
                onChangeText={text => {
                  setnewPassword(text);
                }}
              />
              {/* <Icon name="eye" size={18} color={CONFIGURATION.loginIconeye} /> */}
            </View>
          </View>
        </ScrollView>
        <View>
          <Button
            onPress={() => {
              onChangePassword();
            }}
            btnText={'Confirm'}
          />
        </View>
        {loading && <ProgressView />}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONFIGURATION.white,
  },
  backArr: {
    height: 25,
    width: 25,
  },
  backarrView: {
    marginHorizontal: 20,
    marginVertical: 50,
  },
  imageView: {
    height: width / 4,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgottext: {
    fontFamily: CONFIGURATION.TextBold,
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20,
    marginTop: 50,
    color: CONFIGURATION.TextDarkBlack,
  },
  des: {
    fontFamily: CONFIGURATION.TextRegular,
    color: CONFIGURATION.TextDarkGray,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  InputBox: {
    borderColor: CONFIGURATION.loginInputBorder,
    borderWidth: 1,
    height: 44,
  },
  textInput: {
    marginHorizontal: 20,
    fontFamily: CONFIGURATION.TextRegular,
  },
  mainView: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  btnView: {
    position: 'absolute',
    bottom: 60,
  },
});

export default ChangePassword;
