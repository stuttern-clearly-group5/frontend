import { Platform, StatusBar, StyleSheet, View, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../authentication/Context';
import { ThemeContext } from '../MainApp/ThemeContext';
import React from 'react';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EventRegister} from "react-native-event-listeners";
import themeContext from '../MainApp/ThemeContext';



const Profile = () => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { logout } = useContext(AuthContext);
  const [profilePictureURI, setProfilePictureURI] = useState(null);
  const [mode, setMode] = useState(false);

  useEffect(() => {
    if (isFocused) {
      loadProfilePictureURI();
      loadTheme();
    }
  }, [isFocused]);

  const loadProfilePictureURI = async () => {
    try {
      const uri = await AsyncStorage.getItem('profilePictureURI');
      if (uri !== null) {
        setProfilePictureURI(uri);
      }
    } catch (error) {
      console.log('Error loading profile picture URI:', error);
    }
  };

  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme !== null) {
        setMode(storedTheme === 'dark');
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const toggleTheme = async (value) => {
    setMode(value);
    const themeValue = value ? 'dark' : 'light';
    try {
      await AsyncStorage.setItem('theme', themeValue);
      EventRegister.emit('changeTheme', value);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.userInfoSection}>
        <Caption style={{ color: 'white', fontSize: 24, paddingTop: 35, paddingBottom: 10, textAlign: 'center' }}>Profile</Caption>
        <View style={[styles.AvatarBoxShadowView, { backgroundColor: theme.background }]}>
          <TouchableOpacity onPress={() => navigation.navigate("Edit Profile")}>
            {profilePictureURI ? (
              <Avatar.Image
                source={{
                  uri: profilePictureURI,
                }}
                size={80}
              />
            ) : (
              <Avatar.Image
                source={{uri: 'https://source.unsplash.com/80x80/?avatar'}}
                size={80}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Edit Profile")}>
            <FontAwesome5 name="edit" size={18} color="#8C8C8C" style={{ bottom: 80, left: 120 }} />
          </TouchableOpacity>
          <View>
            {/* Replace with user full name {full name} */}
            <Title style={[styles.title, {color: theme.color}]}>John Doe</Title>
            {/* Replace with user name {username} */}
            <Caption style={[styles.caption, {color: theme.color}]}>aamanuels</Caption>
          </View>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate("Change Password")}>
          <View style={styles.menuItem}>
            <Feather name="lock" size={24} color={theme.color} />
            <Text style={[styles.menuItemText, {color: theme.color}]}>Change Password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("Avatar")}>
          <View style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color={theme.color} />
            <Text style={[styles.menuItemText, {color: theme.color}]}>Avatar</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress = {() => {}}>
        <View            style   = {styles.menuItem}>
        <Ionicons        name    = "md-notifications-outline" size = {24} color={theme.color} />
        <Text            style   = {[styles.menuItemText, {color: theme.color}]}>Notifications</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress = {() => navigation.navigate('Settings')}>
        <View            style   = {styles.menuItem}>
        <Ionicons        name    = "settings-outline" size = {24} color={theme.color} />
        <Text            style   = {[styles.menuItemText, {color: theme.color}]}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress = {() => {}}>
        <View            style   = {styles.menuItem}>
        <Ionicons        name    = "globe-outline" size = {24} color={theme.color}  />
        <Text            style   = {[styles.menuItemText, {color: theme.color}]}>App language</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => toggleTheme(!mode)}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.menuItem}>
              <MaterialCommunityIcons name="theme-light-dark" size={24} color={theme.color} />
              <Text style={[styles.menuItemText, { color: theme.color }]}>Theme</Text>
            </View>
            <Switch
              value={mode}
              onValueChange={(value) => toggleTheme(value)}
            />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress = {() => { logout() }} >
        <View            style   = {styles.menuItem}>
        <MaterialIcons   name    = "logout" size = {24} color={theme.color}  />
        <Text            style   = {[styles.menuItemText, {color: theme.color}]}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  userInfoSection: {
    flex: 0.25,
    paddingHorizontal: 30,
    marginBottom: 25,
    backgroundColor: '#42DA00'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -10,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: '#8C8C8C',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 68,
    flex: 0.6,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  AvatarBoxShadowView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 25,
    height: 170,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,   // Set the vertical offset to 0
    },
    shadowOpacity: 0.2,       // Adjust the opacity if needed
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: 'white',
  }
});
