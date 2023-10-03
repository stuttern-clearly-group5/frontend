import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from './ThemeContext';

const VideoListPage = () => {
  const [videoUrls, setVideoUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useContext(themeContext);

  useEffect(() => {
    loadVideoUrls();
  }, []);

  const loadVideoUrls = async () => {
    try {
      // Load the video URLs from Firebase Realtime Database
      const snapshot = await firebase.database().ref('videos').once('value');
      const videoData = snapshot.val();
      const urls = videoData ? Object.values(videoData) : [];
      setVideoUrls(urls);
      setIsLoading(false);
    } catch (error) {
      console.log('Error loading video URLs: ', error);
      setIsLoading(false);
    }
  };

  const renderVideoItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <Video
        source={{ uri: item }}
        style={{ width: 360, height: 450, marginBottom: 20 }}
        useNativeControls
        resizeMode="cover"
        isLooping
      />
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{backgroundColor: theme.background, flex: 1, paddingHorizontal: 5}}>
      <FlatList
        data={videoUrls.reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderVideoItem}
        vertical
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default VideoListPage;
