import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'

const inputField = ({text, label, icon, inputType, keyboardType, fieldButtonLabel, fieldButtonFunction}) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center',}}>
      <Image 
      source={require('../../img/authentication/clearlyLogo.png')}
        style={{width: 108.52, height: 38.57, marginTop: 33, marginBottom: 14.43}}
      />
      <Text style={{fontSize: 24, fontWeight: 400, textAlign: 'center'}}>Login</Text>
      <Text style={{fontSize: 14, fontWeight: 400, textAlign: 'center', color: '#8C8C8C'}}>Welcome back. Please sign in to continue</Text>
      </View>
     <Text style={styles.inputLabel} >Email</Text>
      <View style={styles.inputBox}>
        <TextInput placeholder='Stutern@gmail.com' keyboardType='email-address' value={email} onChangeText={text => setEmail(text)}/>
        <Image source={(require('../../img/authentication/email.png'))} style={{width: 20, height: 20, tintColor: '#666'}}/>
      </View>
    <Text style={styles.inputLabel}>Password</Text>
    <View style={styles.inputBox}>
      <TextInput placeholder='Stutern@gmail.com' secureTextEntry={!showPassword} value={password} onChangeText={text => setPassword(text)} />
      <TouchableOpacity onPress={toggleShowPassword}>
        <Image source={require('../../img/authentication/password.png')} style={{ width: 20, height: 20, tintColor: '#666' }} />
      </TouchableOpacity>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, alignItems: 'center'}}>
          <View>
        <Text style={{color: '#666', fontSize: 14}}>Remember me</Text>
    </View>
    <TouchableOpacity>
      <Text style={{color: '#42DA00', fontSize: 14, fontWeight: 400}} >Forgot password?</Text>
    </TouchableOpacity>
    </View>
        <View>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpForm")}
            style={styles.button}>
          <Text style={{fontWeight: 500, fontSize: 16, color: 'white', textAlign: 'center'}}>Login </Text>
        </TouchableOpacity>
        </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 6, alignItems: 'center', gap: 6}}>
        <Text style={{color: '#666', fontSize: 14}}>Don't have an account? </Text>
    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      <Text style={{color: '#42DA00', fontSize: 16, fontWeight: 400}} >SignUp</Text>
    </TouchableOpacity>
    </View>
    <View style={{ justifyContent: 'center', marginTop: 40, alignItems: 'center'}}>
      <Text style={{color: '#666', fontSize: 14}}>Or SignUp with</Text>
    </View>
    <View style={{justifyContent: 'center', marginTop: 20, alignItems: 'center', flexDirection: 'row', gap: 10}}>
<TouchableOpacity>
        <Image source={require('../../img/authentication/GIcon.png')}
        style={{width: 40.87, height: 40.87,}}
      />
</TouchableOpacity>
<TouchableOpacity>
        <Image source={require('../../img/authentication/twitter2.png')}
        style={{width: 40.87, height: 40.87,}}
      />
</TouchableOpacity>
  <TouchableOpacity>
                <Image source={require('../../img/authentication/facebk2.jpg')}
        style={{width: 40.87, height: 40.87,}}
      />
  </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default inputField

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: "white",
        paddingHorizontal: 24,
    },
    inputLabel: {
        marginTop: 10, 
         marginBottom: 6, 
        fontSize: 14, 
        fontWeight: 400
    },
    inputBox: {
        flexDirection: 'row', 
        borderColor: '#C8CDD0', 
        borderWidth: 1.5, 
        borderRadius: 5, 
        paddingLeft: 12, 
        paddingRight: 12, 
        paddingTop: 8, 
        paddingBottom: 8,
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#42DA00', 
        borderRadius: 20, 
        alignContent: 'center' , 
        paddingTop: 15, 
        paddingBottom: 15, 
        paddingLeft: 12, 
        paddingRight: 12,
        marginTop: 35,
    },
    }
)