import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, ImageBackground, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import CONFIGURATION from './Config'
import Icon from 'react-native-vector-icons/Entypo'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment'
const { height, width } = Dimensions.get("screen")

const Calender = (props) => {

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
        <>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 20,
            }}>
                <TouchableOpacity onPress={() => {
                    var monthS = moment(month, "MMMM, YYYY").subtract("month", 1).format("MMMM, YYYY")
                    setmonth(monthS)      
                }}>
                    <Icon name="chevron-left" size={25} color={CONFIGURATION.TextDarkBlack} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    props.onClick(month)                    
                }}>
                <Text style={{
                    fontFamily: CONFIGURATION.TextBold,
                    color: CONFIGURATION.TextDarkBlack,
                    fontSize: 18
                }}>{month}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    var monthS = moment(month, "MMMM, YYYY").add("month", 1).format("MMMM, YYYY")
                    setmonth(monthS)
                }}>
                    <Icon name="chevron-right" size={25} color={CONFIGURATION.TextDarkBlack} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={Dates}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: 20, marginVertical: 10 }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            setfixDate(item + " " + month);
                        }} style={{
                            height: 70,
                            width: width / 6 - 13,
                            backgroundColor: item + " " + month == fixDate ? CONFIGURATION.btnColorGreen : CONFIGURATION.lightGray,
                            marginHorizontal: 2,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{ fontFamily: CONFIGURATION.TextBold, fontSize: 16, color: item + " " + month == fixDate ? CONFIGURATION.white : CONFIGURATION.TextDarkGray }}>{item}</Text>
                            <Text style={{ fontFamily: CONFIGURATION.TextRegular, fontSize: 14, color: item + " " + month == fixDate ? CONFIGURATION.white : CONFIGURATION.TextDarkGray }}>{moment(item + month).format("ddd")}</Text>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item.id}
            />
        </>
    )
}

export default Calender
