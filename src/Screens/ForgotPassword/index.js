import React , { useState, useContext }from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput, SafeAreaView, Alert } from 'react-native'
import CONFIGURATION from '../../Components/Config'
import GeneralStatusBar from './../../Components/GeneralStatusBar'
import style from './style'
import ProgressView from '../../Components/ProgressView'
import Button from './../../Components/Button'
import { ScrollView } from 'react-native-gesture-handler'
const { height, width } = Dimensions.get("screen")
import { APPContext } from '../../Context/AppProvider'
import Toast from "react-native-simple-toast";
import { CommonActions } from '@react-navigation/native';

const index = (props) => {
    const { forgot } = useContext(APPContext);
    const [email, setEmail] = useState('Schuster.Adrian@yahoo.com');
    const [loading, setLoading] = useState(false)

    const onForgot = async () => {
         if (!email) {
            Toast.show('Please enter email')
        }  else {
            setLoading(true)
            const result = await forgot(email)
            setLoading(false)
            console.log("ForgotEmail", result)
            if (result.data && result.data.data.forgotPassword != null) {
                if (result.data.data.forgotPassword == true) {
                      setTimeout(() => {
                   Alert.alert(
                    '',
                    'Check your email for reset password link.',
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
                }, 100);
                }
              
            } else {
                Toast.show(result.error, 2000);
            }

        }

    };

    return (
        <SafeAreaView style={style.container}>
        <ScrollView>
            <GeneralStatusBar backgroundColor={CONFIGURATION.statusbarColor} barStyle="light-content" />
           
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
                    value={email}
                    placeholderTextColor={CONFIGURATION.loginpalceholder}
                    onChangeText={text => {
                     setEmail(text);
              }}
                />
            </View>
            <View style={style.btnView}>
                <Button onPress={()=>{
                     onForgot();
                    }} 
                    btnText={"Proceed"} />
            </View>
          {loading && <ProgressView />}
          </ScrollView>
        </SafeAreaView>
    )
}

export default index
