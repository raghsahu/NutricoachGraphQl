import React, { useEffect } from 'react'
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import CONFIGURATION from './Config'
const { height, width } = Dimensions.get("screen")
import Moment from 'moment';

const ClientsBox = (props) => {
    const item = props.item

    useEffect(() => {
        getPlans()
        return () => { }
    }, [])

    function getPlans() {
         let lastCurrentPlan = 'No plan';
        if (item && item.plans && item.plans.length > 0) {
            lastCurrentPlan = item.plans[item.plans.length - 1].name;
           // const array = item.plans.map((item) => item.name)
            return lastCurrentPlan; //display only current meal plan means in the array last position item .
        }
        else {
            return "No plan"
        }
    }

    function getImage() {
        if (item && item.profile) {
            return item.profile.profileImg == '' ? null : item.profile.profileImg
        }
        else {
            return null
        }
    }

    function getLastActivity() {
        Moment.locale('en');
        if (item && item.lastActivity) {
            {/* 5 Jun, 2021 | 5:00 am */ }
            return item.lastActivity == '' ? '' : Moment(item.lastActivity).format('d MMM, YYYY | hh:mm a')
        }
        else {
            return ""
        }
    }


    return (
        <TouchableOpacity
            onPress={props.click}
            style={{
                width: width - 40, marginVertical: 5, backgroundColor: CONFIGURATION.white, marginHorizontal: 20, elevation: 2
            }}>
            <View
            //  style={{ width: width - 40, marginVertical: 5, backgroundColor: CONFIGURATION.white, marginHorizontal: 20, elevation: 2 }}
            >
                <View style={{
                    padding: 20,
                    borderColor: getPlans() != 'No plan' ? CONFIGURATION.loginInputBorder : CONFIGURATION.white,
                    borderBottomWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "space-between",
                }}>
                    <Image resizeMode={"cover"} style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2
                    }} source={getImage() ? { uri: getImage() } : null} />
                    <View style={{ width: "60%", marginLeft: 20 }}>
                        <Text numberOfLines={1} style={{ fontSize: 16, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkBlack }}>{item.profile ? item.profile.fullName : ""}</Text>
                        {getPlans() != 'No plan' &&
                            <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: CONFIGURATION.TextRegular, color: CONFIGURATION.TextDarkGray }}>{getPlans()}</Text>
                        }

                    </View>
                    {/* {
                    props.new == "1" ?
                <View style={{padding: 10,backgroundColor:CONFIGURATION.lightGreen,borderRadius:10}}>
                    <Text style={{fontFamily: CONFIGURATION.TextBold,color:CONFIGURATION.primaryGreen}}>Active</Text>
                </View>
                :
                <View style={{padding: 10,backgroundColor:CONFIGURATION.lightOrenge,borderRadius:10}}>
                    <Text style={{fontFamily: CONFIGURATION.TextBold,color:CONFIGURATION.DarkYellow}}>New</Text>
                </View>
                } */}
                </View>
                {getPlans() != 'No plan' ?
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 20 }}>
                        <Text style={{ fontSize: 16, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkGray }}>Last Activity :</Text>
                        <Text style={{ fontSize: 16, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkBlack }}>{getLastActivity()}</Text>
                    </View>
                    : null
                }

            </View>
        </TouchableOpacity>
    )
}

export default ClientsBox
