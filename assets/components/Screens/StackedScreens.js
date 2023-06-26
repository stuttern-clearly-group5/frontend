import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Onboarding from '../onboard/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingHome from '../onboard/OnboardingHome';
import Login from '../authentication/Login';
import FirstScreen from '../onboard/FirstScreen';
import AuthenticationScr from './AuthenticationScr';
import SignUp from '../authentication/SignUp';
import SignUpForm from '../authentication/SignUpForm';
import EmailVerify from '../authentication/EmailVerify';
import WelcomePage from '../MainApp/WelcomePage';
import SecondEmailVerify from '../authentication/SecondEmailVerify';
import CodeScreen from '../authentication/CodeScreen';
import EmailSuccessful from '../authentication/EmailSuccessful';
import ForgotPassword from '../authentication/ForgotPassword';
import ResetPassWord from '../authentication/ResetPassWord';


const Stack = createStackNavigator();

const StackedScreens = () => {

  //This is to ensure the onboarding page launches only the first time the user uses the app.
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

useEffect(() => {
  const checkAppFirstLaunch = async () => {
    try {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      // console.log(appData);
      if (appData === null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem('isAppFirstLaunched', "false");
      } else {
        setIsAppFirstLaunched(false);
      }
    } catch (err) {
      console.log('Error checking app first launch:', err);
    }
  };

  checkAppFirstLaunch();
}, []);


  return (
    isAppFirstLaunched != null && (
        <Stack.Navigator screenOptions = {{ headerShown: false }}>
        {/* {isAppFirstLaunched && (<Stack.Screen name="FirstScreen" component={FirstScreen} />)}
        {isAppFirstLaunched && (<Stack.Screen name="Onboarding" component={Onboarding} />)} */}
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUpForm" component={SignUpForm} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EmailVerify" component={EmailVerify} />
        {/* <Stack.Screen name="WelcomePage" component={WelcomePage} /> */}
        <Stack.Screen name="SecondEmailVerify" component={SecondEmailVerify} />
        <Stack.Screen name="CodeScreen" component={CodeScreen} />
        <Stack.Screen name="EmailSuccessful" component={EmailSuccessful} />
        <Stack.Screen name="ForgotPassWord" component={ForgotPassword} />
        <Stack.Screen name="ResetPassWord" component={ResetPassWord} />

        
      </Stack.Navigator>
    )
  );
}

export default StackedScreens

const styles = StyleSheet.create({})