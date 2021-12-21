import React from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native'
import CONFIGURATION from '../../Components/Config'
import GeneralStatusBar from './../../Components/GeneralStatusBar'
import style from './style'
import Button from './../../Components/Button'
const { height, width } = Dimensions.get("screen")
import Icon from "react-native-vector-icons/AntDesign"
import { ScrollView } from 'react-native-gesture-handler'
import SVG from './../../Components/SVG/ResetPass'
const index = (props) => {
    return (
        <View style={style.container}>
            <GeneralStatusBar backgroundColor={CONFIGURATION.statusbarColor} barStyle="light-content" />
            <ScrollView>
            <TouchableOpacity onPress={() => {
                props.navigation.goBack()
            }} style={style.backarrView}>
                <Image resizeMode={"contain"} source={require("./../../assetss/backArr.png")} style={style.backArr} />
            </TouchableOpacity>
            <View style={style.imageView}>
                <SVG/>
            </View>
            <Text style={style.forgottext}>Reset password</Text>
            <Text style={style.des}>Please enter your registered email we will{`\n`}
                sent you reset password link</Text>
                <View style={style.mainView}>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center" }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="New Password"
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            secureTextEntry={true}
                        />
                        {/* <Icon name="eye" size={18} color={CONFIGURATION.loginIconeye} /> */}
                    </View>
                    <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15, }]}>
                        <TextInput
                            style={[style.textInput, { width: "80%" }]}
                            placeholder="Confirm Password"
                            placeholderTextColor={CONFIGURATION.loginpalceholder}
                            secureTextEntry={true}
                        />
                        {/* <Icon name="eye" size={18} color={CONFIGURATION.loginIconeye} /> */}
                    </View>
                </View>
                </ScrollView>
            <View style={style.btnView}>
                <Button btnText={"Confirm"} />
            </View>
        </View>
    )
}

export default index
