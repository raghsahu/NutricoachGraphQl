import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen")
import CONFIGURATION from "./../../Components/Config/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONFIGURATION.white
  },
  yellowView: {
    flex: 0.2,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  whiteView: {
    flex: 0.8
  },
  pagerView:{
flex:1
  },
  menuView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 40,
    marginBottom: 0,
  },
  profileView: {
    height: 60,
    width: width - 40,
    marginLeft: 20,
    backgroundColor: CONFIGURATION.white,
    position: "absolute",
    top: -30,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  searchIcoN: {
    height: 20,
    width: 20
  },
  bellIcon: {
    height: 18,
    width: 18,
  },
  titleText: {
    fontFamily: CONFIGURATION.TextBold,
    fontSize: 18,
    color: CONFIGURATION.white
  },
  bellBg: {
    height: 35,
    width: 35,
    backgroundColor: CONFIGURATION.primaryLight,
    borderRadius: 35 / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  inputView: {
    height: 70,
    width: width,
    backgroundColor: CONFIGURATION.white,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex:2,
    elevation:5
  },
  input: {
    fontFamily: CONFIGURATION.TextRegular,
    width: width / 2 + 30,
    paddingHorizontal: 10
  },
  inputrow: {
    borderColor: CONFIGURATION.loginInputBorder,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  animatedBox:
  {
    width: 190,
    height: 190,
    backgroundColor: ('#2E7D32')
  },
});
