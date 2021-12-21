import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import CONFIGURATION from '../../Components/Config'
import GeneralStatusBar from './../../Components/GeneralStatusBar'
const { height ,width } = Dimensions.get("screen")

const index = () => {
    return (
        <View>
           <GeneralStatusBar backgroundColor={CONFIGURATION.statusbarColor} barStyle="light-content" /> 
        </View>
    )
}

export default index
