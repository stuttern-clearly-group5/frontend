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
import BasicSignLanguage from '../MainApp/BasicSignLanguage';
import NeedTranslator from '../MainApp/NeedTranslator';
import ChangePassword from '../MainApp/ChangePassword';
import Avatar from '../MainApp/Avatar';
import Settings from '../MainApp/Settings';
import HelpAndSupport from '../MainApp/HelpAndSupport';
import TermsOfService from '../MainApp/TermsOfService';
import VideoCallScreen from '../MainApp/VideoCallScreen';

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
                        options = {({ route }) => ({
    headerShown     : true,
    headerTitleAlign: 'center',
    title           : route.params.userName  // Closing parenthesis moved to the correct position
  })}
        />

        <Stack.Screen name    = "Basic Sign Language" component = {BasicSignLanguage}
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

        <Stack.Screen name    = "Need a translator" component = {NeedTranslator}
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

        <Stack.Screen name    = "Change Password" component = {ChangePassword}
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

          <Stack.Screen name    = "Avatar" component = {Avatar}
                      options = {{ headerShown: true, headerTitleAlign: 'center', 
        headerRight: () => (
       <Ionicons
        name  = "notifications-outline"
        size  = {24}
        color = "black"
        style = {{ marginRight: 10 }}
      />
    ),
        }} />

        <Stack.Screen name    = "Settings" component = {Settings}
                      options = {{ headerShown: true, headerTitleAlign: 'center', 
        headerRight: () => (
       <Ionicons
        name  = "notifications-outline"
        size  = {24}
        color = "black"
        style = {{ marginRight: 10 }}
      />
    ),
        }} />

        <Stack.Screen name    = "Help and Support" component = {HelpAndSupport}
                      options = {{ headerShown: true, headerTitleAlign: 'center', 
        headerRight: () => (
       <Ionicons
        name  = "notifications-outline"
        size  = {24}
        color = "black"
        style = {{ marginRight: 10 }}
      />
    ),
        }} />
        <Stack.Screen name    = "Terms Of Service" component = {TermsOfService}
                      options = {{ headerShown: true, headerTitleAlign: 'center', 
        headerRight: () => (
       <Ionicons
        name  = "notifications-outline"
        size  = {24}
        color = "black"
        style = {{ marginRight: 10 }}
      />
    ),
        }} />

        <Stack.Screen name    = "Video Call" component = {VideoCallScreen}
                      options = {{ headerShown: true, headerTitleAlign: 'center', 
        headerRight: () => (
       <Ionicons
        name  = "notifications-outline"
        size  = {24}
        color = "black"
        style = {{ marginRight: 10 }}
      />
    ),
        }} />
     
      </Stack.Navigator>
  )
}

export default AuthenticationScr;

const styles = StyleSheet.create({
  
})