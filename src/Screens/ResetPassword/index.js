import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import CONFIGURATION from '../../Components/Config';
import GeneralStatusBar from './../../Components/GeneralStatusBar';
import style from './style';
import Button from './../../Components/Button';
import ProgressView from '../../Components/ProgressView';
const {height, width} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import SVG from './../../Components/SVG/ResetPass';
import Toast from 'react-native-simple-toast';
import {APPContext} from '../../Context/AppProvider';

const index = props => {
  const {resetNewPassword} = useContext(APPContext);
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

   const onResetPassword = async () => {
         if (!newPassword) {
            Toast.show('Please enter new password')
        } else if (!confirmPassword) {
            Toast.show('Please enter confirm password')
        }   else {
            setLoading(true)
            const result = await resetNewPassword(newPassword)
            setLoading(false)
            console.log("resetNewPassword", result)
            if (result.data && result.data.data.resetPassword != null) {
               
                      setTimeout(() => {
                 // props.navigation.navigate("ResetPassword")
                }, 100);
             
              
            } else {
                Toast.show(result.error, 2000);
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
          <Text style={style.forgottext}>Reset password</Text>
          <Text style={style.des}>
            Please enter your registered email we will{`\n`}
            sent you reset password link
          </Text>
          <View style={style.mainView}>
            <View
              style={[
                style.InputBox,
                {flexDirection: 'row', alignItems: 'center'},
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
            <View
              style={[
                style.InputBox,
                {flexDirection: 'row', alignItems: 'center', marginTop: 15},
              ]}>
              <TextInput
                style={[style.textInput, {width: '80%'}]}
                placeholder="Confirm Password"
                placeholderTextColor={CONFIGURATION.loginpalceholder}
                secureTextEntry={true}
                onChangeText={text => {
                  setconfirmPassword(text);
                }}
              />
              {/* <Icon name="eye" size={18} color={CONFIGURATION.loginIconeye} /> */}
            </View>
          </View>
        </ScrollView>
        <View>
          <Button
            onPress={() => {
              onResetPassword();
            }}
            btnText={'Confirm'}
          />
        </View>
        {loading && <ProgressView />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
