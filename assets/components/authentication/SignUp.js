import { Image, StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import CustomButton from './customButton';



const SignUp = () => {
     const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Image 
      source={require('../../img/authentication/clearlyLogo.png')}
        style={{width: 138, height: 49, marginTop: 115, marginRight: 118, marginLeft: 119, marginBottom: 148}}
      />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpForm")}
            style={{backgroundColor: '#42DA00', borderRadius: 20, alignContent: 'center' , 
            marginHorizontal: 24, paddingTop: 15, paddingBottom: 15, paddingLeft: 12, paddingRight: 12}}>
          <Text style={{fontWeight: 500, fontSize: 16, color: 'white', textAlign: 'center'}}>Sign Up as a translator</Text>
        </TouchableOpacity>
        </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpForm")}
            style={{backgroundColor: '#42DA00', borderRadius: 20, alignContent: 'center' , 
            marginHorizontal: 24, paddingTop: 15, paddingBottom: 15, paddingLeft: 12, paddingRight: 12, marginTop: 60}}>
          <Text style={{fontWeight: 500, fontSize: 16, color: 'white', textAlign: 'center'}}>Sign Up as a User</Text>
        </TouchableOpacity>
<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginBottom: 40 , gap: 4 }}>
  <Text style={{ color: 'grey', }}>Already have an account?</Text>
  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    <Text style={{ color: '#42DA00', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
  </TouchableOpacity>
</View>
</View>
    </SafeAreaView>
  )
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
    }
})