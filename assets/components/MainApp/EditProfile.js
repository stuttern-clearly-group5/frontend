import { Platform, StyleSheet, Text, View, StatusBar, SafeAreaView,  TouchableOpacity, ImageBackground, TextInput, Image} from 'react-native'
import React, { createRef, useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../authentication/CustomInput';
import {useForm} from 'react-hook-form';
import { useTheme } from 'react-native-paper';
import CustomButton from '../authentication/customButton';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import * as ImagePicker from 'expo-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';




const EditProfile = () => {
const {control, handleSubmit, formState: {error}, watch} = useForm();
const {colors}                                           = useTheme();

const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
const [image, setImage]                               = useState('https://source.unsplash.com/80x80/?avatar');


useEffect(() => {
    (async() => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
}, []);


const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
          //set media options to all if you want to access both images and videos.
        mediaTypes   : ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect       : [4, 3],
        quality      : 1,
    })

      // console.log(result);

if (!result.canceled) {
    setImage(result.assets[0].uri);
    bs.current.snapTo(1);
}

    // setImage(result.assets[0].uri);


};

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes   : ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect       : [4, 3],
      quality      : 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      bs.current.snapTo(1);
    }
    // setImage(result.assets[0].uri);
  };

if(hasGalleryPermission === false){
    return <Text>No access to Internal Storage</Text>
}


  //Bottom Sheet components.
bs   = createRef();
fall = new Animated.Value(1);

const renderInner = () => (
    <View style = {styles.panel}>
    <View style = {{alignItems: 'center'}}>
    <Text style = {styles.panelTitle}>Upload Photo</Text>
    <Text style = {styles.panelSubtitle}>Choose Your Profile Picture</Text>
    </View>
    <TouchableOpacity style = {styles.panelButton} onPress = {takePhoto}>
    <Text             style = {styles.panelButtonTitle}>Take a Photo</Text>
    </TouchableOpacity>
        <TouchableOpacity style = {styles.panelButton} onPress = { () => pickImage()}>
        {image && <Image source = {{uri: image}}/>}
        <Text style = {styles.panelButtonTitle}>Choose from Gallery</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress = {() => bs.current.snapTo(1)}
                      style   = {styles.panelButton}>
    <Text             style   = {styles.panelButtonTitle}>Cancel</Text>
    </TouchableOpacity>
    </View>
)

