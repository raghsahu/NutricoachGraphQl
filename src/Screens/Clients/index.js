import React from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import CONFIGURATION from '../../Components/Config'
import GeneralStatusBar from './../../Components/GeneralStatusBar'
import LinearGradient from 'react-native-linear-gradient';
import style from './style';
import ClientsBox from '../../Components/ClientsBox';

const DATA = [{new:"1",name:"Jaeremy gaurkau"},{new:"0",name:"Dulce Passaquindici"},{new:"0",name:"Randy Workman"},{new:"1",name:"Rayna Aminoff"},{new:"1",name:"Jaeremy gaurkau"},]

const { height, width } = Dimensions.get("screen")

const index = () => {
    return (
        <View style={style.container}>
            <GeneralStatusBar backgroundColor={CONFIGURATION.statusbarColor} barStyle="light-content" />
            <LinearGradient colors={[CONFIGURATION.lightYellow, CONFIGURATION.DarkYellow]} style={style.yellowView}>
                <View style={style.menuView}>
                    <View style={{ width: 35 }}></View>
                    <Text style={style.titleText}>Clients</Text>
                    <TouchableOpacity style={style.bellBg}>
                        <Image resizeMode={"contain"} style={style.bellIcon} source={require('./../../assetss/Download.png')} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <View style={style.whiteView}>
                <View style={style.profileView}>
                    <Image source={require("./../../assetss/Search.png")} style={style.searchIcoN} />
                    <TextInput
                        style={{ width: "80%", fontFamily: CONFIGURATION.TextRegular }}
                        placeholder="Search Client"
                        placeholderTextColor={CONFIGURATION.loginpalceholder}
                    />
                    <Image source={require("./../../assetss/Filter.png")} style={style.searchIcoN} />
                </View>
                <FlatList
                    data={DATA}
                    style={{marginTop: 35,}}
                    renderItem={({item})=>{
                        return(
                            <ClientsBox name={item.name} new={item.new}/>
                        )
                    }}
                    keyExtractor={item => item.id}
                />
            </View>
            <TouchableOpacity style={{position:"absolute",bottom:20,right:20}}>
                <Image resizeMode={"contain"} style={{height:50,width:50}} source={require('./../../assetss/add.png')}/>
            </TouchableOpacity>
        </View>
    )
}

export default index
