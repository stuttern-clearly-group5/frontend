import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Video} from 'expo-av';
import { Camera } from 'expo-camera';



const NeedTranslator = () => {
  const [data, setData] = useState([
    { id: 0, title: "Basic Signs", videoUri: require('../../img/mainApp/video2.mp4'), time: 3 },
    { id: 1, title: "Basic Signs 2", videoUri: require('../../img/mainApp/Video3.mp4'), time: 4 },
    { id: 2, title: "Basic Signs", videoUri: require('../../img/mainApp/video1.mp4'), time: 3 },
  ]);

  const video = useRef(null);
  const camera = useRef(null);
  const [status, setStatus] = useState({});
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordButtonPress = async () => {
    if (isRecording) {
      camera.current.stopRecording();
    } else {
      const { uri } = await camera.current.recordAsync();
      setData(prevData => [
        ...prevData,
        { id: prevData.length, title: "New Video", videoUri: { uri }, time: 0 }
      ]);
    }
    setIsRecording(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
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
                />
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
    </View>
  );
};

export default NeedTranslator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistView: {
    flex: 1.4,
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
  cameraView: {
    flex: 0.6,
    justifyContent: 'center',
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
