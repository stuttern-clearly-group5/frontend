import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Onboarding from './Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';;
import Login from '../authentication/Login';
import FirstScreen from './FirstScreen';

const Stack = createStackNavigator();

const Loading = () => {
  return (
      <View>
    <ActivityIndicator size="large" />
  </View>
  );
}

const OnboardingHome = () => {
 const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [viewedFirstScreen, setViewedFirstScreen] = useState(false);

  const checkOnboarding = async () => {
    try {
        const value = await AsyncStorage.getItem('@viewedOnboarding');

        if (value !== null) {
          setViewedOnboarding(true)
        }
    } catch (err) {
        console.log(' Error @checkOnboarding: ', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkOnboarding();
  }, [] )


    const checkFirstScreen = async () => {
    try {
        const value = await AsyncStorage.getItem('@viewedFirstScreen');

        if (value !== null) {
          setViewedFirstScreen(true)
        }
    } catch (err) {
        console.log(' Error @checkFirstScreen: ', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkFirstScreen();
  }, [] )

  return (
    <View style={styles.container}>
      {loading ? <Loading/> : viewedOnboarding ? <Login/> : <Onboarding/> }
      {loading ? <Loading/> : viewedFirstScreen ? <Login/> : <FirstScreen/> }
      <StatusBar style="auto" />
    </View>
  );
}

export default OnboardingHome

const styles = StyleSheet.create({})