import React, { useEffect } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import CONFIGURATION from './Config/index'
const { height, width } = Dimensions.get("screen")
import Moment from 'moment';

const TodayAppointment = (props) => {

    const item = props.item

    useEffect(() => {
        getPlans()
        return () => { }
    }, [])

    function getPlans() {
        if (item && item.plans && item.plans.length > 0) {
            const array = item.plans.map((item) => item.name)
            return array.join(',')
        }
        else {
            return ""
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
            var date1 = new Date(Moment().format('MM/DD/YYYY'));
            var date2 = new Date(Moment(item.lastActivity).format('MM/DD/YYYY'));
            // To calculate the time difference of two dates
            var Difference_In_Time = date1.getTime() - date2.getTime();
            // To calculate the no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            return Difference_In_Days
            //return item.lastActivity == '' ? '' : Moment(item.lastActivity).format('d MMM, YYYY | hh:mm a')
        }
        else {
            return "0"
        }
    }

    return (
         <TouchableOpacity
      onPress={props.click}
      style={{
       width: width - 40,
            marginHorizontal: 20,
            elevation: 2,
            marginVertical: 5,
            backgroundColor: CONFIGURATION.white,
            borderColor: CONFIGURATION.loginInputBorder,
            borderWidth: 0.5,
      }}>
        <View style={{
            // width: width - 40,
            // marginHorizontal: 20,
            // elevation: 2,
            // marginVertical: 5,
            // backgroundColor: CONFIGURATION.white,
            // borderColor: CONFIGURATION.loginInputBorder,
            // borderWidth: 0.5,
        }}>
            <View style={{
                padding: 10,
                borderColor: CONFIGURATION.loginInputBorder,
                borderBottomWidth: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Image resizeMode={"cover"}
                    style={{
                        height: 70,
                        width: 70,
                        borderRadius: 70 / 2,
                        backgroundColor: '#f2f2f2'
                    }}
                    source={getImage() ? { uri: getImage() } : null} />
                <View style={{ width: "60%" }}>
                    <Text style={{ fontSize: 18, fontFamily: CONFIGURATION.TextBold, color: CONFIGURATION.TextDarkBlack }}>{item.profile ? item.profile.fullName : ""}</Text>
                    <Text style={{ fontSize: 14, fontFamily: CONFIGURATION.TextRegular, color: CONFIGURATION.TextDarkGray }}>Last Activity was {getLastActivity()} days ago</Text>
                </View>
                <Image style={{ height: 30, width: 30 }} source={require("./../assetss/more.png")} />
            </View>
        </View>
         </TouchableOpacity>
    )
}

export default TodayAppointment
