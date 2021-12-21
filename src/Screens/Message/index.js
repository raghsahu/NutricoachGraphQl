import React from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import CONFIGURATION from '../../Components/Config'
import GeneralStatusBar from './../../Components/GeneralStatusBar'
import LinearGradient from 'react-native-linear-gradient';
import style from './style';
import MassageBox from '../../Components/MessageBox';

const DATA = [{ new: "5", name: "Jaeremy gaurkau",mess:"Please take a look at the powepoint" }, { new: "2", name: "Dulce Passaquindici",mess:"How are you ?" }, { new: "4", name: "Randy Workman",mess:"Does anyone know where i can find" }, { new: "", name: "Rayna Aminoff",mess:"Please take a look at the powepoint" }, { new: "", name: "Jaeremy gaurkau",mess:"Hiii..." },{ new: "5", name: "Jaeremy gaurkau",mess:"Please take a look at the powepoint" },]

const { height, width } = Dimensions.get("screen")

const index = (props) => {
    return (
        <View style={style.container}>
            <GeneralStatusBar backgroundColor={CONFIGURATION.statusbarColor} barStyle="light-content" />
            <LinearGradient colors={[CONFIGURATION.lightYellow, CONFIGURATION.DarkYellow]} style={style.yellowView}>
                <View style={style.menuView}>
                    <TouchableOpacity onPress={()=>{props.navigation.goBack()}} style={style.bellBg}>
                        <Image resizeMode={"contain"} style={style.bellIcon} source={require('./../../assetss/back.png')} />
                    </TouchableOpacity>

                    <Text style={style.titleText}>Message</Text>
                    <View style={{ width: 35 }}></View>
                </View>
            </LinearGradient>
            <View style={style.whiteView}>
                <View style={style.profileView}>
                    <Image source={require("./../../assetss/Search.png")} style={style.searchIcoN} />
                    <TextInput
                        style={{ width: "90%", fontFamily: CONFIGURATION.TextRegular }}
                        placeholder="Search Client"
                        placeholderTextColor={CONFIGURATION.loginpalceholder}
                    />
                </View>
                <FlatList
                    data={DATA}
                    style={{ marginTop: 35, }}
                    renderItem={({ item }) => {
                        return (
                            <MassageBox click={()=>{props.navigation.navigate("ChatView")}} mess={item.mess} name={item.name} new={item.new} />
                        )
                    }}
                    keyExtractor={item => item.id}
                />
            </View>
            {/* <TouchableOpacity style={{ position: "absolute", bottom: 20, right: 20 }}>
                <Image resizeMode={"contain"} style={{ height: 50, width: 50 }} source={require('./../../assetss/add.png')} />
            </TouchableOpacity> */}
        </View>
    )
}

export default index
