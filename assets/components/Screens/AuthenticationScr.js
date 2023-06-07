import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SpeechToText from '../MainApp/SpeechToText';
import BottomTab from '../MainApp/BottomTab';
import TextToSpeech from '../MainApp/TextToSpeech';
import { Ionicons } from '@expo/vector-icons';
import Dictionary from '../MainApp/Dictionary';
import EditProfile from '../MainApp/EditProfile';
import UserChat from '../MainApp/UserChat';

const Stack = createStackNavigator();

const AuthenticationScr = () => {
  return (
        <Stack.Navigator screenOptions = {{ headerShown: false }}>
        <Stack.Screen    name          = "BottomTab" component      = {BottomTab} options = {{ headerShown: false}}/>
        <Stack.Screen    name          = "Speech To Text" component = {SpeechToText}
                         options       = {{ headerShown: true, headerTitleAlign: 'center', 
        headerRight: () => (
       <Ionicons
        name  = "notifications-outline"
        size  = {24}
        color = "black"
        style = {{ marginRight: 10 }}
            // onPress={() => {
            //   // Handle the icon press event
            // }}
      />
    ),
        }}
        />
        <Stack.Screen name    = "Text to Speech" component = {TextToSpeech}
                      options = {{ headerShown: true, headerTitleAlign: 'center', 
        headerRight: () => (
       <Ionicons
        name  = "notifications-outline"
        size  = {24}
        color = "black"
        style = {{ marginRight: 10 }}
            // onPress={() => {
            //   // Handle the icon press event
            // }}
      />
    ),
        }} />
        <Stack.Screen name    = "Dictionary" component = {Dictionary}
                      options = {{ headerShown: true, headerTitleAlign: 'center', 
        headerRight: () => (
          //  <Ionicons
          //   name="notifications-outline"
          //   size={24}
          //   color="black"
          //   style={{ marginRight: 10 }}
          //   // onPress={() => {
          //   //   // Handle the icon press event
          //   // }}
          // />
      <Image
      style  = {{width: 24, height: 24, tintColor: '#288400', marginRight: 15}}
      source = {require('../../img/mainApp/loading.png')}
      />
    ),
        }} />
          <Stack.Screen name    = "Edit Profile" component = {EditProfile}
                        options = {{ headerShown: true, headerTitleAlign: 'center',}} />
          <Stack.Screen name    = "UserChat" component     = {UserChat}
                        options = {{ headerShown: true, headerTitleAlign: 'center', }}
        />
     
      </Stack.Navigator>
  )
}

export default AuthenticationScr;

const styles = StyleSheet.create({
  
})