import { StyleSheet, Text, View, StatusBar, Platform, SafeAreaView, TextInput, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import CustomButton from './customButton';


library.add(faEnvelope);

const EmailVerify = () => {
  const navigation = useNavigation();
 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Please verify your email</Text>
      <FontAwesomeIcon icon={faEnvelope} bounce style={{ color: '#42da00', alignSelf: 'center', marginTop: 30 }} size={120} />
      <Text style={{fontSize: 12, marginBottom: 42}}>we have sent a mail to stutern@gmail.com. Kindly click on the link in the mail to verify your email address.</Text>  
      

      <CustomButton label={"Open Email App"} onPress={() => navigation.navigate('SecondEmailVerify')}/>
      <Text style={{fontSize: 12, textAlign: 'center', marginTop: 22}}>Can't find the mail? check your Spam folder.</Text>
    </SafeAreaView>
  );
};
<FontAwesomeIcon icon="fa-duotone fa-envelope" style={{"--fa-primary-color": "#56da00", "--fa-secondary-color": "#56da00",}} />
export default EmailVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 24,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '400',
    marginTop: 82,
  },

});
