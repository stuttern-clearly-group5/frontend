import { StyleSheet, Text, View, Button, TouchableOpacity, Platform, StatusBar, KeyboardAvoidingView, SafeAreaView, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import { useNavigation } from "@react-navigation/native";
import * as Speech from 'expo-speech';
import { Audio } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';



const TextToSpeech = () => {
  const navigation = useNavigation();
  const [iptValue, setIptValue] = useState('');
  // const [volume, setVolume] = useState(3); // Initial volume value (between 0 and 3)
  // const soundRef = useRef(null);

  const thingToSay = iptValue;

  const speak = async () => {
    Speech.speak(thingToSay, {
      language: 'en-US',
      // onStarted: handleSpeechStart,
      // onDone: handleSpeechDone,
    });
  }

  // const handleSpeechStart = async () => {
  //   const { sound } = await Audio.Sound.createAsync(
  //     { uri: 'http://www.example.com/audio.mp3' },
  //     { shouldPlay: true, volume }
  //   );
  //   soundRef.current = sound;
  // }

  // const handleSpeechDone = async () => {
  //   if (soundRef.current) {
  //     soundRef.current.unloadAsync();
  //   }
  // }

//  const increaseVolume = () => {
//     const newVolume = Math.min(volume + 0.5, 3); // Increase volume by 0.5, capped at 3
//     setVolume(newVolume);
//   };

//   const decreaseVolume = () => {
//     const newVolume = Math.max(volume - 0.5, 0); // Decrease volume by 0.5, capped at 0
//     setVolume(newVolume);
//   };

  return (
    <View style={styles.container}>
      <Text style={{color: '#8C8C8C', fontSize: 16}}>Convert text into natural sounding voices. Try it now</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text....."
        value={iptValue}
        onChangeText={(text) => setIptValue(text)}
        multiline={true}
        renderRightAccessory={() => (
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="format-textbox" size={24} color="black" />
          </View>
        )}
      />
      <View>
        <Button title="Listen" onPress={speak} color="#2E8E05" />
      </View>
      <View style={styles.bottomIcons}>
        <TouchableOpacity style={styles.bottomIconImg}>
        <Feather name="link-2" size={19.5} color="#288400" />
        <Text style={styles.bottomIconText}>Share link</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIconImg}>
        <Octicons name="copy" size={19.5} color="#288400" />
        <Text style={styles.bottomIconText}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIconImg}>
        <Feather name="send" size={19.5} color="#288400" />
        <Text style={styles.bottomIconText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.volumeControls}>
        <Button title="Increase Volume" onPress={increaseVolume} />
        <Button title="Decrease Volume" onPress={decreaseVolume} />
      </View> */}
    </View>
  )
}

export default TextToSpeech;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 24,
  },
  input: {
    height: 200,
    fontSize: 18, // Adjust the font size as needed
    color: 'black', // Adjust the color as needed
    borderColor: 'gray',
    borderRadius: 10,
    // borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#EEEEEE',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  volumeControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bottomIcons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  bottomIconText: {
    color: '#B2BEB5', 
    fontSize: 12,
    fontWeight: '800',
  },
  bottomIconImg: {
    justifyContent: 'center', 
    alignItems: 'center'
  }
});
