import React from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native'
import CONFIGURATION from '../../Components/Config'
import GeneralStatusBar from './../../Components/GeneralStatusBar'
import style from './style'
import Button from './../../Components/Button'
import { ScrollView } from 'react-native-gesture-handler'
const { height, width } = Dimensions.get("screen")

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
                <Image resizeMode={"contain"} source={require("./../../assetss/ForgotPass.png")} style={style.imageView} />
            </View>
            <Text style={style.forgottext}>Forgot password?</Text>
            <Text style={style.des}>Please enter your registered email we will{`\n`}
                sent you reset password link</Text>
            <View style={style.InputBox}>
                <TextInput
                    style={style.textInput}
                    placeholder="Enter Email"
                    placeholderTextColor={CONFIGURATION.loginpalceholder}
                />
            </View>
            <View style={style.btnView}>
                <Button onPress={()=>{props.navigation.navigate("ResetPassword")}} btnText={"Proceed"} />
            </View>
            </ScrollView>
        </View>
    )
}

export default index
