import React, { useState,useRef } from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import CONFIGURATION from '../../Components/Config'
import GeneralStatusBar from './../../Components/GeneralStatusBar'
import style from './style'
import Button from './../../Components/Button'
const { height, width } = Dimensions.get("screen")
import Icon from "react-native-vector-icons/AntDesign"
import Icon2 from "react-native-vector-icons/Feather"
import { ScrollView } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"
import RBSheet from "react-native-raw-bottom-sheet";

const index = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selectDate, setselectDate] = useState("")
    const [gender, setgender] = useState("")
    const [show2, setshow2] = useState(true)
    const refRBSheet = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();
    const ref_input6 = useRef();
    const ref_input7 = useRef();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        //console.log(moment(currentDate).format("DD-MM-YYYY"));
        setselectDate(moment(currentDate).format("DD-MM-YYYY"))
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={style.container}>
            <ScrollView>
                <GeneralStatusBar backgroundColor={CONFIGURATION.statusbarColor} barStyle="light-content" />
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 20 }}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.goBack()
                    }} style={style.backarrView}>
                        <Image resizeMode={"contain"} source={require("./../../assetss/backArr.png")} style={style.backArr} />
                    </TouchableOpacity>
                    <Text style={style.registerText}>Register</Text>
                    <View style={{ width: 25 }}></View>
                </View>
                <View style={style.mainView}>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center" }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="First Name*"
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            onSubmitEditing={() => ref_input2.current.focus()}
                        />
                    </View>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15 }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Last Name*"
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            onSubmitEditing={() => ref_input3.current.focus()}
                            ref={ref_input2}
                        />
                    </View>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15 }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Middle Name*"
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            onSubmitEditing={() => ref_input4.current.focus()}
                            ref={ref_input3}
                        />
                    </View>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15 }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Email*"
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            onSubmitEditing={() => ref_input5.current.focus()}
                            ref={ref_input4}
                        />
                    </View>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15, }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Password"
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            secureTextEntry={show2}
                            onSubmitEditing={() => ref_input6.current.focus()}
                            ref={ref_input5}
                        />
                       <TouchableOpacity onPress={()=>{setshow2(!show2)}} style={{}}>
                            {
                                show2 ? 
                                <Icon2 name="eye" size={18} color={CONFIGURATION.loginIconeye} />:
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
                    <TouchableOpacity onPress={()=>{refRBSheet.current.open()}} style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15, }]}>
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
                        />
                    </View>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15 }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Refferal Code"
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            ref={ref_input7}
                        />
                    </View>
                </View>
                <View style={style.btnView}>
                    <Button btnText={"Register"} />
                </View>
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
                height={height/6}
                customStyles={{
                    wrapper: {
                        backgroundColor: "#00000050"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <TouchableOpacity onPress={()=>{setgender("Male");refRBSheet.current.close()}} style={{borderRadius:5,borderWidth:1,borderColor:CONFIGURATION.loginInputBorder,marginHorizontal:20,paddingHorizontal:20,paddingVertical:10}}>
                    <Text style={{fontSize:15,fontFamily:CONFIGURATION.TextRegular}}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setgender("Female");refRBSheet.current.close()}} style={{borderRadius:5,borderWidth:1,borderColor:CONFIGURATION.loginInputBorder,marginHorizontal:20,paddingHorizontal:20,paddingVertical:10,marginTop:15}}>
                    <Text style={{fontSize:15,fontFamily:CONFIGURATION.TextRegular}}>Female</Text>
                </TouchableOpacity>
            </RBSheet>
        </View>
    )
}

export default index
