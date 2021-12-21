import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image, TouchableOpacity, Modal, FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CONFIGURATION from '../../Components/Config'
import GeneralStatusBar from './../../Components/GeneralStatusBar'
import style from './style'
import Icon from 'react-native-vector-icons/Entypo'
const { height, width } = Dimensions.get("screen")
import Pie from 'react-native-pie'
import LinearGradient from 'react-native-linear-gradient';
import moment, { months } from 'moment'
import TodayAppoinment from './../../Components/TodayAppointment'
import Calender from './../../Components/Calender'
const index = () => {
    const [Dates, setDates] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [month, setmonth] = useState(moment(new Date()).format("MMMM, YYYY"))
    const [addMonth, setaddMonth] = useState(0)
    const [fixDate, setfixDate] = useState("")
    useEffect(() => {
        var dateObj = moment(month, "MMMM, YYYY").daysInMonth()
        setaddMonth(dateObj)
        var dates = []
        for (var i = 1; i <= dateObj; i++) {
            dates.push(i)
        }
        setDates(dates)
        console.log('====================================');
        console.log(dates);
        console.log('====================================');
    }, [month])

    return (
        <View style={style.container}>
            <GeneralStatusBar backgroundColor={CONFIGURATION.statusbarColor} barStyle="light-content" />
            <LinearGradient colors={[CONFIGURATION.lightYellow, CONFIGURATION.DarkYellow]} style={style.yellowView}>
                <View style={style.menuView}>
                    <TouchableOpacity onPress={() => { setModalVisible(!modalVisible); }}>
                        <Image resizeMode={"contain"} style={style.menuIcon} source={require('./../../assetss/menu.png')} />
                    </TouchableOpacity>
                    <Text style={style.titleText}>Dashboard</Text>
                    <TouchableOpacity style={style.bellBg}>
                        <Image resizeMode={"contain"} style={style.bellIcon} source={require('./../../assetss/bell.png')} />
                        <View style={style.whiteBg}>
                            <View style={style.greenBg}></View>
                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <View style={style.whiteView}>
                <View style={style.profileView}>
                    <View style={style.chartView}>
                        <Pie
                            radius={36}
                            innerRadius={34}
                            sections={[
                                {
                                    percentage: 70,
                                    color: CONFIGURATION.primaryGreen,
                                },
                            ]}
                            backgroundColor="#ddd"

                        />
                        <Image style={style.profileImage} source={{ uri: "https://image.freepik.com/foto-gratis/senora-elegantes-pantalones-mezclilla-top-rayado-posando-espacio-naranja-disparo-cuerpo-entero-chica-pelirroja_197531-15326.jpg" }} />
                    </View>
                    <View style={style.centersView}>
                        <Text style={style.perText}>75%</Text>
                        <Text style={style.completeProfileText}>Complete your profile</Text>
                    </View>
                    <Icon name="chevron-right" size={25} color={CONFIGURATION.TextDarkGray} style={{ marginRight: 10, }} />
                </View>
                <ScrollView style={{ marginTop: 60 }}>
                    <View style={style.cardView}>
                        <View style={style.card}>
                            <Image resizeMode={"cover"} style={style.cardBgImage} source={require("./../../assetss/card_bg_1.png")} />
                            <View style={[style.cardround, { backgroundColor: CONFIGURATION.primaryGreen, }]}>
                                <Image resizeMode={"contain"} style={style.cardImage} source={require('./../../assetss/card_1.png')} />
                            </View>
                            <Text style={style.numbetTextr}>05 <Text style={style.numbertext}>/10</Text></Text>
                            <Text style={style.titleCardText}>New Clients this

                                month</Text>
                        </View>
                        <View style={style.card}>
                            <Image resizeMode={"cover"} style={style.cardBgImage} source={require("./../../assetss/card_bg_2.png")} />
                            <View style={[style.cardround, { backgroundColor: CONFIGURATION.primaryYellow, }]}>
                                <Image resizeMode={"contain"} style={style.cardImage} source={require('./../../assetss/card_2.png')} />
                            </View>
                            <Text style={style.numbetTextr}>10</Text>
                            <Text style={style.titleCardText}>Struggling Clients</Text>
                        </View>
                    </View>
                    <View style={[style.cardView, { paddingBottom: 15, }]}>
                        <View style={style.card}>
                            <Image resizeMode={"cover"} style={style.cardBgImage} source={require("./../../assetss/card_bg_3.png")} />
                            <View style={[style.cardround, { backgroundColor: CONFIGURATION.primaryBlue, }]}>
                                <Image resizeMode={"contain"} style={style.cardImage} source={require('./../../assetss/card_3.png')} />
                            </View>
                            <Text style={style.numbetTextr}>20</Text>
                            <Text style={style.titleCardText}>Ending Clients this
                                month</Text>
                        </View>
                        <View style={style.card}>
                            <Image resizeMode={"cover"} style={style.cardBgImage} source={require("./../../assetss/card_bg_4.png")} />
                            <View style={[style.cardround, { backgroundColor: CONFIGURATION.primaryRed, }]}>
                                <Image resizeMode={"contain"} style={style.cardImage} source={require('./../../assetss/card_4.png')} />
                            </View>
                            <Text style={style.numbetTextr}>12</Text>
                            <Text style={style.titleCardText}>Pending App Invites</Text>
                        </View>
                    </View>
                    <View style={style.dateMainView}>
                        {/* <Calender /> */}
                        {/* <View style={[style.rowss, { marginVertical: 20, }]}>
                            <View style={style.boxDate2}>
                                <Text style={{ fontFamily: CONFIGURATION.TextBold, fontSize: 16, color: CONFIGURATION.white }}>{moment(new Date()).format("DD")}</Text>
                                <Text style={{ fontFamily: CONFIGURATION.TextRegular, fontSize: 14, color: CONFIGURATION.white }}>{moment(new Date()).format("ddd")}</Text>
                            </View>
                            <View style={style.boxDate}>
                                <Text style={{ fontFamily: CONFIGURATION.TextBold, fontSize: 16, color: CONFIGURATION.TextDarkGray }}>{moment(new Date()).add("days", 1).format("DD")}</Text>
                                <Text style={{ fontFamily: CONFIGURATION.TextRegular, fontSize: 14, color: CONFIGURATION.TextDarkGray }}>{moment(new Date()).add("days", 1).format("ddd")}</Text>
                            </View>
                            <View style={style.boxDate}>
                                <Text style={{ fontFamily: CONFIGURATION.TextBold, fontSize: 16, color: CONFIGURATION.TextDarkGray }}>{moment(new Date()).add("days", 2).format("DD")}</Text>
                                <Text style={{ fontFamily: CONFIGURATION.TextRegular, fontSize: 14, color: CONFIGURATION.TextDarkGray }}>{moment(new Date()).add("days", 2).format("ddd")}</Text>
                            </View>
                            <View style={style.boxDate}>
                                <Text style={{ fontFamily: CONFIGURATION.TextBold, fontSize: 16, color: CONFIGURATION.TextDarkGray }}>{moment(new Date()).add("days", 3).format("DD")}</Text>
                                <Text style={{ fontFamily: CONFIGURATION.TextRegular, fontSize: 14, color: CONFIGURATION.TextDarkGray }}>{moment(new Date()).add("days", 3).format("ddd")}</Text>
                            </View>
                            <View style={style.boxDate}>
                                <Text style={{ fontFamily: CONFIGURATION.TextBold, fontSize: 16, color: CONFIGURATION.TextDarkGray }}>{moment(new Date()).add("days", 4).format("DD")}</Text>
                                <Text style={{ fontFamily: CONFIGURATION.TextRegular, fontSize: 14, color: CONFIGURATION.TextDarkGray }}>{moment(new Date()).add("days", 4).format("ddd")}</Text>
                            </View>
                            <View style={style.boxDate}>
                                <Text style={{ fontFamily: CONFIGURATION.TextBold, fontSize: 16, color: CONFIGURATION.TextDarkGray }}>{moment(new Date()).add("days", 5).format("DD")}</Text>
                                <Text style={{ fontFamily: CONFIGURATION.TextRegular, fontSize: 14, color: CONFIGURATION.TextDarkGray }}>{moment(new Date()).add("days", 5).format("ddd")}</Text>
                            </View>
                        </View> */}
                        {/* <Text style={[style.dateText, { marginHorizontal: 20, }]}>On-going Appointment</Text>
                        <View style={style.ongoingApp}>
                            <View style={style.appView}>
                                <Image resizeMode={"cover"} style={style.imagesa} source={{ uri: "https://images.unsplash.com/photo-1612904372219-885abc44dfa8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZlbWFsZSUyMG1vZGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" }} />
                                <View style={{ width: "60%" }}>
                                    <Text style={{ fontSize: 18, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkBlack }}>Today  |  10:00 PM</Text>
                                    <Text style={{ fontSize: 14, fontFamily: CONFIGURATION.TextRegular, color: CONFIGURATION.TextDarkGray }}>Leo Westervelt</Text>
                                </View>
                                <Image style={{ height: 30, width: 30 }} source={require("./../../assetss/more.png")} />
                            </View>
                            <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between" }}>
                                <TouchableOpacity style={{ borderColor: CONFIGURATION.btnColorGreen, borderWidth: 1, height: 50, width: "48%", borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <Image style={{ height: 25, width: 25 }} source={require("./../../assetss/camera.png")} />
                                    <Text style={{ fontSize: 16, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.primaryGreen, marginLeft: 10, }}>Video Call</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: CONFIGURATION.btnColorGreen, height: 50, width: "48%", borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.white, marginLeft: 10, }}>Start</Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}
                        <Text style={[style.dateText, { marginHorizontal: 20, marginTop: 10, }]}>Struggling Clients</Text>
                        <TodayAppoinment />
                        <TodayAppoinment />
                    </View>
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={style.centeredView}>
                        <View style={{ width: width - 40, backgroundColor: CONFIGURATION.white, borderRadius: 10, overflow: "hidden" }}>
                            <View style={[style.appView, { borderBottomWidth: 0, padding: 20, }]}>
                                <Image resizeMode={"cover"} style={style.imagesa} source={{ uri: "https://images.unsplash.com/photo-1612904372219-885abc44dfa8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZlbWFsZSUyMG1vZGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" }} />
                                <View style={{ width: "75%" }}>
                                    <Text style={{ fontSize: 16, fontFamily: CONFIGURATION.TextRegular, color: CONFIGURATION.TextDarkBlack }}>Hello,</Text>
                                    <Text style={{ fontSize: 18, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkBlack }}>Haylie Schleifer</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", borderColor: CONFIGURATION.loginInputBorder, borderTopWidth: 0.5, borderBottomWidth: 1 }}>
                                <View style={{ height: width / 2 - 20, width: width / 2 - 20, backgroundColor: CONFIGURATION.white, borderColor: CONFIGURATION.loginInputBorder, borderRightWidth: 1, alignItems: "center", justifyContent: "center" }}>
                                    <Image source={require('./../../assetss/Support.png')} resizeMode={"contain"} style={{ height: 50, width: 50 }} />
                                    <Text style={{ fontSize: 18, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkBlack, marginTop: 15 }}>Support</Text>

                                </View>
                                <View style={{ height: width / 2 - 20, width: width / 2 - 20, backgroundColor: CONFIGURATION.white, alignItems: "center", justifyContent: "center" }}>
                                    <Image source={require('./../../assetss/New.png')} resizeMode={"contain"} style={{ height: 50, width: 50 }} />
                                    <Text style={{ fontSize: 18, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkBlack, marginTop: 15 }}>What's New</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", borderColor: CONFIGURATION.loginInputBorder, borderTopWidth: 1, borderBottomWidth: 0.5 }}>
                                <View style={{ height: width / 2 - 20, width: width / 2 - 20, backgroundColor: CONFIGURATION.white, borderColor: CONFIGURATION.loginInputBorder, borderRightWidth: 1, alignItems: "center", justifyContent: "center" }}>
                                    {/* <Image source={require('./../../assetss/Billing.png')} resizeMode={"contain"} style={{ height: 50, width: 50 }} />
                                    <Text style={{ fontSize: 18, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkBlack, marginTop: 15 }}>Billing</Text> */}
                                </View>
                                <View style={{ height: width / 2 - 20, width: width / 2 - 20, backgroundColor: CONFIGURATION.white, alignItems: "center", justifyContent: "center" }}>
                                    {/* <Image source={require('./../../assetss/Setting.png')} resizeMode={"contain"} style={{ height: 50, width: 50 }} />
                                    <Text style={{ fontSize: 18, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkBlack, marginTop: 15 }}>Settings</Text> */}
                                </View>
                            </View>
                            <TouchableOpacity style={{ paddingVertical: 30, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 16, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.primaryRed }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => {
                            setModalVisible(!modalVisible);
                        }} style={{ marginVertical: 20 }}>
                            <Image resizeMode={"contain"} source={require("./../../assetss/close.png")} style={{ height: 50, width: 50 }} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default index
