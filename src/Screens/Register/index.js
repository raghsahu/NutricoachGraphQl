import React, { useState, useRef, useContext } from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput, Platform, Alert } from 'react-native'
import CONFIGURATION from '../../Components/Config'
import GeneralStatusBar from './../../Components/GeneralStatusBar'
import style from './style'

import ProgressView from '../../Components/ProgressView'
import Button from './../../Components/Button'
const { height, width } = Dimensions.get("screen")
import Icon from "react-native-vector-icons/AntDesign"
import Icon2 from "react-native-vector-icons/Feather"
import { ScrollView } from 'react-native-gesture-handler'

//CONTEXT
import { APPContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider'

//PACKAGES
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-simple-toast";
import { assertLeafType } from 'graphql'
import { CommonActions } from '@react-navigation/native';

const index = (props) => {

    const { register } = useContext(APPContext);
    const { setLoggedInUser } = useContext(AuthContext);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [show2, setshow2] = useState(true)
    const refRBSheet = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();
    const ref_input6 = useRef();
    const ref_input7 = useRef();
    const [firstname, setFirstName] = useState('')
    const [lastname, setlastname] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [selectDate, setselectDate] = useState("")
    const [gender, setgender] = useState("")
    const [mobile, setMobile] = useState('')
    const [referalCode, setReferalCode] = useState('')
    const [isLoading, setLoading] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setselectDate(moment(currentDate).format("DD-MM-YYYY"))
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const onRegister = async () => {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!firstname.trim()) {
            Toast.show('Please enter first name', 5000)
        } else if (!lastname.trim()) {
            Toast.show('Please enter last name', 5000)
        } else if (!middleName.trim()) {
            Toast.show('Please enter middle name', 5000)
        } else if (!email.trim()) {
            Toast.show('Please enter email', 5000)
        } else if (reg.test(email) == false) {
            Toast.show('Please enter valid email', 5000)
        } else if (!password.trim()) {
            Toast.show('Please enter password', 5000)
        } else if (password.length < 6) {
            Toast.show('Password must contains 6 or more characters', 5000)
        } else if (!selectDate.trim()) {
            Toast.show('Please slect date', 5000)
        } else if (!mobile.trim()) {
            Toast.show('Please enter mobile number', 5000)
        } else {
            setLoading(true)
            const result = await register(firstname, lastname, middleName, email, password, selectDate, gender, mobile, referalCode)
            setLoading(false)
            console.log("RESULRvccsdcds", JSON.stringify(result))
            if (result.data.data && result.data.data.createCoach != null) {
                Alert.alert(
                    '',
                    'Thanks for you registration, log in here',
                    [
                        {
                            text: 'OK', onPress: () => props.navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [
                                        { name: 'Login' }
                                    ],
                                })
                            )
                        },
                    ]
                );
            } else {
                if (result.data.errors.length > 0) {
                    Toast.show(result.data.errors[0].message)
                } else {
                    Toast.show('Somthing went wrong')
                }
            }

        }
    }

    return (
        <View style={style.container}>
            <GeneralStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 20 }}>
                <TouchableOpacity onPress={() => {
                    props.navigation.goBack()
                }} style={style.backarrView}>
                    <Image resizeMode={"contain"} source={require("./../../assetss/backArr.png")} style={style.backArr} />
                </TouchableOpacity>
                <Text style={style.registerText}>Register</Text>
                <View style={{ width: 25 }}></View>
            </View>
            <ScrollView>
                <View style={style.mainView}>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center" }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="First Name*"
                            value={firstname}
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            onSubmitEditing={() => ref_input2.current.focus()}
                            onChangeText={(text) => {
                                if (text.length <= 30) {
                                    var RegExpression = /^[a-zA-Z\s]*$/;
                                    if (RegExpression.test(text)) {
                                        setFirstName(text)
                                    }
                                }
                            }}
                        />
                    </View>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15 }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Last Name*"
                            value={lastname}
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            onSubmitEditing={() => ref_input3.current.focus()}
                            ref={ref_input2}
                            onChangeText={(text) => {
                                if (text.length <= 30) {
                                    var RegExpression = /^[a-zA-Z\s]*$/;
                                    if (RegExpression.test(text)) {
                                        setlastname(text)
                                    }
                                }
                            }}
                        />
                    </View>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15 }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Middle Name*"
                            value={middleName}
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            onSubmitEditing={() => ref_input4.current.focus()}
                            ref={ref_input3}
                            onChangeText={(text) => {
                                if (text.length <= 30) {
                                    var RegExpression = /^[a-zA-Z\s]*$/;
                                    if (RegExpression.test(text)) {
                                        setMiddleName(text)
                                    }
                                }
                            }}
                        />
                    </View>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15 }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Email*"
                            value={email}
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            onSubmitEditing={() => ref_input5.current.focus()}
                            ref={ref_input4}
                            onChangeText={(text) => {
                                setEmail(text)
                            }}
                        />
                    </View>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15, }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Password"
                            value={password}
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            secureTextEntry={show2}
                            onSubmitEditing={() => ref_input6.current.focus()}
                            ref={ref_input5}
                            onChangeText={(text) => {
                                setPassword(text)
                            }}
                        />
                        <TouchableOpacity onPress={() => { setshow2(!show2) }} style={{}}>
                            {
                                show2 ?
                                    <Icon2 name="eye" size={18} color={CONFIGURATION.loginIconeye} /> :
                                    <Icon2 name="eye-off" size={18} color={CONFIGURATION.loginIconeye} />
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={showDatepicker} style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15, }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Birthdate*"
                            value={selectDate}
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            editable={false}
                        />
                        <Icon name="calendar" size={18} color={CONFIGURATION.loginIconeye} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { refRBSheet.current.open() }} style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15, }]}>
                        <TextInput
                            style={[style.textInput, { width: "81%" }]}
                            placeholder="Select Gender*"
                            value={gender}
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            editable={false}
                        />
                        <Icon name="down" size={12} color={CONFIGURATION.loginIconeye} />
                    </TouchableOpacity>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15 }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Mobile Number"
                            keyboardType={"number-pad"}
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            onSubmitEditing={() => ref_input7.current.focus()}
                            ref={ref_input6}
                            value={mobile}
                            onChangeText={text => {
                                if (text.length <= 10) {
                                    var RegExpression = /^[0-9\s]*$/;
                                    if (RegExpression.test(text)) {
                                        setMobile(text)
                                    }
                                }
                            }}
                        />
                    </View>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15 }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Refferal Code"
                            value={referalCode}
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            ref={ref_input7}
                            onChangeText={(text) => {
                                setReferalCode(text)
                            }}
                        />
                    </View>
                </View>
                <View style={style.btnView}>
                    <Button onPress={onRegister} btnText={"Register"} />
                </View>
                <View style={{ height: 50 }} />
                {show && (
                    <DateTimePicker
                        style={{ backgroundColor: CONFIGURATION.primaryDark }}
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
                        backgroundColor: "#00000050"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <TouchableOpacity onPress={() => { setgender("MALE"); refRBSheet.current.close() }} style={{ borderRadius: 5, borderWidth: 1, borderColor: CONFIGURATION.loginInputBorder, marginHorizontal: 20, paddingHorizontal: 20, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontFamily: CONFIGURATION.TextRegular }}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setgender("FEMALE"); refRBSheet.current.close() }} style={{ borderRadius: 5, borderWidth: 1, borderColor: CONFIGURATION.loginInputBorder, marginHorizontal: 20, paddingHorizontal: 20, paddingVertical: 10, marginTop: 15 }}>
                    <Text style={{ fontSize: 15, fontFamily: CONFIGURATION.TextRegular }}>Female</Text>
                </TouchableOpacity>
            </RBSheet>
            {isLoading && <ProgressView />}
        </View>
    )
}

export default index
