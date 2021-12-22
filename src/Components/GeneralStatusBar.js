import React from 'react';
import { View, StatusBar, StyleSheet, Platform, Dimensions } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
    (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, Platform.OS == 'android' ? { backgroundColor } : null]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.select({
      ios: 0,
      android: StatusBar.currentHeight,
      default: 0,
    }),
  },
});

export default GeneralStatusBarColor;
