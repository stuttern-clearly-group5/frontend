import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/core';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { initializeApp } from "firebase/app";
import CustomInput from '../authentication/CustomInput';
import CustomButton from '../authentication/customButton';
import { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import themeContext from './ThemeContext';

const firebaseConfig = {
  apiKey: "AIzaSyDkNqRKourFdoXR3Zk2yGrXdUsXvteEi7E",
  authDomain: "clearly-68c14.firebaseapp.com",
  databaseURL: "https://clearly-68c14-default-rtdb.firebaseio.com/",
  projectId: "clearly-68c14",
  storageBucket: "clearly-68c14.appspot.com",
  messagingSenderId: "254125968574",
  appId: "1:254125968574:web:b70c4f21a757b8ff1c22ef"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const theme = useContext(themeContext);

    const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

    const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSendPressed = async (data) => {
    const { oldPassword, newPassword, confirmPassword } = data;
    
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);

    try {
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);
      Alert.alert('Success', 'Password changed successfully');
    } catch (error) {
      Alert.alert('Error', 'Invalid old password');
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Profile');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: theme.background}}>
      <View style={[styles.root, {backgroundColor: theme.background }]}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: theme.color , fontSize: 12 }}>Enter old password</Text>

          <CustomInput
            name="oldPassword"
            control={control}
            secureTextEntry = {!showOldPassword}
            placeholder="Old Password"
            rules={{
              required: 'Old password is required',
            }}
            icon={<Ionicons name="key-outline" size={24} color="black" />} 
          />

          <CustomInput
            name="newPassword"
            control={control}
            secureTextEntry = {!showPassword}
            placeholder="New Password"
            rules={{
              required: 'New Password is required',
            }}
            icon={<Ionicons name="key-outline" size={24} color="black" />} 
          />

          <CustomInput
            name="confirmPassword"
            control={control}
            secureTextEntry = {!showConfirmPassword}
            placeholder="Confirm Password"
            rules={{
              required: 'This is required',
            }}
            icon={<Ionicons name="key-outline" size={24} color="black" />} 
          />
        </View>

        <CustomButton label={"Submit"} onPress={handleSubmit(onSendPressed)} />

        <CustomButton
          label={"Back to Login"}
          onPress={onSignInPress}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E6500',
    margin: 10,
    marginTop: 40,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ChangePassword;
