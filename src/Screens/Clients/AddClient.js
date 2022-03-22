import React, {useState, useRef, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import CONFIGURATION from '../../Components/Config';
import GeneralStatusBar from './../../Components/GeneralStatusBar';

import ProgressView from '../../Components/ProgressView';
import Button from './../../Components/Button';
import CheckBox from './../../Components/CheckBox';
const {height, width} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';

//CONTEXT
import {APPContext} from '../../Context/AppProvider';
import {AuthContext} from '../../Context/AuthProvider';

//PACKAGES
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import Toast from 'react-native-simple-toast';

const AddClient = props => {
  const {createNewClient} = useContext(APPContext);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [show2, setshow2] = useState(true);
  const refRBSheet = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const [firstname, setFirstName] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState(null);
  const [selectDate, setselectDate] = useState('');
  const [gender, setgender] = useState('');
  const [mobile, setMobile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setselectDate(moment(currentDate).format('YYYY-MM-DD'));
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onUpdate = async () => {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!firstname.trim()) {
      Toast.show('Please enter first name', 5000);
    } else if (!lastname.trim()) {
      Toast.show('Please enter last name', 5000);
    } else if (!selectDate.trim()) {
      Toast.show('Please select date', 5000);
    } else if (!gender.trim()) {
      Toast.show('Please select gender', 5000);
    } else {
      let number = '+1' + mobile;
      setLoading(true);
      const result = await createNewClient(
        firstname,
        lastname,
        email,
        selectDate,
        gender,
        number,
        isSelected,
      );
      setLoading(false);
      console.log('RESULRvccsdcds', JSON.stringify(result));
      if (result.data.data && result.data.data.createClient.client != null) {
        Alert.alert('', 'New client added successfully', [
          {
            text: 'OK',
            onPress: () => props.navigation.goBack(),
          },
        ]);
      } else {
        if (result.data.data.createClient.errors != null) {
          Toast.show(result.data.data.createClient.errors[0].path +' '+ result.data.data.createClient.errors[0].message);
        } else {
          Toast.show('Something went wrong');
        }
      }
    }
  };

  const setCheck = checkStatus => {
    setSelection(checkStatus);
  };

  return (
    <View style={style.container}>
      <GeneralStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
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
        <Text style={style.registerText}>Add a new client</Text>
        <View style={{width: 25}}></View>
      </View>
      <ScrollView>
        <View style={style.mainView}>
          <View
            style={[
              style.InputBox,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <TextInput
              style={[style.textInput, {width: '80%'}]}
              placeholder="First Name*"
              value={firstname}
              placeholderTextColor={CONFIGURATION.loginpalceholder}
              onSubmitEditing={() => ref_input2.current.focus()}
              onChangeText={text => {
                if (text.length <= 30) {
                  var RegExpression = /^[a-zA-Z\s]*$/;
                  if (RegExpression.test(text)) {
                    setFirstName(text);
                  }
                }
              }}
            />
          </View>
          <View
            style={[
              style.InputBox,
              {flexDirection: 'row', alignItems: 'center', marginTop: 15},
            ]}>
            <TextInput
              style={[style.textInput, {width: '80%'}]}
              placeholder="Last Name*"
              value={lastname}
              placeholderTextColor={CONFIGURATION.loginpalceholder}
              onSubmitEditing={() => ref_input3.current.focus()}
              ref={ref_input2}
              onChangeText={text => {
                if (text.length <= 30) {
                  var RegExpression = /^[a-zA-Z\s]*$/;
                  if (RegExpression.test(text)) {
                    setlastname(text);
                  }
                }
              }}
            />
          </View>

          <View
            style={[
              style.InputBox,
              {flexDirection: 'row', alignItems: 'center', marginTop: 15},
            ]}>
            <TextInput
              style={[style.textInput, {width: '80%'}]}
              placeholder="Email"
              value={email}
              placeholderTextColor={CONFIGURATION.loginpalceholder}
              onSubmitEditing={() => ref_input4.current.focus()}
              ref={ref_input3}
              onChangeText={text => {
                setEmail(text);
              }}
            />
          </View>

          <View
            style={[
              style.InputBox,
              {flexDirection: 'row', alignItems: 'center', marginTop: 15},
            ]}>
            <TextInput
              style={[style.textInput, {width: '80%'}]}
              placeholder="Mobile Number"
              keyboardType={'number-pad'}
              placeholderTextColor={CONFIGURATION.loginpalceholder}
              // onSubmitEditing={() => ref_input6.current.focus()}
              ref={ref_input4}
              value={mobile}
              onChangeText={text => {
                if (text.length <= 10) {
                  var RegExpression = /^[0-9\s]*$/;
                  if (RegExpression.test(text)) {
                    setMobile(text);
                  }
                }
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}
            style={[
              style.InputBox,
              {flexDirection: 'row', alignItems: 'center', marginTop: 15},
            ]}>
            <TextInput
              style={[style.textInput, {width: '81%'}]}
              placeholder="Select Gender*"
              value={gender}
              placeholderTextColor={CONFIGURATION.loginpalceholder}
              editable={false}
            />
            <Icon name="down" size={12} color={CONFIGURATION.loginIconeye} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={showDatepicker}
            style={[
              style.InputBox,
              {flexDirection: 'row', alignItems: 'center', marginTop: 15},
            ]}>
            <TextInput
              style={[style.textInput, {width: '80%'}]}
              placeholder="Birthdate*"
              value={selectDate}
              placeholderTextColor={CONFIGURATION.loginpalceholder}
              editable={false}
            />
            <Icon
              name="calendar"
              size={18}
              color={CONFIGURATION.loginIconeye}
            />
          </TouchableOpacity>

          <CheckBox
            isSelected={isSelected}
            text={'Invite the client to use the mobile app'}
            onChecked={setCheck}
          />
        </View>
        <View style={style.btnView}>
          <Button onPress={onUpdate} btnText={'Add Client'} />
        </View>
        <View style={{height: 50}} />
        {show && (
          <DateTimePicker
            style={{backgroundColor: CONFIGURATION.primaryDark}}
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={height / 4}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000050',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <TouchableOpacity
          onPress={() => {
            setgender('MALE');
            refRBSheet.current.close();
          }}
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: CONFIGURATION.loginInputBorder,
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 15, fontFamily: CONFIGURATION.TextRegular}}>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setgender('FEMALE');
            refRBSheet.current.close();
          }}
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: CONFIGURATION.loginInputBorder,
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginTop: 15,
          }}>
          <Text style={{fontSize: 15, fontFamily: CONFIGURATION.TextRegular}}>
            Female
          </Text>
        </TouchableOpacity>
      </RBSheet>
      {isLoading && <ProgressView />}
    </View>
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
    marginVertical: 50,
  },
  imageView: {
    height: width / 4,
    width: width,
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
  },
  textInput: {
    marginHorizontal: 20,
    fontFamily: CONFIGURATION.TextRegular,
    color: CONFIGURATION.TextDarkBlack,
    height: 44,
  },
  mainView: {
    marginHorizontal: 20,
  },
  btnView: {
    marginTop: 50,
  },
  registerText: {
    fontFamily: CONFIGURATION.TextBold,
    fontSize: 25,
  },
});

export default AddClient;
