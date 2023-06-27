import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import themeContext from './ThemeContext';


const Settings = ({ navigation }) => {
  const theme = useContext(themeContext);

  const navigateToEditProfile = () => {
    navigation.navigate("Edit Profile");
  };


  const navigateToPrivacy = () => {
    // console.log("Privacy function");
    Alert.alert("Privacy & Security Options", 
    "All user information inputted on clearly app are kept secret from third parties. This is done to ensure confidentiality and in accordance with the government's privacy protection policies",
    )
  };

  const navigateToSubscription = () => {
    console.log("Subscription function");
  };

  const navigateToSupport = () => {
    // console.log("Support function");
    navigation.navigate('Help and Support');
  };

  const navigateToAbout = () => {
    Alert.alert("About Clearly App", 
    "Clearly App is a user-friendly mobile application designed specifically for individuals with special needs. The app aims to provide a range of features and functionalities to enhance accessibility, communication, and daily living for users.To ensure a positive user experience.",
    )
  };


  const accountItems = [
    {
      icon: "person-outline",
      text: "Account",
      action: navigateToEditProfile,
    },
    { icon: "lock-outline", text: "Privacy & Security", action: navigateToPrivacy },
    {
      icon: "credit-card",
      text: "Chat wallpaper",
      action: navigateToSubscription,
    },
    { icon: "help-outline", text: "Help & Support", action: navigateToSupport },
    {
      icon: "info-outline",
      text: "About",
      action: navigateToAbout,
    },
  ];

  
  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
        marginBottom: 25,
        
      }}
    >
      <MaterialIcons name={icon} size={24} color={theme.color}/>
      <Text
        style={{
          marginLeft: 36,
          fontWeight: 400,
          fontSize: 16,
          color: theme.color
        }}
      >
        {text}{" "}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <ScrollView style={{ marginHorizontal: 12 }}>
        {/* Account Settings */}
        <View style={{ marginBottom: 20 }}>
          {/* <Text style={{  marginVertical: 10 }}>Account</Text> */}
          <View
            style={{
              borderRadius: 12,
              marginBottom: 20
            }}
          >
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;