import React from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import CONFIGURATION from './Config'
const { height, width } = Dimensions.get("screen")

const ClientsBox = (props) => {
    return (
        <View  style={{width:width-40,marginVertical: 5,backgroundColor:CONFIGURATION.white,marginHorizontal: 20,elevation:2}}>
            <View style={{
                padding: 20,
                borderColor: CONFIGURATION.loginInputBorder,
                borderBottomWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <Image resizeMode={"cover"} style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50 / 2
                }} source={{ uri: "https://images.unsplash.com/photo-1612904372219-885abc44dfa8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZlbWFsZSUyMG1vZGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" }} />
                <View style={{ width: "60%" }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkBlack }}>{props.name}</Text>
                    <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: CONFIGURATION.TextRegular, color: CONFIGURATION.TextDarkGray }}>AR Fitness Health Club</Text>
                </View>
                {
                    props.new == "1" ?
                <View style={{padding: 10,backgroundColor:CONFIGURATION.lightGreen,borderRadius:10}}>
                    <Text style={{fontFamily: CONFIGURATION.TextBold,color:CONFIGURATION.primaryGreen}}>Active</Text>
                </View>
                :
                <View style={{padding: 10,backgroundColor:CONFIGURATION.lightOrenge,borderRadius:10}}>
                    <Text style={{fontFamily: CONFIGURATION.TextBold,color:CONFIGURATION.DarkYellow}}>New</Text>
                </View>
                }
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:20,paddingVertical:20}}>
                <Text style={{fontSize:16,fontFamily:CONFIGURATION.TextBold,color:CONFIGURATION.TextDarkGray}}>Last Activity :</Text>
                <Text style={{fontSize:16,fontFamily:CONFIGURATION.TextBold,color:CONFIGURATION.TextDarkBlack}}>5 Jun, 2021 | 5:00 am</Text>
            </View>
        </View>
    )
}

export default ClientsBox
