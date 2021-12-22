import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Modal, TextInput, StatusBar, Dimensions } from 'react-native'
const { height, width } = Dimensions.get("screen")

import { AuthContext } from '../../Context/AuthProvider'


import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Splash(props) {

    const { setLoggedInUser } = useContext(AuthContext);


    useEffect(() => {
        AsyncStorage.getItem('login_user_details', (err, result) => {
            if (result) {
                let obj = JSON.parse(result)
                setLoggedInUser(obj)
                setTimeout(() => {
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'Home' }
                            ],
                        })
                    );
                }, 3000);

            } else {
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Login', params: { isFromLogin: true } }
                        ],
                    })
                );
            }
        })

    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
            <View style={styles.logoView}>
                <Image resizeMode={"contain"} source={require("./../../assetss/logo.png")} style={styles.Mainlogo} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    logoView: {
        height: width / 3,
        width: width,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    Mainlogo: {
        height: width / 2 - 50,
        width: width - 80,
    },
})

export default Splash