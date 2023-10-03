import React, {useState, useEffect, useCallback, useContext, useLayoutEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Bubble, GiftedChat, Send, Avatar} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import themeContext from './ThemeContext';
import { getFirestore, collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore";
import { getAuth , onAuthStateChanged} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigation } from '@react-navigation/native';


const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const theme = useContext(themeContext);

    // // Add your Firebase configuration here
  // const firebaseConfig = {
  // apiKey: "AIzaSyDkNqRKourFdoXR3Zk2yGrXdUsXvteEi7E",
  // authDomain: "clearly-68c14.firebaseapp.com",
  // databaseURL: "https://clearly-68c14-default-rtdb.firebaseio.com/",
  // projectId: "clearly-68c14",
  // storageBucket: "clearly-68c14.appspot.com",
  // messagingSenderId: "254125968574",
  // appId: "1:254125968574:web:b70c4f21a757b8ff1c22ef"
  // };

  const firebaseConfig = {
  apiKey: "AIzaSyA5GSaE8hAAAZqVyi7dUB9jG33As-Ft_T8",
  authDomain: "clearlyapp2-38773.firebaseapp.com",
  databaseURL: "https://clearlyapp2-38773-default-rtdb.firebaseio.com/",
  projectId: "clearlyapp2-38773",
  storageBucket: "clearlyapp2-38773.appspot.com",
  messagingSenderId: "649929654576",
  appId: "1:649929654576:web:2e5e648e7521a61ff848f5"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getFirestore(app);
  const navigation = useNavigation();

  useEffect(() => {
    // Authenticate the user before rendering the component
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, proceed with setting up the chat
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
          {
            _id: 2,
            text: 'Hello world',
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ]);
      } else {
        navigation.navigate('Welcome')
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (Snapshot) => {
      // console.log('Snapshot unsubscribe');
      setMessages(
        Snapshot.docs.map((doc) => ({
          _id: doc.id,
          key: doc.id.toString(), // Add the key prop here
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          avatar: doc.data().avatar,
        }))
      );
    });
    return unsubscribe;
  }, []);

    const onSend = useCallback((messages = []) => {
  setMessages((previousMessages) => {
    const updatedMessages = GiftedChat.append(previousMessages, messages);
    return updatedMessages.map((message) => ({
      ...message,
      key: message._id.toString(),
    }));
  });

  const { _id, createdAt, text, user } = messages[0];

  // Make sure user._id is defined
  const userId = user?._id || ''; // Provide a default value if user._id is undefined
  const userAvatar = user?.avatar || 'https://i.pravatar.cc/300'; // Get the avatar value from user.avatar or provide a default value

  addDoc(collection(database, 'chats'), {
    _id,
    createdAt,
    text,
    user: { _id: userId },
    avatar: userAvatar,
  });
}, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#33AA00"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#33AA00',
          },
        }}
        textStyle={{
          right: {
            color: theme.color,
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

//   const renderAvatar = (props) => {
//   return (
//     <Avatar
//       {...props}
//       imageStyle={{
//         left: {
//           backgroundColor: 'gray',
//           // resizeMode: 'cover', // Optional: specify the resizeMode to fit the image within the avatar
//         },
//       }}
//       renderAvatar={(avatarProps) => {
//         const { currentMessage } = avatarProps;
//         const avatarUrl = currentMessage.user.avatar || 'https://i.pravatar.cc/300';

//         return <Image source={{ uri: avatarUrl }} style={styles.avatar} />;
//       }}
//     />
//   );
// };


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        showUserAvatar={true}
        onSend={onSend}
        user={{
          _id: auth.currentUser?.email || '',
          avatar: 'https://i.pravatar.cc/300'
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        // renderAvatar={renderAvatar}
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


//CHAT CONNECTED TO FIREBASE/FIRESTORE

// import React, {useState, useEffect, useCallback, useContext, useLayoutEffect} from 'react';
// import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
// import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import themeContext from './ThemeContext';
// import { getFirestore, collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { initializeApp } from "firebase/app";

// // Add your Firebase configuration here
// const firebaseConfig = {
//   apiKey: "AIzaSyDkNqRKourFdoXR3Zk2yGrXdUsXvteEi7E",
//   authDomain: "clearly-68c14.firebaseapp.com",
//   databaseURL: "https://clearly-68c14-default-rtdb.firebaseio.com/",
//   projectId: "clearly-68c14",
//   storageBucket: "clearly-68c14.appspot.com",
//   messagingSenderId: "254125968574",
//   appId: "1:254125968574:web:b70c4f21a757b8ff1c22ef"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const database = getFirestore(app);

// const UserChat = () => {
//   const [messages, setMessages] = useState([]);
//   const theme = useContext(themeContext);

//   useLayoutEffect(() => {
//     const collectionRef = collection(database, 'chats');
//     const q = query(collectionRef, orderBy('createdAt', 'desc'));

//     const unsubscribe = onSnapshot(q, (Snapshot) => {
//       console.log('Snapshot unsubscribe');
//       setMessages(
//         Snapshot.docs.map((doc) => ({
//           _id: doc.id,
//           key: doc.id.toString(), // Add the key prop here
//           createdAt: doc.data().createdAt.toDate(),
//           text: doc.data().text,
//           user: doc.data().user,
//           avatar: doc.data().avatar,
//         }))
//       );
//     });
//     return unsubscribe;
//   }, []);

//   const onSend = useCallback((messages = []) => {
//   setMessages((previousMessages) => {
//     const updatedMessages = GiftedChat.append(previousMessages, messages);
//     return updatedMessages.map((message) => ({
//       ...message,
//       key: message._id.toString(),
//     }));
//   });

//   const { _id, createdAt, text, user } = messages[0];

//   // Make sure user._id is defined
//   const userId = user?._id || ''; // Provide a default value if user._id is undefined
//   const userAvatar = user?.avatar || 'https://i.pravatar.cc/300'; // Get the avatar value from user.avatar or provide a default value

//   addDoc(collection(database, 'chats'), {
//     _id,
//     createdAt,
//     text,
//     user: { _id: userId },
//     avatar: userAvatar,
//   });
// }, []);




//   const scrollToBottomComponent = () => {
//     return <FontAwesome name='angle-double-down' size={22} color='#333' />;
//   };

//   const renderSend = (props) => {
//     return (
//       <Send {...props}>
//         <View>
//           <MaterialCommunityIcons
//             name='send-circle'
//             style={{ marginBottom: 5, marginRight: 5 }}
//             size={32}
//             color='#33AA00'
//           />
//         </View>
//       </Send>
//     );
//   };

//     const renderBubble = (props) => {
//   const isSentMessage = props?.position === 'right';

//   return (
//     <Bubble
//       {...props}
//       wrapperStyle={{
//         left: {
//           backgroundColor: '#C4C4C4', // Background color for received messages
//         },
//         right: {
//           backgroundColor: '#33AA00', // Background color for sent messages
//         },
//       }}
//       textStyle={{
//         left: {
//           color: '#000000', // Text color for received messages
//         },
//         right: {
//           color: '#FFFFFF', // Text color for sent messages
//         },
//       }}
//       containerStyle={{
//         left: {
//           marginLeft: isSentMessage ? 0 : 10, // Adjust left margin for received messages
//           marginRight: isSentMessage ? 10 : 0, // Adjust right margin for sent messages
//         },
//         right: {
//           marginLeft: isSentMessage ? 0 : 10, // Adjust left margin for sent messages
//           marginRight: isSentMessage ? 10 : 0, // Adjust right margin for received messages
//         },
//       }}
//     />
//   );
// };



//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       <GiftedChat
//         messages={messages}
//         onSend={(messages) => onSend(messages)}
//         user={{
//           _id: auth?.currentUser?.email,
//           avatar: 'https://i.pravatar.cc/300',
//         }}
//         renderBubble={renderBubble}
//         alwaysShowSend
//         renderSend={renderSend}
//         scrollToBottom
//         scrollToBottomComponent={scrollToBottomComponent}
//       />
//     </View>
//   );
// };

// export default UserChat;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
