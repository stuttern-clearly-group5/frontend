// import { StyleSheet, Text, View, Image } from 'react-native'
// import React , { useState, useEffect } from 'react'
// import 'expo-dev-client';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
// import auth from "@react-native-firebase/auth";
// import CustomButton from './customButton';
// import { useNavigation } from '@react-navigation/core';



// const GoogleSignUp = () => {
//     const [initializing, setInitializing] = useState(true);
//     const [user, setUser] = useState();
//     const navigation = useNavigation();
//     GoogleSignin.configure({
//         webClientId: '688494302382-ats784itmq9s92ka4ih7g1auvas42ard.apps.googleusercontent.com',
//     });

//     function onAuthStateChanged(user) {
//         setUser(user);
//         if(initializing) setInitializing(false);
//     }

//     useEffect(() => {
//         const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//         return subscriber;
//     }, []);

//     const onGoogleButtonPress = async () => {
//         const { idToken } = await GoogleSignin.signIn();

//         const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//         const user_sign_in = auth().signInWithCredential(googleCredential);
//         user_sign_in.then((user) => {
//             console.log(user);
//         })
//         .catch((error)=> {
//             console.log(error);
//         })
//     }

//     if (initializing) return null;

//   if(!user) {
//     return (
//     <View style={styles.container}>
//        <Image 
//       source = {require('../../img/authentication/clearlyLogo.png')}
//       style  = {{width: 108.52, height: 38.57, marginTop: 10, marginBottom: 20 }}
//       />
//       <Text style={{textAlign: 'center', fontWeight: 500, fontSize: 22}}>
//       SignUp with Google.....</Text>
//       <GoogleSigninButton
//         style={{ width: 300, height: 65, marginTop: 300}}
//         onPress={onGoogleButtonPress}
//       />
//     </View>
//   )
//   }
//   return(
//     <View style={styles.container}>
//     <Image 
//       source = {require('../../img/authentication/clearlyLogo.png')}
//       style  = {{width: 108.52, height: 38.57, marginTop: 10, marginBottom: 20 }}
//       />
//     <View style={{marginTop: 100, alignItems: 'center'}}>
//         <Text style={{fontSize: 18, fontWeight: 'bold'}}>Welcome, {user.displayName}</Text>
//     </View>
//     <CustomButton
//         label= "Get Started"
//         onPress = {() => navigation.navigate("Video Upload")}
//     />

//     </View>
//   )
// }

// export default GoogleSignUp

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// })