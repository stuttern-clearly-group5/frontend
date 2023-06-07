import { Platform, StatusBar, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../authentication/Context';
import { ThemeContext } from '../MainApp/ThemeContext';
import React from 'react'
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';



const Profile = () => {
  const navigation      = useNavigation();
  const { logout }      = useContext(AuthContext);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <SafeAreaView     style   = {styles.container}>
    <View             style   = {styles.userInfoSection}>
    <Caption          style   = {{color: 'white', fontSize: 24, paddingTop: 35, paddingBottom: 10, textAlign: 'center'}}>Profile</Caption>
    <View             style   = {styles.AvatarBoxShadowView}>
    <TouchableOpacity onPress = {() => navigation.navigate("Edit Profile")}>
                      <Avatar.Image
          source={{
            uri: 'https://source.unsplash.com/80x80/?avatar',
          }}
          size = {80}
          />
        </TouchableOpacity>
          <TouchableOpacity onPress = {() => navigation.navigate("Edit Profile")}>
          <FontAwesome5     name    = "edit" size = {18} color = "#8C8C8C" style = {{bottom: 80, left: 120}}/>
          </TouchableOpacity>
          <View>
          {/* Replace with user full name {full name} */}
            <Title style = {styles.title}>John Doe</Title>
            {/* Replace with user name {username} */}
            <Caption style = {styles.caption}>aamanuels</Caption>
          </View>
        </View>
      </View>

      <View            style   = {styles.menuWrapper}>
      <TouchableRipple onPress = {() => navigation.navigate('ResetPassWord')}>
      <View            style   = {styles.menuItem}>
      <Feather         name    = "lock" size = {24} color = "black" />
      <Text            style   = {styles.menuItemText}>Change Password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress = {() => {}}>
        <View            style   = {styles.menuItem}>
        <Ionicons        name    = "person-outline" size = {24} color = "black" />
        <Text            style   = {styles.menuItemText}>Avatar</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress = {() => {}}>
        <View            style   = {styles.menuItem}>
        <Ionicons        name    = "md-notifications-outline" size = {24} color = "black" />
        <Text            style   = {styles.menuItemText}>notifications</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress = {() => {}}>
        <View            style   = {styles.menuItem}>
        <Ionicons        name    = "settings-outline" size = {24} color = "black" />
        <Text            style   = {styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress = {() => {}}>
        <View            style   = {styles.menuItem}>
        <Ionicons        name    = "globe-outline" size = {24} color = "black" />
        <Text            style   = {styles.menuItemText}>App language</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple        onPress = {() => {toggleTheme()}}>
        <View                   style   = {styles.menuItem}>
        <MaterialCommunityIcons name    = "theme-light-dark" size = {24} color = "black" />
        <Text                   style   = {styles.menuItemText}>Theme</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress = {() => { logout() }} >
        <View            style   = {styles.menuItem}>
        <MaterialIcons   name    = "logout" size = {24} color = "black" />
        <Text            style   = {styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
    flex     : 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0,
  },
  userInfoSection: {
    flex             : 0.25,
    paddingHorizontal: 30,
    marginBottom     : 25,
    backgroundColor  : '#42DA00'
  },
  title: {
    fontSize  : 24,
    fontWeight: 'bold',
    marginTop : -10,
  },
  caption: {
    fontSize  : 14,
    lineHeight: 14,
    fontWeight: '500',
    color     : '#8C8C8C',
    textAlign : 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom : 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor   : '#dddddd',
    borderTopWidth   : 1,
    flexDirection    : 'row',
    height           : 100,
  },
  infoBox: {
    width         : '50%',
    alignItems    : 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 68,
    flex     : 0.6,
  },
  menuItem: {
    flexDirection    : 'row',
    paddingVertical  : 10,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color     : '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize  : 16,
    lineHeight: 26,
  },
  AvatarBoxShadowView: {
    // flex: 1,  
  alignSelf     : 'center',
  alignItems    : 'center',
  justifyContent: 'center',
  width         : 320,
  borderRadius  : 10,
  paddingTop    : 20,
  paddingBottom : 25,
  height        : 170,
  shadowColor   : 'black',
  shadowOffset  : {
    width : 0,
    height: 0,   // Set the vertical offset to 0
  },
  shadowOpacity  : 0.2,       // Adjust the opacity if needed
  shadowRadius   : 6,
  elevation      : 5,
  backgroundColor: 'white',
  }
});