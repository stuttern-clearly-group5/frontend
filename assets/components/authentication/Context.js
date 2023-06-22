import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = () => {
    setIsLoading(true);
    setUserToken('practiceLogin');
    AsyncStorage.setItem('userToken', 'practiceLogin');
    setIsLoading(false);
  };

  const logout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          style: 'cancel',
          // Optional: Add custom style for "No" button
          // For example, you can set the text color to white and background color to red
          textStyle: { color: 'white' },
          style: { backgroundColor: 'red', borderRadius: 8 },
        },
        {
          text: 'Yes',
          onPress: () => {
            setIsLoading(true);
            setUserToken(null);
            AsyncStorage.removeItem('userToken');
            setIsLoading(false);
          },
          // Optional: Add custom style for "Yes" button
          // For example, you can set the text color to white and background color to green
          textStyle: { color: 'white' },
          style: { backgroundColor: 'green', borderRadius: 8 },
        },
      ],
      { cancelable: false }
    );
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error: ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>{children}</AuthContext.Provider>
  );
};
