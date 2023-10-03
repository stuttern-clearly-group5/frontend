// import React, { Component } from 'react';
// import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
// import { useNavigation} from "@react-navigation/native";
// import { APP_ID, APP_SIGN } from './VideoConfig';
// import { StyleSheet, View,} from 'react-native';
// import Constants from 'expo-constants';


// Constants.manifest.extra = {
//   proguardRules: `
//     -keep class **.zego.** { *; }
//   `
// };


// export default function VideoCallScreen() {
//     const navigation = useNavigation();

//     return (
//         <View style={styles.container}>
//             <ZegoUIKitPrebuiltCall
//                 appID={APP_ID}
//                 appSign={APP_SIGN}
//                 userID="New Caller" // userID can be something like a phone number or the user id on your own user system. 
//                 userName="New Caller"
//                 callID={"callID"} // callID can be any unique string. 

//                 config={{
//                     // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
//                     ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
//                     onOnlySelfInRoom: () => {navigation.navigate('WelcomePage') },
//                     onHangUp: () => {navigation.navigate('WelcomePage') },
//                 }}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//     backgroundColor: "white",
//     // paddingHorizontal: 14,
//   },
  

// });

  
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Button, Alert, Text, ActivityIndicator, View, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../authentication/customButton';
import themeContext from './ThemeContext';
import theme from './Theme';

// Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDkNqRKourFdoXR3Zk2yGrXdUsXvteEi7E",
//   authDomain: "clearly-68c14.firebaseapp.com",
//   databaseURL: "https://clearly-68c14-default-rtdb.firebaseio.com/",
//   projectId: "clearly-68c14",
//   storageBucket: "clearly-68c14.appspot.com",
//   messagingSenderId: "254125968574",
//   appId: "1:254125968574:web:b70c4f21a757b8ff1c22ef"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyA5GSaE8hAAAZqVyi7dUB9jG33As-Ft_T8",
  authDomain: "clearlyapp2-38773.firebaseapp.com",
  databaseURL: "https://clearlyapp2-38773-default-rtdb.firebaseio.com/",
  projectId: "clearlyapp2-38773",
  storageBucket: "clearlyapp2-38773.appspot.com",
  messagingSenderId: "649929654576",
  appId: "1:649929654576:web:2e5e648e7521a61ff848f5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function VideoUploadScreen() {
  const [videoUrls, setVideoUrls] = useState([]);
  const video = useRef(null);
  const theme = useContext(themeContext);
  const [status, setStatus] = useState({});
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  useEffect(() => {
    loadVideoUrls();
  }, []);

  const loadVideoUrls = async () => {
    try {
      // Load the existing video URLs from AsyncStorage
      const storedUrls = await AsyncStorage.getItem('videoUrls');
      if (storedUrls) {
        const urls = JSON.parse(storedUrls);
        setVideoUrls(urls.filter((url) => url !== null && url !== ""));
      }
    } catch (error) {
      console.log('Error loading video URLs: ', error);
    }
  };

  const saveVideoUrls = async (urls) => {
  try {
    // Filter out null and empty URLs before saving
    const filteredUrls = urls.filter((url) => url !== null && url !== "");
    if (filteredUrls.length > 0) {
      const jsonUrls = JSON.stringify(filteredUrls);
      await AsyncStorage.setItem('videoUrls', jsonUrls);
    } else {
      // If there are no valid URLs, remove the item from AsyncStorage
      await AsyncStorage.removeItem('videoUrls');
    }
  } catch (error) {
    console.log('Error saving video URLs: ', error);
  }
};


  const pickVideo = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    // Select a video from the device
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      const videoUri = result.assets[0].uri; // Access the video URI from the assets array
      uploadVideoToFirebase(videoUri);
    }
  };

  const uploadVideoToFirebase = async (videoUri) => {
  try {
    const fileUri = FileSystem.documentDirectory + 'video.mp4';

    // Move the video file to a temporary directory
    await FileSystem.moveAsync({
      from: videoUri,
      to: fileUri,
    });

    const response = await fetch(fileUri);
    const blob = await response.blob();

    const storageRef = firebase.storage().ref();
    const fileName = `video_${Date.now()}.mp4`;

    // Upload the video to Firebase Storage
    const uploadTask = storageRef.child(fileName).put(blob);

    uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress or monitoring of the upload
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setShowActivityIndicator(true);
          console.log(`Upload is ${progress}% complete`);
        },
        (error) => {
          // Handle error during upload
          console.log('Error uploading video: ', error);
        },
        () => {
          // Handle successful upload
          setShowActivityIndicator(false);
          console.log('Video uploaded successfully');

          // Delete the temporary video file after uploading
          FileSystem.deleteAsync(fileUri)
            .then(() => {
              console.log('Temporary video file deleted');
            })
            .catch((error) => {
              console.log('Error deleting temporary video file: ', error);
            });

          // Get the download URL of the uploaded video
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setVideoUrls((prevUrls) => [...prevUrls, downloadURL].filter((url) => url !== null && url !== ""));

            // Save the video URL to Firebase Realtime Database
            firebase.database().ref('videos').push(downloadURL);

            // Save the video URLs locally using AsyncStorage
            saveVideoUrls([...videoUrls, downloadURL]);

            // Show an alert on successful upload
            Alert.alert('Video uploaded successfully');
          });
        }
      );
    } catch (error) {
      console.log('Error uploading video: ', error);
    }
  };


  const deleteVideoFromFirebase = async (videoUrl) => {
  try {
    Alert.alert(
      'Warning',
      'Are you sure you want to delete the video?',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
          onPress: () => console.log('Deletion canceled'),
        },
        {
          text: 'YES',
          onPress: async () => {
            const storageRef = firebase.storage().refFromURL(videoUrl);
            await storageRef.delete();

            const videoRef = firebase.database().ref('videos');
            const snapshot = await videoRef.orderByValue().equalTo(videoUrl).once('value');
            const key = Object.keys(snapshot.val())[0];
            await videoRef.child(key).remove();

            // Remove the video URL from the local state
            setVideoUrls((prevUrls) => prevUrls.filter((url) => url !== videoUrl));

            // Remove the video URL from AsyncStorage
            saveVideoUrls((prevUrls) => prevUrls.filter((url) => url !== videoUrl));

            // Show an alert on successful deletion
            Alert.alert('Success', 'Video deleted successfully');
          },
        },
      ]
    );
  } catch (error) {
    console.log('Error deleting video: ', error);
  }
};




  const renderVideoItem = ({ item }) => (
    <View style={{flex: 1, marginRight: 3}}>
      <Video
        source={{ uri: item }}
        style={{ width: 330 ,height: 420, marginRight: 7,}}
        // controls
        useNativeControls
        resizeMode="cover"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={{marginHorizontal: 50}}>
        <CustomButton
      label="Delete"
      onPress={() => deleteVideoFromFirebase(item)}  />
      </View>
    </View>
  );

  return (
    <View style={{backgroundColor: theme.background, flex: 1}}>
      <FlatList
        data={videoUrls} // Reverse the order of videoUrls
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderVideoItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {showActivityIndicator && <ActivityIndicator size="large" />}
      <View style={{marginBottom: 10, paddingHorizontal: 12}}>
        <CustomButton label="Upload a video" onPress={pickVideo} />
      </View>
    </View>
  );
}

export default VideoUploadScreen;