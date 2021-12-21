import React from 'react'
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import CONFIGURATION from './Config'
const { height, width } = Dimensions.get("screen")

const MessageBox = (props) => {
    return (
        <TouchableOpacity onPress={props.click} style={{ width: width - 40, marginVertical: 5, backgroundColor: CONFIGURATION.white, marginHorizontal: 20, elevation: 2 }}>
            <View style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <Image resizeMode={"cover"} style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50 / 2
                }} source={{ uri: "https://images.unsplash.com/photo-1612904372219-885abc44dfa8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZlbWFsZSUyMG1vZGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" }} />
                <View style={{ width: "55%" }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkBlack }}>{props.name}</Text>
                    <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: CONFIGURATION.TextRegular, color: CONFIGURATION.TextDarkGray }}>{props.mess}</Text>
                </View>
                <View style={{ padding: 10, borderRadius: 10, width: "25%", alignItems: "flex-end" }}>
                    <Text style={{fontSize:12,fontFamily:CONFIGURATION.TextRegular,color:CONFIGURATION.TextDarkGray}}>12:00 Pm</Text>
                    <View style={{ height: 20, width: 20, borderRadius: 20 / 2, backgroundColor: props.new == "" ? null : CONFIGURATION.primaryGreen, alignItems: "center", justifyContent: "center",marginTop:5 }}>
                        <Text style={{ fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.white }}>{props.new}</Text>
                    </View>

                </View>
            </View>

        </TouchableOpacity>
    )
}

export default MessageBox
