import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Video } from 'expo-av';

const NeedTranslator = () => {
  const data = [
    { id: 0, title: "Basic Signs", videoUri: require('../../img/mainApp/video2.mp4'), time: 3 },
    { id: 1, title: "Basic Signs 2", videoUri: require('../../img/mainApp/Video3.mp4'), time: 4 },
    { id: 2, title: "Basic Signs", videoUri: require('../../img/mainApp/video1.mp4'), time: 3 },
  ];

  const video = useRef(null);
  const [status, setStatus] = useState({});

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
                  <Text style={styles.textLabel}>Tap to play </Text>
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
  textLabelContainer: {
  backgroundColor: "#f2f2f2",
  padding: 3,
  borderRadius: 5,
  marginBottom: 10,
  position: 'absolute',
  top: 10,
  left: 4,
},

 textLabel: {
  color: "#333",
  fontSize: 12,
  fontWeight: "bold",
}
});
