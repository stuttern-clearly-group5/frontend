import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react'

import { Alert } from 'react-native';


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
        },
        {
          text: 'Yes',
          onPress: () => {
            setIsLoading(true);
            setUserToken(null);
            AsyncStorage.removeItem('userToken');
            setIsLoading(false);
          },
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
    <AuthContext.Provider value={{login , logout, isLoading, userToken }}>
        {children}
    </AuthContext.Provider>
    )
}