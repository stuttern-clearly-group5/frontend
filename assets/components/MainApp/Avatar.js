import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../authentication/customButton';
import themeContext from './ThemeContext';

export default function Avatar() {
  const [imageURI, setImageURI] = useState(null);
  const theme = useContext(themeContext);

  const saveImageURI = async (uri) => {
    try {
      await AsyncStorage.setItem('avatarURI', uri);
    } catch (error) {
      console.log('Error saving image URI:', error);
    }
  };

  const saveProfilePicture = async (uri) => {
    try {
      await AsyncStorage.setItem('profilePictureURI', uri);
    } catch (error) {
      console.log('Error saving profile picture:', error);
    }
  };

  const loadImageURI = async () => {
    try {
      const uri = await AsyncStorage.getItem('avatarURI');
      if (uri !== null) {
        setImageURI(uri);
      }
    } catch (error) {
      console.log('Error loading image URI:', error);
    }
  };

  useEffect(() => {
    loadImageURI();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        setImageURI(result.uri);
        saveImageURI(result.uri);
        saveProfilePicture(result.uri); // Save as profile picture
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.container}>
        {imageURI ? (
          <Image source={{ uri: imageURI }} style={styles.avatar} />
        ) : (
          <Text>No avatar selected</Text>
        )}
        <View>
          <Text style={{textAlign: 'center', fontSize: 24, fontWeight: '400', marginTop: 22, color: theme.color}}>Create your own Avatar</Text>
          <Text style={{textAlign: 'center',color: '#B2BEB5', fontSize: 12,fontWeight: '800',}}>Be anything that you've always wanted</Text>
          <Text style={{textAlign: 'center',color: '#B2BEB5', fontSize: 12,fontWeight: '800',}}>be creative and explore</Text>
        </View>
        <CustomButton
          onPress={selectImage}
          label="Create"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 15,
    alignSelf: 'center'
  },
});
