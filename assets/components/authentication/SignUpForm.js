import { StyleSheet, Text, View, Platform, StatusBar, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import CustomButton from './customButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
  // import { auth } from './FireBase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { value } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';

library.add(faCheckSquare);

const SignUpForm = () => {
  const {control, handleSubmit, formState: {error}, watch}   = useForm();
  const pwd = watch('password');
  const navigation                                    = useNavigation();
  const [showPassword, setShowPassword]               = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const onSignUpPressed = (data) => {
  // console.log(data);
  navigation.navigate("EmailVerify");
}

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

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <SafeAreaView style                        = {styles.container}>
    <ScrollView   showsVerticalScrollIndicator = {false} >
    <View         style                        = {{alignItems: 'center',}}>
      <Image 
      source = {require('../../img/authentication/clearlyLogo.png')}
      style  = {{width: 108.52, height: 38.57, marginTop: 33, marginBottom: 14.43}}
      />
      <Text style = {{fontSize: 24, fontWeight: 400, textAlign: 'center'}}>Get Started</Text>
      <Text style = {{fontSize: 14, fontWeight: 400, textAlign: 'center', color: '#8C8C8C'}}>Create your account now</Text>
      </View>
     <Text style = {styles.inputLabel} >Full name</Text>
         <Controller
      control = {control}
      name    = "Full name"
      rules   = {{required : 'Full name is required', minLength: {value : 3, message: 'Full name must be at least 3 characters long'}}}
      render  = {({field: {value, onChange, onBlur}, fieldState : {error}}) => (
     <>
     <View      style  = {[styles.inputBox, { borderColor: error ? 'red': '#C8CDD0' }]}>
     <TextInput value  = {value} onChangeText                                      = {onChange}  onBlur = {onBlur} placeholder = 'John Doe' keyboardType = 'default' placeholderTextColor= '#D3D3D3' />
     <Image     source = {(require('../../img/authentication/Profile.png'))} style = {{width: 20, height: 20, tintColor: '#D3D3D3'}}/>
     </View>
         {error && (
    <Text style = {{color: 'red', fontSize: 12}}>{error.message || 'Input required'}</Text>
    )}
     </>
    )}
    />  

        <Text style = {styles.inputLabel} >Username</Text>
         <Controller
      control = {control}
      name    = "Username"
      rules   = {{required : 'Username is required', minLength: {value : 3, message: 'username must be at least 3 characters long'}}}
      render  = {({field: {value, onChange, onBlur}, fieldState : {error}}) => (
     <>
     <View      style  = {[styles.inputBox, { borderColor: error ? 'red': '#C8CDD0' }]}>
     <TextInput value  = {value} onChangeText                                      = {onChange}  onBlur = {onBlur} placeholder = 'John' keyboardType = 'default' placeholderTextColor= '#D3D3D3' />
     <Image     source = {(require('../../img/authentication/Profile.png'))} style = {{width: 20, height: 20, tintColor: '#D3D3D3'}}/>
     </View>
         {error && (
    <Text style = {{color: 'red', fontSize: 12}}>{error.message || 'Input required'}</Text>
    )}
     </>
    )}
    />      

      <Text style = {styles.inputLabel} >Email</Text>
        <Controller
      control = {control}
      name    = "email"
      rules   = {{required : 'Email is required',
      pattern: {
    value  : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Must use a valid email',
  }
      }}
      render={({field: {value, onChange, onBlur}, fieldState : {error}}) => (
     <>
     <View      style  = {[styles.inputBox, { borderColor: error ? 'red': '#C8CDD0' }]}>
     <TextInput value  = {value} onChangeText                                    = {onChange}  onBlur = {onBlur} placeholder = 'stutern@gmail.com' keyboardType = 'email-address' placeholderTextColor= '#D3D3D3' />
     <Image     source = {(require('../../img/authentication/email.png'))} style = {{width: 20, height: 20, tintColor: '#D3D3D3'}}/>
     </View>
         {error && (
    <Text style = {{color: 'red', fontSize: 12}}>{error.message || 'Input required'}</Text>
    )}
     </>
    )}
    />      
        <Text style = {styles.inputLabel} >Password</Text>
       <Controller
      control = {control}
      name    = "password"
      rules   = {{required : 'Password is required', 
      minLength : {value : 8, message: 'Password should be at least 8 characters long',
      pattern: {
    value  : /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
    message: 'Password should contain at least 1 alphabet and 1 numeric value',
  },
      }}}
      render={({field: {value, onChange, onBlur}, fieldState : {error}}) => (
     <>
     <View             style   = {[styles.inputBox, { borderColor: error ? 'red': '#C8CDD0' }]}>
     <TextInput        value   = {value} onChangeText                                     = {onChange}  onBlur = {onBlur} placeholder = 'xxxxxxxxxx' keyboardType = 'default' secureTextEntry = {!showPassword} placeholderTextColor= '#D3D3D3' />
     <TouchableOpacity onPress = {toggleShowPassword}>
     <Image            source  = {require('../../img/authentication/password.png')} style = {{ width: 20, height: 20, tintColor: '#D3D3D3' }} />
      </TouchableOpacity>
     </View>
         {error && (
    <Text style = {{color: 'red', fontSize: 12}}>{error.message || 'Input required'}</Text>
    )}
     </>
    )}
    />        

     <Text style = {styles.inputLabel}>Confirm Password</Text>
       <Controller
      control = {control}
      name    = "confirm password"
      rules   = {{
            validate: value => value === pwd || 'Password does not match',
          }}
      render={({field: {value, onChange, onBlur}, fieldState : {error}}) => (
     <>
     <View             style   = {[styles.inputBox, { borderColor: error ? 'red': '#C8CDD0' }]}>
     <TextInput        value   = {value} onChangeText                                     = {onChange}  onBlur = {onBlur} placeholder = 'xxxxxxxxxx' keyboardType = 'default' secureTextEntry = {!showConfirmPassword} placeholderTextColor= '#D3D3D3' />
     <TouchableOpacity onPress = {toggleShowConfirmPassword}>
     <Image            source  = {require('../../img/authentication/password.png')} style = {{ width: 20, height: 20, tintColor: '#D3D3D3' }} />
      </TouchableOpacity>
     </View>
         {error && (
    <Text style = {{color: 'red', fontSize: 12}}>{error.message || 'Input required'}</Text>
    )}
     </>
    )}
    /> 

        <View>
        <CustomButton label = {"Sign Up"}

          //handle submit helps connect the text input fields to the button.
        onPress = {handleSubmit(onSignUpPressed)}

          // onPress={handleSignUp}
        />
        </View>
      <View style = {{ justifyContent: 'center', marginTop: Platform.OS === 'android' ? 7 : 40, alignItems: 'center'}}>
      <Text style = {{color: '#666', fontSize: 14}}>Or SignUp with</Text>
    </View>
    <View style = {{justifyContent: 'center', marginTop: 20, alignItems: 'center', flexDirection: 'row', gap: 10, marginBottom: 20}}>
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
    </ScrollView>
    </SafeAreaView>
  )
}

export default SignUpForm;

const styles = StyleSheet.create({
    container: {
        flex             : 1,
        marginTop        : Platform.OS === 'android' ? StatusBar.currentHeight: 0,
        backgroundColor  : "white",
        paddingHorizontal: 24,
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