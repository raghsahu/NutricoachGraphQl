import { StyleSheet, Dimensions } from "react-native";
const { height,width } = Dimensions.get("screen")
import CONFIGURATION from "./../../Components/Config/index";

export default StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: CONFIGURATION.white,
    },
    backArr:{
      height:25,
      width:25
    },
    backarrView:{
      marginVertical:50
    },
    imageView:{
      height:width/4,
      width:width,
    },
    forgottext:{
      fontFamily: CONFIGURATION.TextBold,
      fontSize:30,
      textAlign:"center",
      marginVertical:20,
      marginTop:50,
      color:CONFIGURATION.TextDarkBlack
    },
    des:{
      fontFamily:CONFIGURATION.TextRegular,
      color:CONFIGURATION.TextDarkGray,
      paddingHorizontal:20,
      textAlign:"center"
    },
    InputBox:{
      borderColor:CONFIGURATION.loginInputBorder,
      borderWidth:1,
    },
    textInput:{
      marginHorizontal:20,
      fontFamily:CONFIGURATION.TextRegular,
      color:CONFIGURATION.TextDarkBlack

    },
    mainView:{
      marginHorizontal:20,
    },
    btnView:{
      marginTop:50
    },
    registerText:{
      fontFamily:CONFIGURATION.TextBold,
      fontSize:25
    }
});