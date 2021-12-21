import { StyleSheet, Dimensions } from "react-native";
const { height,width } = Dimensions.get("screen")
import CONFIGURATION from "./../../Components/Config/index";

export default StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:CONFIGURATION.homeBG
    },
    yellowView:{
      flex:0.2,
      borderBottomLeftRadius:40,
      borderBottomRightRadius:40,
      alignItems:"center",
      justifyContent:"center"
    },
    whiteView:{
      flex:0.8
    },
    profileView:{
      width:width-40,
      marginHorizontal:20,
      backgroundColor:CONFIGURATION.white,
      position:"absolute",
      top:-50,
      elevation:2,
      alignItems:"center",
      justifyContent:"space-between"
    },
    card:{
      width:width/2-25,
      height:width/2-25,
      backgroundColor:CONFIGURATION.white,
      elevation:2
    },
    cardView:{ 
      flexDirection: "row", 
      paddingHorizontal: 20, 
      justifyContent: "space-between", 
      paddingTop: 5,
      paddingBottom:5,
      overflow:"hidden" 
    },
    profileImage:{
      height:62,
      width:62,
      borderRadius:62/2,
      position:"absolute"
    },
    chartView:{
      height:100,
      width:90,
      alignItems:"center",
      justifyContent:"center",
    },
    perText:{
      fontFamily: CONFIGURATION.TextBold,
      fontSize:30,
      color:CONFIGURATION.TextDarkBlack
    },
    completeProfileText:{
      color:CONFIGURATION.TextDarkGray,
      fontFamily:CONFIGURATION.TextRegular
    },
    centersView:{
      width:"65%",
    },
    menuView:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      width:width-40,
      marginBottom: 25,
    },
    menuIcon:{
      height:23,
      width:23,
    },
    bellIcon:{
      height:18,
      width:18,
    },
    titleText:{
      fontFamily: CONFIGURATION.TextBold,
      fontSize:18,
      color:CONFIGURATION.white
    },
    bellBg:{
      height:35,
      width:35,
      backgroundColor:CONFIGURATION.white,
      borderRadius:35/2,
      alignItems:"center",
      justifyContent:"center"
    },
    whiteBg:{
      position:"absolute",
      height:10,
      width:10,
      borderRadius:10/2,
      backgroundColor: CONFIGURATION.white,
      bottom:0,
      right:0,
      alignItems:"center",
      justifyContent:"center"
    },
    greenBg:{
      height:7,
      width:7,
      borderRadius:7/2,
      backgroundColor: CONFIGURATION.DarkGreen,
    },
    cardBgImage:{
      position:"absolute",
      height:60,
      width:60,
      top:0,
      right:0,
    },
    cardround:{
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 10,
      height:55,
      width:55,
      borderRadius:55/2,
      alignItems:"center",
      justifyContent:"center"
    },
    cardImage:{
      height:27,
      width:27
    },
    numbetTextr:{
      marginLeft: 20,
      fontSize:26,
      fontFamily:CONFIGURATION.TextBold,
      color:CONFIGURATION.TextDarkBlack
    },
    numbertext:{
      fontSize:18,
      color:CONFIGURATION.TextDarkGray
    },
    titleCardText:{
      marginLeft: 20,
      fontFamily: CONFIGURATION.TextRegular,
      color:CONFIGURATION.TextDarkGray
    },
    dateMainView:{
      width:width,
      backgroundColor: CONFIGURATION.white,
      paddingVertical: 20,
      elevation:5,
      marginTop: 5,
    },
    rowss:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      marginHorizontal: 20,
    },
    dateText:{
      fontFamily:CONFIGURATION.TextBold,
      color:CONFIGURATION.TextDarkBlack,
      fontSize:18
    },
    boxDate:{
      height:70,
      width:width/6-13,
      backgroundColor: CONFIGURATION.lightGray,
      marginHorizontal: 2,
      alignItems:"center",
      justifyContent:"center"
    },
    boxDate2:{
      height:70,
      width:width/6-13,
      backgroundColor: CONFIGURATION.btnColorGreen,
      marginHorizontal: 2,
      alignItems:"center",
      justifyContent:"center"
    },
    ongoingApp:{
      width:width-40,
      marginHorizontal:20,
      elevation:2,
      marginVertical: 10,
      backgroundColor: CONFIGURATION.white,
      borderColor:CONFIGURATION.loginInputBorder,
      borderWidth:0.5
    },
    appView:{
      padding: 10,
      borderColor:CONFIGURATION.loginInputBorder,
      borderBottomWidth:1,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"
    },
    imagesa:{
      height:70,
      width:70,
      borderRadius:70/2
    },
    centeredView:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:CONFIGURATION.menuBG
    }
    
});