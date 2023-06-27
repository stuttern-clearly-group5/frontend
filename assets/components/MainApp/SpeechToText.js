import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av'; // Import Audio from expo-av
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from './ThemeContext';
import Voice from '@react-native-voice/voice';


const SpeechToText = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const theme = useContext(themeContext);

  useEffect(() => {
    // Request microphone permission
    const getMicrophonePermission = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          setError('Microphone permission not granted');
        }
      } catch (error) {
        setError('Error requesting microphone permission: ' + error.message);
      }
    };

    getMicrophonePermission();
  }, []);

  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechError = err => setError(err.error);
  Voice.onSpeechResults = result => setResult(result.value[0]);

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ paddingBottom: 5, textAlign: 'center', paddingTop: 20, color: theme.color }}>
        Press the button and start speaking.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
      <Text style={{ paddingBottom: 10, paddingTop: 10, color: theme.color }}>Result:</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Speech Translation....."
          value={result}
          onChangeText={(text) => setResult(text)}
          multiline={true}
        />
      </View>
      {error && <Text>{error.toString()}</Text>}
    </SafeAreaView>
  );
};

export default SpeechToText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  button: {
    backgroundColor: '#2E8E05',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    height: 200,
    fontSize: 18,
    color: 'black',
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#EEEEEE',
  },
});
