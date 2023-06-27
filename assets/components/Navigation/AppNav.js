import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import StackedScreens from '../Screens/StackedScreens';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useContext, useState } from 'react';
import { AuthContext } from '../authentication/Context';
import AuthenticationScr from '../Screens/AuthenticationScr';
library.add(faCheckSquare);
import WelcomePage from '../MainApp/WelcomePage';
import themeContext from '../MainApp/ThemeContext';
import theme from '../MainApp/Theme';


const Stack = createStackNavigator();

const AppNav = () => {
    const {isLoading, userToken} = useContext(AuthContext);
    const [mode, setMode] = useState(false);

    if( isLoading ) {
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <ActivityIndicator size={'large'} />
        </View>
    }

  return (
   
      <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
     { userToken !== null ? <AuthenticationScr/> : <StackedScreens/> }
    </NavigationContainer>
    
  )
}

export default AppNav;

const styles = StyleSheet.create({})