import { StyleSheet, Text, View, Image, Platform, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import CustomButton from './customButton';
import { MaterialIcons } from '@expo/vector-icons';

const EmailSuccessful = () => {
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
    <View style={{alignItems: 'center',}}>
      <Image 
      source={require('../../img/authentication/clearlyLogo.png')}
        style={{width: 138.52, height: 49.57, marginTop: 77, marginBottom: 57}}
      />
      </View>
    <View style={styles.envelopView}>
    <MaterialIcons name="mark-email-read" size={120} color="#42da00" />
    <Text style={{fontSize: 24, textAlign: 'center', marginTop: 59.57}}>Successful</Text>
    </View>
    <View style={{marginBottom: 72}}>
        <CustomButton label={"Next"} onPress={() => navigation.navigate("Login")} />
    </View>
    </SafeAreaView>
  )
}

export default EmailSuccessful

const styles = StyleSheet.create({
        container: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 24,
        backgroundColor: 'white',
    },
  envelopView: {
  alignItems: 'center',
  paddingTop: 25,
  borderRadius: 10,
  width: 320,
  height: 369,
  marginBottom: 42,
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

})