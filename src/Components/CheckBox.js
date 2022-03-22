import React, { Component } from 'react';
import {  View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import CONFIGURATION from './Config'

export default function CheckBox(props) {
  return (
      <TouchableOpacity
            style={styles.terms}
            onPress={() => {
              props.onChecked(!props.isSelected);
            }}>
            <View style={styles.checkBox}>
              {props.isSelected && <View style={styles.checkSelected}></View>}
            </View>
            <Text
              size="16"
              weight="500"
              align="center"
              color="#000000">
              {props.text}
            </Text>
          </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
   terms: {
    marginTop: 20,
    marginHorizontal: 20,
    // alignSelf: 'center',
    flexDirection: 'row',
  },
  checkBox: {
    height: 18,
    width: 18,
    borderRadius: 4,
    borderColor: CONFIGURATION.TextDarkGray,
    borderWidth: 2,
    alignSelf: 'center',
    marginRight: 8,
    justifyContent: 'center',
  },
  checkSelected: {
    height: 12,
    width: 12,
    borderRadius: 3,
    backgroundColor: CONFIGURATION.btnColorGreen,
    alignSelf: 'center',
  },
});
