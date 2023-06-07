import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Chats from "./Chats";
import Home from "./Home";
import Options from "./Options";
import Profile from "./Profile";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import WelcomePage from './WelcomePage';



const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: "#bbb",
    }
}

const BottomTab = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="WelcomePage" component={WelcomePage} 
        options={{
            tabBarIcon: ({focused}) => {
                return (
                  <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 40, borderRadius: 8,backgroundColor: focused ? '#2E8E05' : 'white' }}>
          <Ionicons name="ios-home-outline" size={24} color={focused ? 'white' : 'black'} />
        </View>
                )
            }
        }}
        listeners={{
          tabPress: () => {
            navigation.navigate('WelcomePage');
          },
        }}
      />
      <Tab.Screen name="Options" component={Options} 
        options={{headerShown : true, headerTitleAlign: 'center',
            tabBarIcon: ({focused}) => {
                return (
                    <View style={{alignItems: 'center', justifyContent: 'center', width: 80, height: 40, borderRadius: 8, backgroundColor:  focused ? '#2E8E05' : 'white' }}>
                    <Feather name="plus-square" size={24} color={focused ? 'white' : 'black'}/>
                </View>
                )
            }
        }}
          listeners={{
          tabPress: () => {
            navigation.navigate('Options');
          },
        }}
      />
      <Tab.Screen name="Chats" component={Chats}
       options={{
            tabBarIcon: ({focused}) => {
                return (
                    <View style={{alignItems: 'center', justifyContent: 'center', width: 80, height: 40, borderRadius: 8, backgroundColor:  focused ? '#2E8E05' : 'white' }}>
                    <Ionicons name="md-chatbox-outline" size={24} color={focused ? 'white' : 'black'}/>
                </View>
                )
            }
        }}
         listeners={{
          tabPress: () => {
            navigation.navigate('Chats');
          },
        }}
       />
      <Tab.Screen name="Profile" component={Profile} 
        options={{
            tabBarIcon: ({focused}) => {
                return (
                    <View style={{alignItems: 'center', justifyContent: 'center', width: 80, height: 40, borderRadius: 8, backgroundColor:  focused ? '#2E8E05' : 'white' }}>
                    <Ionicons name="person-outline" size={24} color={focused ? 'white' : 'black'}/>
                </View>
                )
            }
        }}
         listeners={{
          tabPress: () => {
            navigation.navigate('Profile');
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({})

