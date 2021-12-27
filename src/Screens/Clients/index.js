import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator } from 'react-native'
import CONFIGURATION from '../../Components/Config'
import GeneralStatusBar from './../../Components/GeneralStatusBar'
import LinearGradient from 'react-native-linear-gradient';
import style from './style';
import ClientsBox from '../../Components/ClientsBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
//CONTEXT 
import { APPContext } from '../../Context/AppProvider'

const DATA = [{ new: "1", name: "Jaeremy gaurkau" }, { new: "0", name: "Dulce Passaquindici" }, { new: "0", name: "Randy Workman" }, { new: "1", name: "Rayna Aminoff" }, { new: "1", name: "Jaeremy gaurkau" },]

const { height, width } = Dimensions.get("screen")

const index = () => {
    const { getClients } = useContext(APPContext)
    const [isLoading, setLoading] = useState(true)
    const [client, setClient] = useState([])

   useEffect(() => {
        getClientData()
        return () => { }
    }, [])

    async function getClientData() {
        const result = await getClients()
        setLoading(false)
        //console.log("client_list "+ result.data.data.me.customers)
        if (result && result.data && result.data.data && result.data.data.me) {
            setClient(result.data.data.me.customers)
        }
    }

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

                 {isLoading ?
                            <View style={{ height: 100, justifyContent: 'center' }}>
                                <ActivityIndicator style={{ alignSelf: 'center' }} />
                            </View>
                            :
                            <>
                                {client.map((item, index) => {
                                    
                                })}
                  <FlatList
                    data={client}
                    style={{ marginTop: 35, }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <ClientsBox item={item} />
                        )
                   }}>
                  </FlatList>
              </>
              }
            </View>
            <TouchableOpacity style={{ position: "absolute", bottom: 20, right: 20 }}>
                <Image resizeMode={"contain"} style={{ height: 50, width: 50 }} source={require('./../../assetss/add.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default index
