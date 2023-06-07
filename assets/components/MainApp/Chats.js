import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../../img/mainApp/user1.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../../img/mainApp/user2.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Good day, please can you help out with my homework?',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../../img/mainApp/user3.jpg'),
    messageTime: '1 hour ago',
    messageText:
      'This is just a reminder. The presentation starts by 6pm.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../../img/mainApp/user4.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Finally we made it to the project phase.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../../img/mainApp/user5.jpg'),
    messageTime: '2 days ago',
    messageText:
      'I really do hope we get selected by one or more recruiter.',
  },
    {
    id: '6',
    userName: 'Freda Hellen',
    userImg: require('../../img/mainApp/user6.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hi there, how are you doing?.',
  },
];

const Chats = () => {

  const navigation = useNavigation();

    return (
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("UserChat", {userName: item.userName})}>
              <View style={styles.userInfo}>
                <View style={styles.UserImgWrapper}>
                  <Image style={styles.userImg} source={item.userImg} />
                </View>
                <View style={styles.TextSection}>
                  <View style = {styles.UserInfoText}>
                    <Text style={styles.userName}>{item.userName}</Text>
                    <Text style={styles.PostTime}>{item.messageTime}</Text>
                  </View>
                  <Text style={styles.MessageText}>{item.messageText}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
  flex: 1,
  paddingLeft: 20,
  paddingRight: 20,
  alignItems: "center",
  backgroundColor: "#ffffff",
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
card: {
  width: "100%"
},
 userInfo : {
    flexDirection: "row",
  justifyContent: "space-between",
  },
  UserImgWrapper: {
    paddingTop: 15,
  paddingBottom: 15,
  },
  userImg: {
  width: 50,
  height: 50,
  borderRadius: 25,
  },
  TextSection: {
  flexDirection: "column",
  justifyContent: "center",
  padding: 15,
  paddingLeft: 0,
  marginLeft: 10,
  width: 300,
  borderBottomWidth: 1,
  borderBottomColor: "#cccccc",
  },
  UserInfoText: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 5,
  },
  userName :{
  fontSize: 14,
  fontWeight: "bold",
  // fontFamily: 'Lato-Regular',
  },
  PostTime: {
  fontSize: 12,
  color: "#666", 
  marginRight: 29,
  // fontFamily: 'Lato-Regular',
  },
  MessageText: {
  fontSize: 14,
  color: "#333333",
  },
});