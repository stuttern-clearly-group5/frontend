import React, { useRef, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Video } from 'expo-av';
import { Camera } from 'expo-camera';
import Slider from '@react-native-community/slider';
import themeContext from "./ThemeContext"

const RecordVideo = () => {
  const data = [
    { id: 0, title: "Basic Signs", videoUri: require('../../img/mainApp/video2.mp4'), time: 3 },
    { id: 1, title: "Basic Signs 2", videoUri: require('../../img/mainApp/Video3.mp4'), time: 4 },
    { id: 2, title: "Basic Signs", videoUri: require('../../img/mainApp/video1.mp4'), time: 3 },
  ];

  const video = useRef(null);
  const camera = useRef(null);
  const [status, setStatus] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentVideoDuration, setCurrentVideoDuration] = useState(0);
  const theme = useContext(themeContext);

  const handleRecordButtonPress = async () => {
  try {
    if (isRecording) {
      // Stop the ongoing recording before starting a new one
      await camera.current.stopRecordingAsync();
      setData(prevData => [
        ...prevData,
        { id: prevData.length, title: "New Video", videoUri: currentVideo, time: currentVideoDuration }
      ]);
      setCurrentVideo(null);
      setCurrentVideoDuration(0);
    } else {
      const { uri } = await camera.current.recordAsync({
        quality: Camera.Constants.VideoQuality['720p'],
      });
      setCurrentVideo(uri);
    }
    setIsRecording(prevState => !prevState);
  } catch (error) {
    // Handle the promise rejection here
    console.log("Error:", error);
    // You can show an alert or perform any other error handling you need
    Alert.alert("Error", "An error occurred.");
  }
};



  const formatTime = timeMillis => {
    const totalSeconds = Math.floor(timeMillis / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background } ]}>
      <View style={styles.flatlistView}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.videoView}>
                <Video
                  ref={video}
                  style={styles.video}
                  source={item.videoUri}
                  useNativeControls
                  resizeMode="cover"
                  isLooping
                  onPlaybackStatusUpdate={status => setStatus(status)}
                  onReadyForDisplay={() => setCurrentVideoDuration(status.durationMillis / 1000)}
                  onFullscreenUpdate={status => status.fullscreenUpdate === 0 && setCurrentVideoDuration(status.durationMillis / 1000)}
                />
                {currentVideo === item.videoUri && (
                  <View style={styles.videoControls}>
                    <Slider
                      style={styles.durationSlider}
                      value={status.positionMillis / 1000}
                      maximumValue={status.durationMillis / 1000}
                      minimumTrackTintColor="#FF4081"
                      maximumTrackTintColor="#9E9E9E"
                      thumbTintColor="#FF4081"
                      onValueChange={value => video.current.setPositionAsync(value * 1000)}
                    />
                    <Text style={styles.durationText}>{formatTime(status.positionMillis)} / {formatTime(status.durationMillis)}</Text>
                  </View>
                )}
                <View style={styles.textLabelContainer}>
                  <Text style={styles.textLabel}>Tap to play</Text>
                </View>
              </View>
            );
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
        />
      </View>
      <View style={styles.cameraView}>
        <Camera
          style={styles.camera}
          ref={camera}
          type={Camera.Constants.Type.back}
        />
        <TouchableOpacity
          style={styles.recordButton}
          onPress={handleRecordButtonPress}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? "Stop" : "Record"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecordVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistView: {
    flex: 0.5,
    marginBottom: 20,
  },
  videoView: {
    flex: 1,
    width: 320,
    marginRight: 10,
  },
  video: {
    flex: 1,
    height: 200,
    borderRadius: 10,
  },
  textLabelContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  textLabel: {
    color: 'white',
    fontSize: 12,
  },
  videoControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  durationSlider: {
    flex: 1,
    marginHorizontal: 10,
  },
  durationText: {
    color: 'white',
    fontSize: 12,
  },
  cameraView: {
    flex: 0.4,
    alignItems: 'center',
  },
  camera: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  recordButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  recordButtonText: {
    color: 'white',
    fontSize: 18,
  },
});