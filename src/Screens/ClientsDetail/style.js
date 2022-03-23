import { StyleSheet, Dimensions } from "react-native";
const { height,width } = Dimensions.get("screen")
import CONFIGURATION from "./../../Components/Config/index";

export default StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:CONFIGURATION.white
    },
    yellowView:{
      flex:0.1,
      borderBottomLeftRadius:40,
      borderBottomRightRadius:40,
      alignItems:"center",
      justifyContent:"center"
    },
    whiteView:{
      flex:0.9
    },
    menuView:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      width:width-40,
      marginBottom: 0,
    },
    profileView:{
      height:60,
      width:width-40,
      marginLeft:20,
      backgroundColor:CONFIGURATION.white,
      position:"absolute",
      top:-30,
      elevation:2,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      paddingHorizontal:20
    },
    searchIcoN:{
      height:20,
      width:20
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
      alignItems:"center",
      justifyContent:"center"
    },
    appView:{
      padding: 20,
      borderColor:CONFIGURATION.loginInputBorder,
      borderBottomWidth:1,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      marginHorizontal:20
    },
    imagesa:{
      height:70,
      width:70,
      borderRadius:70/2
    },
    textx:{
     fontSize: 14,
     fontFamily: CONFIGURATION.TextRegular,
      color: CONFIGURATION.TextDarkGray,
      //width:"60%"
    },
    textV:{
    flexDirection: "row",
     alignItems: "center",
     //width:"40%",
     justifyContent:"flex-end"
    },
    InputBox:{
      borderColor:CONFIGURATION.loginInputBorder,
      borderWidth:1,
    },
    textInput:{
      marginHorizontal:10,
      fontFamily:CONFIGURATION.TextRegular,
      color:CONFIGURATION.TextDarkBlack,
      
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
});