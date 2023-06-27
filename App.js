import React from 'react';

import { AuthProvider } from './assets/components/authentication/Context';
import AppNav from './assets/components/Navigation/AppNav';
import { useState, useEffect } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import { DarkTheme, DefaultTheme} from '@react-navigation/native';

// import { ThemeProvider } from  './assets/components/MainApp/ThemeContext';
import themeContext from './assets/components/MainApp/ThemeContext';
import theme from './assets/components/MainApp/Theme';

// import * as Firebase from "firebase";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDkNqRKourFdoXR3Zk2yGrXdUsXvteEi7E",
//   authDomain: "clearly-68c14.firebaseapp.com",
//   projectId: "clearly-68c14",
//   storageBucket: "clearly-68c14.appspot.com",
//   messagingSenderId: "254125968574",
//   appId: "1:254125968574:web:b70c4f21a757b8ff1c22ef"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

export default function App() {

  const [mode, setMode] = useState(false);

  useEffect(()=>{
    let eventListener = EventRegister.addEventListener("changeTheme", (data) =>{
      setMode(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    }
  })

  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
     <AuthProvider theme={mode === true ? DarkTheme : DefaultTheme}>
    
   
    <AppNav/>
    
    
    </AuthProvider>
    </themeContext.Provider>
  );
}

