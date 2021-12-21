import React from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import CONFIGURATION from './Config'
const { height, width } = Dimensions.get("screen")

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{height:60,width:width-40,backgroundColor: CONFIGURATION.btnColorGreen,marginHorizontal: 20,borderRadius:50,alignItems:"center",justifyContent:"center",zIndex:10}}>
            <Text style={{fontFamily:CONFIGURATION.TextBold,color:CONFIGURATION.white,fontSize:16}}>{props.btnText}</Text>
        </TouchableOpacity>
    )
}

export default Button
