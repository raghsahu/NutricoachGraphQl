import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import style from './style';

//ASSET & CONFIG
import CONFIGURATION from '../../Components/Config';

//COMMON COMPONENTS
import GeneralStatusBar from './../../Components/GeneralStatusBar';

//PACKAGES
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APPContext } from '../../Context/AppProvider';

const index = (props) => {

  const { getUserProfile } = useContext(APPContext);

  const [fullName, setFullName] = useState('')
  const [mobile, setMobile] = useState('***** *****')
  const [image, setImage] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('login_user_details', (err, result) => {
      if (result) {
        let obj = JSON.parse(result)
        console.log("auth_token "+ obj.data.logInCoach.token);

        let id = obj.data.logInCoach.id;
        if (id != null) {
          setId(id)
          getProfile();
        }
      } else {
      }
    })
  })


  const getProfile = async () => {
    const result = await getUserProfile(id);

    if (result && result.data && result.data.data.user != null) {
      setTimeout(() => {
        let full_name = result.data.data.user.profile.fullName;
        setFullName(full_name)

        let mobile_num = result.data.data.user.profile.mobileNum;
        if (mobile_num != null) {
          setMobile(mobile_num)
        }

        setImage(result.data.data.user.profile.profileImg)

      }, 100);
    } else {
      //Toast.show(result.error, 2000);
    }
  };


  return (
    // <ScrollView >
    <View style={style.container}>
      <GeneralStatusBar
        backgroundColor={CONFIGURATION.statusbarColor}
        barStyle="light-content"
      />
      <LinearGradient
        colors={[CONFIGURATION.lightYellow, CONFIGURATION.DarkYellow]}
        style={style.yellowView}>
        <View style={style.menuView}>
          <TouchableOpacity onPress={() => { }}></TouchableOpacity>
          <Text style={style.titleText}>My Profile</Text>
          <TouchableOpacity style={{}}></TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={style.whiteView}>
        <View style={style.profileView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
              marginHorizontal: 15,
              borderColor: CONFIGURATION.loginInputBorder,
              borderBottomWidth: 1,
              justifyContent: 'space-between',
              width: '91%',
            }}>
            <Image source={image == '' ? null : { uri: image }} style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#f2f2f2' }} />
            <View>
              <Text style={{ fontFamily: CONFIGURATION.TextBold, fontSize: 18 }}>
                {fullName}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ height: 15, width: 15 }}
                  source={require('./../../assetss/phone.png')}
                />
                <Text
                  style={{
                    fontFamily: CONFIGURATION.TextBold,
                    fontSize: 14,
                    color: CONFIGURATION.TextDarkGray,
                  }}>
                  {mobile}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderColor: CONFIGURATION.loginInputBorder,
                borderWidth: 1,
                borderRadius: 50,
                paddingVertical: 5,
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Image
                style={{ height: 15, width: 15 }}
                source={require('./../../assetss/verify.png')}
              />
              <Text
                style={{
                  fontFamily: CONFIGURATION.TextBold,
                  fontSize: 14,
                  color: CONFIGURATION.TextDarkGray,
                  marginLeft: 5,
                }}>
                Verify
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: CONFIGURATION.TextRegular,
              color: CONFIGURATION.TextDarkGray,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 170,
            backgroundColor: CONFIGURATION.white,
            elevation: 2,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: CONFIGURATION.loginInputBorder,
              borderBottomWidth: 1,
              paddingVertical: 15,
              marginHorizontal: 20,
              paddingHorizontal: 0,
              justifyContent: 'space-between',
            }}
            onPress={() => {
              // props.navigation.navigate("MyProfile") 
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50 / 2,
                backgroundColor: CONFIGURATION.lightGreen,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode={'contain'}
                style={{ height: 25, width: 25 }}
                source={require('./../../assetss/settings.png')}
              />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: CONFIGURATION.TextBold,
                width: '68%',
              }}>
              Personal Information
            </Text>
            <Image
              resizeMode={'contain'}
              style={{ height: 15, width: 15 }}
              source={require('./../../assetss/Vector.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: CONFIGURATION.loginInputBorder,
              borderBottomWidth: 1,
              paddingVertical: 15,
              marginHorizontal: 20,
              paddingHorizontal: 0,
              justifyContent: 'space-between',
            }}
            onPress={() => {
              // props.navigation.navigate("ChangePassword")
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50 / 2,
                backgroundColor: CONFIGURATION.lightGreen,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode={'contain'}
                style={{ height: 25, width: 25 }}
                source={require('./../../assetss/info.png')}
              />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: CONFIGURATION.TextBold,
                width: '68%',
              }}>
              Change Password
            </Text>
            <Image
              resizeMode={'contain'}
              style={{ height: 15, width: 15 }}
              source={require('./../../assetss/Vector.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: CONFIGURATION.loginInputBorder,
              borderBottomWidth: 1,
              paddingVertical: 15,
              marginHorizontal: 20,
              paddingHorizontal: 0,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50 / 2,
                backgroundColor: CONFIGURATION.lightGreen,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode={'contain'}
                style={{ height: 25, width: 25 }}
                source={require('./../../assetss/feed.png')}
              />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: CONFIGURATION.TextBold,
                width: '68%',
              }}>
              Send feedback
            </Text>
            <Image
              resizeMode={'contain'}
              style={{ height: 15, width: 15 }}
              source={require('./../../assetss/Vector.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* {loading && <ProgressView />} */}
    </View>
    // </ScrollView>
  );
};

export default index;
