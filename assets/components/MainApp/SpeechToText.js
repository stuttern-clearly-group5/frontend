import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform, StatusBar, SafeAreaView } from 'react-native';
import Voice from '@react-native-voice/voice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SpeechToText = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechError = err => setError(err.error);
  Voice.onSpeechResults = (result) => setResult(result.value[0]);

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
    } catch (err) {
      setError(err);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Press the button and start speaking.</Text>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Text>Results:</Text>
      <Text>{result}</Text>
      {error && <Text>{error.toString()}</Text>}
      {/* <Text>{error}</Text> */}
    </View>
  ); 
};

export default SpeechToText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
});
