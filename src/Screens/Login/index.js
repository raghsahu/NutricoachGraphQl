import React, { useState, useContext } from 'react'
import { View, Text, Dimensions, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert, StatusBar } from 'react-native'
import CONFIGURATION from '../../Components/Config'
import GeneralStatusBar from './../../Components/GeneralStatusBar'
import ProgressView from '../../Components/ProgressView'
import style from './style'
import Icon from "react-native-vector-icons/Feather"
import Button from '../../Components/Button'

const { height, width } = Dimensions.get("screen")

//CONTEXT 
import { APPContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider'

// PACKAGES
import Toast from "react-native-simple-toast";
import { CommonActions } from '@react-navigation/native';


const index = (props) => {

    const { login } = useContext(APPContext);
    const { setLoggedInUser, setUserEmail } = useContext(AuthContext);

    const [show, setshow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('Schuster.Adrian@yahoo.com')
    const [password, setPassword] = useState('123456')

    const onPressLogin = async () => {
        if (!email) {
            Toast.show('Please enter email')
        } else if (!password) {
            Toast.show('Please enter password')
        } else {
            setLoading(true)
            const result = await login(email, password)
            setLoading(false)
          //  console.log("LoginUser", result)
            if (result.data && result.data.data.logInCoach != null) {
                setTimeout(() => {
                    setLoggedInUser(result.data)
                    setUserEmail(email)
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'Home' }
                            ],
                        })
                    );
                }, 100);
            } else {
                Toast.show('invalid credential', 2000);
            }

        }

    }

    return (
        <SafeAreaView style={style.container}>
            <GeneralStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
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
                        value={email}
                        placeholderTextColor={CONFIGURATION.loginpalceholder}
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
                        secureTextEntry={show}
                        onChangeText={(text) => {
                            setPassword(text)
                        }}
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
                props.navigation.navigate("ForgotPassword")
            }}>
                <Text style={style.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={{ flex: 1.0 }}></View>
            <View style={style.btnView}>
                <Button onPress={onPressLogin} btnText={"Login"} />
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate("Register")
                }} style={{ marginVertical: 20, }}>
                    <Text style={style.textregi}>Don’t have an account?<Text style={{ color: CONFIGURATION.yellow }}> Register</Text></Text>
                </TouchableOpacity>
            </View>
            {loading && <ProgressView />}
        </SafeAreaView>
    )
}

export default index
