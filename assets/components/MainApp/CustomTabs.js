import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomTabs = ({ label, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomTabs;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    alignContent: 'center',
    width: 160,
    height: 112,
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 22,
  },
});
