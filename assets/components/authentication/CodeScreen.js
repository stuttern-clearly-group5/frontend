import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Image, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import CustomButton from './customButton';
import CustomInput from './CustomInput';
import { useState } from 'react';
import {useForm} from 'react-hook-form';


const CodeScreen = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState('');
      const {control, handleSubmit, watch} = useForm(
        // {defaultValues: {username: route?.params?.username},}
        );

    const onResendPress = () => {
      console.warn('on resend pressed');
    }

    const onConfirmPressed = (data) => {
      // console.warn(data);
      navigation.navigate("EmailSuccessful");
    }


  return (
    <SafeAreaView style={styles.container}>
    <View style={{alignItems: 'center',}}>
      <Image 
      source={require('../../img/authentication/clearlyLogo.png')}
        style={{width: 138.52, height: 49.57,  marginBottom: 57}}
      />
      </View>
      <View style={[{marginBottom: 62}, styles.envelopView]}>
        <Text style={{fontSize: 24, textAlign: 'center', marginBottom: 23, marginTop: 10}} >Verification</Text>
        <Text style={{fontSize: 12, textAlign: 'center', paddingHorizontal: 54, marginBottom: 20}} >Enter the 4 digit code we sent to you via your email address</Text>
      
      <CustomInput
        name = "code"
        control = {control}
        placeholder='Enter 4 digit code'
        rules={{required : 'Confirmation code is required',
        minLength: {
              value: 4,
              message: 'Code should be 4 digits',
            },
        }}
      />

      <Text style={{marginTop: 12}} onPress={onResendPress} >Resend code</Text>

      </View>
      <View>
        <CustomButton label={"Confirm"} onPress={handleSubmit(onConfirmPressed)} />
      </View>
    </SafeAreaView>
  )
}

export default CodeScreen

const styles = StyleSheet.create({
        container: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 24,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignContent: 'center'
    },
    envelopView: {
  alignItems: 'center',
  width: 320,
  borderRadius: 10,
  paddingTop: 25,
  height: 369,
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 0, // Set the vertical offset to 0
  },
  shadowOpacity: 0.2, // Adjust the opacity if needed
  shadowRadius: 6,
  elevation: 5,
  backgroundColor: 'white',
},
codeInputView: {
  padding: 15,
  marginVertical: 35,
  borderWidth: 1,
  borderColor: '#C8CDD0',
  borderRadius: 5,
  width: '80%',
  alignContent: 'center',
  justifyContent: 'center'
}
})