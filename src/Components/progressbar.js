import React ,{useState}from 'react'
import { View, Text,TouchableOpacity,Dimensions } from 'react-native'
import CONFIGURATION from './../Components/Config/index'
import Icon from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const TopTab = (props) => {
    return (
        <View style={{justifyContent:"center",marginLeft:10}}>
            <View style={{height:9,width:windowWidth/3,backgroundColor:CONFIGURATION.lightGray,borderRadius:25}}>
            <View style={{height:9,width:((windowWidth/3)*props.width)/100,backgroundColor:props.color,borderRadius:25,}}></View>
            </View>
        </View>
    )
}

export default TopTab