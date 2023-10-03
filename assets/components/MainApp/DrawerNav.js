import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, Share, Linking } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useContext } from 'react';
import { AuthContext } from '../authentication/Context';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import greenLogoNew from '../../img/mainApp/greenLogoNew.png'
import themeContext from './ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { onPress } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const recipientEmail = "stutern@gmail.com";
  const emailSubject = "Feedback from the App";
  const emailBody = "Dear Stutern Team,\n\nI have some feedback regarding the app: ";

    const shareAppLink = async () => {
  try {
    const result = await Share.share({
      message: 'Check out this cool app!, https://expo.dev/artifacts/eas/6zcWEo3xwzyB5TDAsoSPsX.apk',
      url: 'https://expo.dev/artifacts/eas/6zcWEo3xwzyB5TDAsoSPsX.apk', // Replace this with the URL of your app in the app store
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Shared with activity type of result.activityType
      } else {
        // Shared
      }
    } else if (result.action === Share.dismissedAction) {
      // Dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};


    const Privacy = () => {
    // console.log("Privacy function");
    Alert.alert("Privacy Policy", 
    "All user information inputted on clearly app are kept secret from third parties. This is done to ensure confidentiality and in accordance with the government's privacy protection policies.",
    )
  };

  const Feedback = async () => {
    const mailtoUrl = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;
    
    try {
      await Linking.openURL(mailtoUrl);
    } catch (error) {
      Alert.alert("Error", "Failed to open email client. Please check your email settings.");
    }
  };

  const Ratings = () => {
    // console.log("Privacy function");
    onPress(() => navigation.navigate("Ratings"));
  };

    const { logout } = useContext(AuthContext);
    const theme = useContext(themeContext);
    return(
        // <ScrollView>
        <View style={{flex: 1, backgroundColor: theme.background}}>
        <DrawerContentScrollView {...props}>
        <View style={{height: 110, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2E8E05'}}>
        <Image
            source={greenLogoNew}
            style={{width: 150, height: 40,}}
        />
        </View>
        {/* <Text style={{paddingHorizontal: 24, color: '#C5C5C5', marginBottom: 3, fontSize: 8  }}>General</Text> */}
            <View style={{backgroundColor: theme.background}}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
        <View style={{ paddingHorizontal: 24, borderTopWidth: 1, borderTopColor: '#C5C5C5', backgroundColor: theme.background}}>
        {/* <Text style={{ color: '#C5C5C5', marginBottom: 3, fontSize: 8 }}>Others</Text> */}
                <TouchableOpacity onPress={Ratings} style={{paddingVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: theme.background}}>
                <Entypo name="thumbs-up" size={22} color="#42DA00" />
                <Text style={{fontSize: 15, marginLeft: 5, color: theme.color }} >Rate Us</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={shareAppLink} style={{paddingVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="share-social-outline" size={22}  color= {theme.color}/>
                <Text style={{fontSize: 15, marginLeft: 5,  color: theme.color  }} >Share App Link</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={Feedback} style={{paddingVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="chat-bubble-outline" size={22} color="red" />
                <Text style={{fontSize: 15, marginLeft: 5,  color: theme.color  }} >Feedback</Text>
            </View>
            </TouchableOpacity>
                <TouchableOpacity onPress={Privacy} style={{paddingVertical: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <MaterialIcons name="privacy-tip" size={22} color="purple" />
                <Text style={{fontSize: 15, marginLeft: 5,  color: theme.color }} >Privacy Policy</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { logout() }} style={{paddingVertical: 10}}>
            <View style={{marginBottom: 67,flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="exit-outline" size={22}  color= {theme.color} />
                <Text style={{fontSize: 15, marginLeft: 5, fontWeight: 'bold',  color: theme.color }} >Sign out</Text>
            </View>
            </TouchableOpacity>
        </View>
        </View>
        // {/* </ScrollView> */}
        
    )
}

export default CustomDrawer;