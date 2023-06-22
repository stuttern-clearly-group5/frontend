// import React, { Component } from 'react';
// import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
// import { useNavigation} from "@react-navigation/native";
// import { APP_ID, APP_SIGN } from './VideoConfig';
// import { StyleSheet, View,} from 'react-native';
// import Constants from 'expo-constants';


// Constants.manifest.extra = {
//   proguardRules: `
//     -keep class **.zego.** { *; }
//   `
// };


// export default function VideoCallScreen() {
//     const navigation = useNavigation();

//     return (
//         <View style={styles.container}>
//             <ZegoUIKitPrebuiltCall
//                 appID={APP_ID}
//                 appSign={APP_SIGN}
//                 userID="New Caller" // userID can be something like a phone number or the user id on your own user system. 
//                 userName="New Caller"
//                 callID={"callID"} // callID can be any unique string. 

//                 config={{
//                     // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
//                     ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
//                     onOnlySelfInRoom: () => {navigation.navigate('WelcomePage') },
//                     onHangUp: () => {navigation.navigate('WelcomePage') },
//                 }}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//     backgroundColor: "white",
//     // paddingHorizontal: 14,
//   },
  

// });

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VideoCallScreen = () => {
  return (
    <View>
      <Text>VideoCallScreen</Text>
    </View>
  )
}

export default VideoCallScreen

const styles = StyleSheet.create({})

