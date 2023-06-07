import { StyleSheet, Text, View, StatusBar, Platform, SafeAreaView, FlatList, Button, ScrollView, Image } from 'react-native';
import { useContext , useRef, useState} from 'react';
import React from 'react';
import { AuthContext } from '../authentication/Context';
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CustomTabs from './CustomTabs';
import Chats from './Chats';
import SpeechToText from './SpeechToText';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './DrawerNav';
import { Video, ResizeMode } from 'expo-av';
import Dictionary from './Dictionary'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Drawer = createDrawerNavigator();

const WelcomePage = () => {
  const navigation = useNavigation();
  // const { logout } = useContext(AuthContext);

  const data = [
  { id: 0, title: "Basic Signs", videoUri: require('../../img/mainApp/video1.mp4'), time: 3 },
  { id: 1, title: "Basic Signs 2", videoUri: require('../../img/mainApp/Video3.mp4'), time: 4 },
];


  const video = useRef(null);
  const [status, setStatus] = useState({});
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerIcons}>
        <Feather
          name="menu"
          size={26}
          color="black"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Ionicons name="notifications-outline" size={26} color="black" />
      </View>
      <View style={styles.flatlistView}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${index}`}
          renderItem ={({item, index}) => {
            return(
              <View style={styles.videoView}>
                {/* <Text>{item.title}</Text> */}
                      <Video
        ref={video}
        style={styles.video}
        source={item.videoUri}
        useNativeControls
        resizeMode="cover"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.textLabelContainer}>
                  <Text style={styles.textLabel}>Tap to play </Text>
                </View>
                {/* <Text>Duration is {item.time} mins</Text> */}
              </View>
            );
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
        />
      </View>
      <View style={{flex: 2.7, flexDirection: 'column'}}>
        <View style={styles.tabView}>
        <CustomTabs label={"Text\n to\n Speech"} onPress={() => navigation.navigate("Text to Speech")} color={"#65058E"} />
        <CustomTabs label={"Speech\n to\n Text"} onPress={() => navigation.navigate('Speech To Text')} color={"#2E8E05"} />
        </View>
        <View style={styles.tabView}>
        <CustomTabs label={"Need\n a\n translator?"} onPress={() => navigation.navigate('Speech To Text')} color={"#8E2005"} />
        <CustomTabs label={"Dictionary"} onPress={() => navigation.navigate('Dictionary')} color={"#05738E"} />
        </View>
        <CustomTabs label={"Learn Basic\n sign language"} onPress={() => navigation.navigate('Speech To Text')} color={"#052E8E"} />
      </View>
    </SafeAreaView>
  );
}

const DrawerNavigator = () => (
  <Drawer.Navigator 
  drawerContent={props => <CustomDrawer{...props}/>}
  screenOptions={{ headerShown: false, 
  drawerLabelStyle:{marginLeft: -25}, 
  fontSize: 15,
  // drawerContentStyle: { marginVertical: 0, }, // Adjust the vertical margin as per your needs
  drawerActiveBackgroundColor: '#42DA00',
  drawerInactiveTintColor: 'black',
  drawerActiveTintColor: '#fff',
   }}
   >
    <Drawer.Screen
      name="Welcome"
      component={WelcomePage}
      options={{
        drawerIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="Speech to Text"
      component={SpeechToText}
      options={{
        drawerIcon: ({ color, size }) => <Ionicons name="mic-outline" size={size} color= 'purple' />,
      }}
    />
    <Drawer.Screen
      name="Chats"
      component={Chats}
      options={{
        drawerIcon: ({ color, size }) => <Ionicons name="chatbubble-ellipses-outline" size={size} color="green" />,
      }}
    />
    <Drawer.Screen
      name="Settings"
      component={SpeechToText}
      options={{
        drawerIcon: ({ color, size }) => <Ionicons name="md-settings-outline" size={24} color="purple" />,
      }}
    />
      <Drawer.Screen
      name="Saved images"
      component={SpeechToText}
      options={{
        drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="file-image-outline" size={24} color="blue" />,
      }}
    />
    <Drawer.Screen
      name="Dictionary"
      component={Dictionary}
      options={{
        drawerIcon: ({ color, size }) => <AntDesign name="book" size={size} color='red'/>,
      }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
    paddingHorizontal: 14,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  flatlistView: {
    flex: 1.4,
    marginBottom: 20,

  },
  videoView: {
    flex: 1,
    marginRight: 10,
    width: 320,
    // borderWidth: 2,
    // borderColor: 'red'
  },
  tabView: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6
  },
  video: {
    flex: 1,
    height: 200,
    borderRadius: 10,
    // width: 320, 
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