const renderHeader = () => (
        <View style = {styles.header}>
        <View style = {styles.panelHeader}>
        <View style = {styles.panelHandle}>

            </View>
        </View>
    </View>
)

  return (
    <SafeAreaView style = {styles.container}>
    <BottomSheet
        ref                       = {bs}
        snapPoints                = {[330, 0]}
        renderContent             = {renderInner}
        renderHeader              = {renderHeader}
        initialSnap               = {1}
        callbackNode              = {fall}
        enabledGestureInteraction = {true}
    />
      <Animated.View style={{margin: 20, paddingHorizontal: 24,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
      }}>
        <View             style   = {{alignItems: 'center'}}>
        <TouchableOpacity onPress = {() => bs.current.snapTo(0)}>
        <View             style   = {{
                    height        : 100,
                    width         : 100,
                    borderRadius  : 15,
                    justifyContent: 'center',
                    alignItems    : 'center'
                }}>
                    <ImageBackground
                    source={{
                        uri: image,
                    }}
                    style      = {{height: 100, width: 100}}
                    imageStyle = {{borderRadius: 100}}
                    >
                        <TouchableOpacity onPress = {takePhoto}
                                          style   = {{backgroundColor: '#2E8E05',  justifyContent: 'center', alignItems: 'center', borderRadius: 100, height:28, width: 28, position: 'absolute', top: 80, left: 70}}>
                        <Ionicons         name    = "camera-outline" size = {18} color = "white"
                                          style   = {{
                                    opacity       : 0.7,
                                    alignItems    : 'center',
                                    justifyContent: 'center',
                                    borderWidth   : 1,
                                    borderColor   : '#fff',
                                    borderRadius  : 10
                                                                }}
                             />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        </View>
      </Animated.View>
      {/* <View style={styles.action}>
      <TextInput
        placeholder          = 'Username'
        placeholderTextColor = '#666666'
        style                = {[styles.textInput, {
            color            : colors.text,
            textAlignVertical: 'center',
        }]}
        autoCorrect = {false}
      />
      </View> */}
      <View style = {{paddingHorizontal: 24,}}>
        <CustomInput
          name        = "Username"
          control     = {control}
          placeholder = "Username"
          rules       = {{
            required: 'Username is required',
          }}
        />
        <CustomInput
          name         = "Email"
          control      = {control}
          placeholder  = "stutern@yahoo.com"
          keyboardType = 'email-address'
          rules        = {{
            required: 'Email is required',
          }}
        />
        <CustomInput
          name         = "Phone number"
          control      = {control}
          placeholder  = "+234 07060000000"
          keyboardType = 'phone-pad'
          rules        = {{
            required: 'Phone number is required',
          }}
        />
        <CustomInput
          name        = "Gender"
          control     = {control}
          placeholder = "Male/Female"
          rules       = {{
            required: 'Select Gender',
          }}
        />
        <CustomInput
          name        = "Date of Birth"
          control     = {control}
          placeholder = "14/03/1987"
          rules       = {{
            required: 'Enter DOB',
          }}
        />
      </View>
      <View style = {{paddingHorizontal: 24,}}>
        <CustomButton
            label   = {"Save changes"}
            onPress = {() => {}}
        />
      </View>
    </SafeAreaView>
  )
}

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
      // backgroundColor: 'white',
      // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      // paddingHorizontal: 24,

  },
  commandButton: {
    padding        : 15,
    borderRadius   : 10,
    backgroundColor: '#FF6347',
    alignItems     : 'center',
    marginTop      : 10,
  },
  panel: {
    padding        : 20,
    backgroundColor: '#FFFFFF',
    paddingTop     : 20,
    height         : 330,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor    : '#333333',
    shadowOffset   : {width: -1, height: -3},
    shadowRadius   : 2,
    shadowOpacity  : 0.4,
      // elevation: 5,
    paddingTop          : 20,
    borderTopLeftRadius : 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width          : 40,
    height         : 8,
    borderRadius   : 4,
    backgroundColor: '#00000040',
    marginBottom   : 10,
  },
  panelTitle: {
    fontSize: 27,
    height  : 35,
  },
  panelSubtitle: {
    fontSize    : 14,
    color       : 'gray',
    height      : 30,
    marginBottom: 10,
  },
  panelButton: {
    padding        : 13,
    borderRadius   : 10,
    backgroundColor: '#42DA00',
    alignItems     : 'center',
    marginVertical : 7,
  },
  panelButtonTitle: {
    fontSize  : 17,
    fontWeight: 'bold',
    color     : 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop    : 10,
    marginBottom : 10,
    borderWidth  : 1,
    borderColor  : '#66666666',
    padding      : 10,
    borderRadius : 8,
  },
  actionError: {
    flexDirection    : 'row',
    marginTop        : 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom    : 5,
  },
  textInput: {
    flex       : 1,
    marginTop  : Platform.OS === 'ios' ? 0: -12,
    paddingLeft: 10,
    color      : '#05375a',
  },
      inputLabel: {
        marginTop   : 6,
        marginBottom: 4,
        fontSize    : 14,
        fontWeight  : 400
    },
        inputBox: {
        flexDirection : 'row',
        borderWidth   : 1.5,
        borderRadius  : 5,
        paddingLeft   : 12,
        paddingRight  : 12,
        paddingTop    : 8,
        paddingBottom : 8,
        alignItems    : 'center',
        justifyContent: 'space-between'
    },
});