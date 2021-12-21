import React, { useState } from 'react'
import { View, Text, Dimensions, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import CONFIGURATION from '../../Components/Config'
import GeneralStatusBar from './../../Components/GeneralStatusBar'
import style from './style'
import Icon from "react-native-vector-icons/Feather"
import Button from '../../Components/Button'
const { height, width } = Dimensions.get("screen")

const index = (porps) => {
    const [show, setshow] = useState(false)
    return (
        <SafeAreaView style={style.container}>
            <GeneralStatusBar backgroundColor={CONFIGURATION.statusbarColor} barStyle="light-content" />
            <View style={style.logoView}>
                <Image resizeMode={"contain"} source={require("./../../assetss/logo.png")} style={style.Mainlogo} />
            </View>
            <Text style={style.welcomeText}>Welcome</Text>
            <Text style={style.textsty}>Please login to your account and
                continue with us</Text>
            <View style={style.mainView}>
                <View style={style.InputBox}>
                    <TextInput
                        style={style.textInput}
                        placeholder="Username"
                        placeholderTextColor={CONFIGURATION.loginpalceholder}
                    />
                </View>
                <View style={[style.InputBox, { flexDirection: "row", alignItems: "center", marginTop: 15, }]}>
                    <TextInput
                        style={[style.textInput, { width: "80%" }]}
                        placeholder="Password"
                        placeholderTextColor={CONFIGURATION.loginpalceholder}
                        secureTextEntry={show}
                    />
                    <TouchableOpacity onPress={() => { setshow(!show) }} style={{}}>
                        {
                            show ?
                                <Icon name="eye" size={18} color={CONFIGURATION.loginIconeye} /> :
                                <Icon name="eye-off" size={18} color={CONFIGURATION.loginIconeye} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => {
                porps.navigation.navigate("ForgotPassword")
            }}>
                <Text style={style.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={{ flex: 1.0 }}></View>
            <View style={style.btnView}>
                <Button onPress={() => { porps.navigation.navigate("Home") }} btnText={"Login"} />
                <TouchableOpacity onPress={() => {
                    porps.navigation.navigate("Register")
                }} style={{ marginVertical: 20, }}>
                    <Text style={style.textregi}>Don’t have an account?<Text style={{ color: CONFIGURATION.yellow }}> Register</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default index
