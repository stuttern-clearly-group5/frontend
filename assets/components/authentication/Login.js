import { StyleSheet, Text, View, Platform, StatusBar, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import CustomButton from './customButton';
import { AuthContext } from './Context';
import { initializeApp } from "firebase/app";
import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import themeContext from '../MainApp/ThemeContext';
import { Feather } from '@expo/vector-icons';


// Add your Firebase configuration here
// const firebaseConfig = {
//   apiKey: "AIzaSyDkNqRKourFdoXR3Zk2yGrXdUsXvteEi7E",
//   authDomain: "clearly-68c14.firebaseapp.com",
//   databaseURL: "https://clearly-68c14-default-rtdb.firebaseio.com/",
//   projectId: "clearly-68c14",
//   storageBucket: "clearly-68c14.appspot.com",
//   messagingSenderId: "254125968574",
//   appId: "1:254125968574:web:b70c4f21a757b8ff1c22ef"
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


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useContext(themeContext);
  

 const {login}                         = useContext(AuthContext);
 const navigation                      = useNavigation();
 const [showPassword, setShowPassword] = useState(false);
 const [isSelected, setSelection]      = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);


// const onSignInPressed = async (data) => {
//   try {
//     const { email, password } = data;
//     await firebase.auth().signInWithEmailAndPassword(email, password);
//     // Successfully logged in
//     login();
//   } catch (error) {
//     // Handle login error
//     console.log(error);
//   }
// };

  const onSignInPressed = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        login();
        // ...
      })
      .catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  Alert.alert('Error', 'Incorrect username/password');
  // console.log(error);
});
  };

  const onSubmit = async () => {
  try {
    await onSignInPressed();

    // If "Remember me" is enabled, save email and password to AsyncStorage
    if (isSelected) {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    }
  } catch (error) {
    console.log(error);
  }
};


  // const handleSignUp = () => {
  //   auth
  //   .createUserWithEmailAndPassword(email,password)
  //   .then(userCredentials => {
  //     const user = userCredentials.user;
  //     console.log(user.email);
  //   })
  //   .catch(error => alert(error.message))
  // }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

    // const toggleShowConfirmPassword = () => {
    //   setShowConfirmPassword(!showConfirmPassword);
    // };

    const toggleCheckbox = () => {
  // Step 1: Toggle the "rememberMe" state
  setSelection(!isSelected);

  // Step 2: Save the "rememberMe" state in AsyncStorage
  AsyncStorage.setItem('rememberMe', JSON.stringify(!isSelected));
};


  useEffect(() => {
    // Step 1: Retrieve the "rememberMe" state from AsyncStorage on component mount
    AsyncStorage.getItem('rememberMe')
      .then((value) => {
        if (value !== null) {
          setSelection(JSON.parse(value));
        }
      })
      .catch((error) => console.log(error));

    // Step 2: If "Remember me" is enabled, retrieve the saved email and password from AsyncStorage
    if (isSelected) {
      AsyncStorage.getItem('email')
        .then((savedEmail) => {
          if (savedEmail !== null) {
            setEmail(savedEmail);
          }
        })
        .catch((error) => console.log(error));

      AsyncStorage.getItem('password')
        .then((savedPassword) => {
          if (savedPassword !== null) {
            setPassword(savedPassword);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [isSelected]);



  return (
    <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
    <View         style = {{alignItems: 'center',}}>
      <Image 
      source = {require('../../img/authentication/clearlyLogoRemoveBg.png')}
      style  = {{width: 108.52, height: 38.57, marginTop: 33, marginBottom: 14.43}}
      />
      <Text style = {{fontSize: 24, fontWeight: 400, textAlign: 'center', marginTop: 10, color: theme.color}}>Login</Text>
      <Text style = {{fontSize: 14, fontWeight: 400, textAlign: 'center', color: '#8C8C8C', marginTop: 10}}>Welcome back. Please sign in to continue</Text>
      </View>
     <Text style = {[styles.inputLabel, { color: theme.color}]} >Email</Text>
        <Controller
  control={control}
  name="email"
  rules   = {{required : 'Email is required',
      pattern: {
    value  : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Must use a valid email',
  }
      }}
  render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
    <>
      <View style={[styles.inputBox, { borderColor: error ? 'red' : '#C8CDD0' }]}>
        <TextInput
          value={value}
          onChangeText={(text) => {
            onChange(text);
            setEmail(text); // Update the email state
            if (isSelected) {
              AsyncStorage.setItem('email', text); // Save the email in AsyncStorage
            }
          }}
          onBlur={onBlur}
          placeholder="stutern@gmail.com"
          keyboardType="email-address"
          placeholderTextColor="#D3D3D3"
        />
        <Image source={require('../../img/authentication/email.png')} style={{ width: 20, height: 20, tintColor: '#D3D3D3' }} />
      </View>
      {error && (
        <Text style={{ color: 'red', fontSize: 12 }}>{error.message || 'Input required'}</Text>
      )}
    </>
  )}
/>
<Text style = {[styles.inputLabel, { color: theme.color}]} >Password</Text>
<Controller
  control={control}
  name="password"
  rules   = {{required : 'Password is required', 
      minLength : {value : 8, message: 'Password should be at least 8 characters long',
      pattern: {
    value  : /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
    message: 'Password should contain at least 1 alphabet and 1 numeric value',
  },
      }}}
  render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
    <>
      <View style={[styles.inputBox, { borderColor: error ? 'red' : '#C8CDD0' }]}>
        <TextInput
          value={value}
          onChangeText={(text) => {
            onChange(text);
            setPassword(text); // Update the password state
            if (isSelected) {
              AsyncStorage.setItem('password', text); // Save the password in AsyncStorage
            }
          }}
          onBlur={onBlur}
          keyboardType="default"
          secureTextEntry={!showPassword}
          placeholder="xxxxxxxxxxxxx"
          placeholderTextColor="#D3D3D3"
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <View style={{ width: 20, height: 20, tintColor: '#D3D3D3' }} >
                  { showPassword ? <Feather name="eye" size={18} color="#D3D3D3" /> : <Feather name="eye-off" size={18} color="#D3D3D3" />}
                  </View>
        </TouchableOpacity>
      </View>
      {error && (
        <Text style={{ color: 'red', fontSize: 12 }}>{error.message || 'Input required'}</Text>
      )}
    </>
  )}
/>

    
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
  <TouchableOpacity onPress={toggleCheckbox}>
    <Text style={{ color: '#666', fontSize: 14, marginLeft: 8 }}>
      {isSelected ? 'Remembered' : 'Remember me'}
    </Text>
  </TouchableOpacity>
  <TouchableOpacity>
    <Text onPress={() => navigation.navigate('ForgotPassWord')} style={{ color: '#42DA00', fontSize: 14, fontWeight: 400 }}>Forgot password?</Text>
  </TouchableOpacity>
</View>


        <View>
              
      <CustomButton
        label="Login"
        onPress={handleSubmit(onSubmit)}
      />

        </View>
        <View style = {{flexDirection: 'row', justifyContent: 'center', marginTop: 10, alignItems: 'center', gap: 6}}>
        <Text style = {{color: '#666', fontSize: 14}}>Don't have an account? </Text>
    <TouchableOpacity onPress = {() => navigation.navigate('SignUp')}>
    <Text             style   = {{color: '#42DA00', fontSize: 16, fontWeight: 400}} >SignUp</Text>
    </TouchableOpacity>
    </View>
    <View style = {{ justifyContent: 'center', marginTop: 40, alignItems: 'center'}}>
    <Text style = {{color: '#666', fontSize: 14}}>Or SignUp with</Text>
    </View>
    <View style = {{justifyContent: 'center', marginTop: 20, alignItems: 'center', flexDirection: 'row', gap: 10}}>
<TouchableOpacity>
        <Image source = {require('../../img/authentication/GIcon.png')}
               style  = {{width: 40.87, height: 40.87,}}
      />
</TouchableOpacity>
<TouchableOpacity>
        <Image source = {require('../../img/authentication/twitter2.png')}
               style  = {{width: 40.87, height: 40.87,}}
      />
</TouchableOpacity>
  <TouchableOpacity>
        <Image source = {require('../../img/authentication/facebk2.jpg')}
               style  = {{width: 40.87, height: 40.87,}}
      />
  </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex             : 1,
        // marginTop        : Platform.OS === 'android' ? StatusBar.currentHeight: 0,
        backgroundColor  : "white",
        paddingHorizontal: 24,
    },
    inputLabel: {
        marginTop   : 15,
        marginBottom: 6,
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
    button: {
        backgroundColor: '#42DA00',
        borderRadius   : 20,
        alignContent   : 'center',
        paddingTop     : 15,
        paddingBottom  : 15,
        paddingLeft    : 12,
        paddingRight   : 12,
        marginTop      : 35,
    },
    }
)
