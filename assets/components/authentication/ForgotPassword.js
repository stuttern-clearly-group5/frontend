import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './customButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
// import {Auth} from 'aws-amplify';

const ForgotPassword = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();

  const onSendPressed = (data) => {
      navigation.navigate('ResetPassWord');
    }; 

  const onSignInPress = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>Reset password</Text>
        <Text style={{color: '#8C8C8C', fontSize: 12}}>Enter your username</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
          }}
        />
        </View>
       
        <CustomButton label={"Submit"} onPress={handleSubmit(onSendPressed)}/>
    
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
    // alignItems: 'center',
    padding: 20,
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

export default ForgotPassword;