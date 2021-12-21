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
      backgroundColor:CONFIGURATION.primaryLight,
      borderRadius:35/2,
      alignItems:"center",
      justifyContent:"center"
    },
});