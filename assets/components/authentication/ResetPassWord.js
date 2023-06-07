import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, Platform, StatusBar, SafeAreaView} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './customButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
// import {Auth} from 'aws-amplify';

const ResetPassWord = () => {
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const onSubmitPressed = (data)=> {
    // console.warn(data);
      navigation.navigate('Login');
  };

  const onSignInPress = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.root}>
        <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>Reset password</Text>
        <Text style={{color: '#8C8C8C', fontSize: 12}}>Enter a password different from previous ones</Text>

        <CustomInput
          placeholder="Username"
          name="username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <CustomInput
          placeholder="Code"
          name="code"
          control={control}
          rules={{required: 'Code is required',
          minLength: {
              value: 4,
              message: 'Code should be 4 digits',
            },
          }}
        />

        <CustomInput
          placeholder="Enter your new password"
          name="password"
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        </View>
        <CustomButton label = {"Submit"} onPress={handleSubmit(onSubmitPressed)} />

        {/* <CustomButton
          label = {"Back to  Login"}
          onPress={onSignInPress}
          type="TERTIARY"
        /> */}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    color: '#1E6500',
    fontWeight: 'bold',
    marginTop: 35,
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ResetPassWord;