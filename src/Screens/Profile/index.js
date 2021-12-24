import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CONFIGURATION from '../../Components/Config';
import GeneralStatusBar from './../../Components/GeneralStatusBar';
import style from './style';
import Icon from 'react-native-vector-icons/Entypo';
import ProgressView from '../../Components/ProgressView';
const {height, width} = Dimensions.get('screen');
import Pie from 'react-native-pie';
import LinearGradient from 'react-native-linear-gradient';
import moment, {months} from 'moment';
import TodayAppoinment from './../../Components/TodayAppointment';
import Calender from './../../Components/Calender';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APPContext} from '../../Context/AppProvider';

const index = (props) => {
    const [fullName, setFullName] = useState('')
    const [mobile, setMobile] = useState('+21 92505 32010')
   // const [loading, setLoading] = useState(false);
    const {getUserProfile} = useContext(APPContext);

    useEffect(() => {
         AsyncStorage.getItem('login_user_details', (err, result) => {
            if (result) {
                let obj = JSON.parse(result)
             //id  610a670d8b19f845efde959f
            } else {
            }
        })

        getProfile();

    })


 const getProfile = async () => {

     // setLoading(true);
      const result = await getUserProfile("610a670d8b19f845efde959f");
     // setLoading(false);
      //console.log('changeNewPassword', result);
      if (result.data && result.data.data.user != null) {
        setTimeout(() => {
          

        }, 100);
      } else {
        
       // Toast.show('Old password is incorrect.', 2000);
      }
    
  };


  return (
    <View style={style.container}>
      <GeneralStatusBar
        backgroundColor={CONFIGURATION.statusbarColor}
        barStyle="light-content"
      />
      <LinearGradient
        colors={[CONFIGURATION.lightYellow, CONFIGURATION.DarkYellow]}
        style={style.yellowView}>
        <View style={style.menuView}>
          <TouchableOpacity onPress={() => {}}></TouchableOpacity>
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
            <Image
              style={{height: 70, width: 70}}
              source={require('./../../assetss/menss.png')}
            />
            <View>
              <Text style={{fontFamily: CONFIGURATION.TextBold, fontSize: 18}}>
                   {fullName}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 15, width: 15}}
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
                style={{height: 15, width: 15}}
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
            onPress={() => {props.navigation.navigate("MyProfile")}}
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
                style={{height: 25, width: 25}}
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
              style={{height: 15, width: 15}}
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
            onPress={() => {props.navigation.navigate("ChangePassword")}}
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
                style={{height: 25, width: 25}}
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
              style={{height: 15, width: 15}}
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
                style={{height: 25, width: 25}}
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
              style={{height: 15, width: 15}}
              source={require('./../../assetss/Vector.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* {loading && <ProgressView />} */}
    </View>
  );
};

export default index;
