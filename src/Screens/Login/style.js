import { StyleSheet, Dimensions } from "react-native";
const { height,width } = Dimensions.get("screen")
import CONFIGURATION from "./../../Components/Config/index";

export default StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:CONFIGURATION.white
    },
    logoView:{
      height:width/3,
      width:width,
      alignItems:"center",
      justifyContent:"center",
      marginTop: 30
    },
    Mainlogo:{
      height:width/2-50,
      width:width-80,
    },
    welcomeText:{
      fontSize:30,
      fontFamily:CONFIGURATION.TextBold,
      textAlign:"center",
      marginTop:30,
      color:CONFIGURATION.TextDarkBlack
    },
    textsty:{
      textAlign:"center",
      color:CONFIGURATION.TextDarkGray,
      fontFamily:CONFIGURATION.TextRegular,
      paddingHorizontal:60,
      marginTop:8
    },
    mainView:{
      marginHorizontal:20,
      marginVertical: 30,
    },
    InputBox:{
      borderColor:CONFIGURATION.loginInputBorder,
      borderWidth:1
    },
    textInput:{
      marginHorizontal:20,
      height: 44,
      fontFamily:CONFIGURATION.TextRegular
    },
    forgotText:{
      textAlign:"center",
      fontFamily: CONFIGURATION.TextBold,
      fontSize:15
    },
    textregi:{
      textAlign:"center",
      fontFamily:CONFIGURATION.TextBold,
      color:CONFIGURATION.TextDarkGray
    }
});