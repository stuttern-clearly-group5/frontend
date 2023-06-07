import { StyleSheet, Text, View, Platform, StatusBar, SafeAreaView, ImageBackground } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

const FirstScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../img/onboardingimg/splashscreen22whiteline.jpeg')} style={styles.imageBackground}>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => navigation.replace('Onboarding')}><Text style={styles.text}>Start</Text></TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  imageBackground: {
    resizeMode: 'cover',
    justifyContent: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 18, // Adjust this value as needed
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
