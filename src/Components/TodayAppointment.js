import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import CONFIGURATION from './Config/index'
const { height, width } = Dimensions.get("screen")

const TodayAppointment = () => {
    return (
        <View style={{
            width: width - 40,
            marginHorizontal: 20,
            elevation: 2,
            marginVertical: 5,
            backgroundColor: CONFIGURATION.white,
            borderColor: CONFIGURATION.loginInputBorder,
            borderWidth: 0.5,
        }}>
            <View style={{
                padding: 10,
                borderColor: CONFIGURATION.loginInputBorder,
                borderBottomWidth: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Image resizeMode={"cover"} style={{
                    height: 70,
                    width: 70,
                    borderRadius: 70 / 2
                }} source={{ uri: "https://images.unsplash.com/photo-1612904372219-885abc44dfa8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZlbWFsZSUyMG1vZGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" }} />
                <View style={{ width: "60%" }}>
                    <Text style={{ fontSize: 18, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkBlack }}>Erin George</Text>
                    <Text style={{ fontSize: 14, fontFamily: CONFIGURATION.TextRegular, color: CONFIGURATION.TextDarkGray }}>Diabetic Diet Plan</Text>
                </View>
                <Image style={{ height: 30, width: 30 }} source={require("./../assetss/more.png")} />
            </View>
        </View>
    )
}

export default TodayAppointment
