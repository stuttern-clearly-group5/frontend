import { StyleSheet, Text, View, Platform, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from './customButton';
import { useNavigation } from '@react-navigation/native';

const SecondEmailVerify = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <MaterialCommunityIcons name="human-female-dance" size={104} color="#56da00" style={styles.Icon} />
      <Text style={styles.text}>Your email has been successfully verified. Let's get started.</Text>
      <View>
        <CustomButton label={"Continue"} onPress={() => navigation.navigate('CodeScreen')}/>
      </View>
    </SafeAreaView>
  )
}

export default SecondEmailVerify;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 24,
    },
    Icon: {
        marginTop: 147.22,
        alignSelf: 'center',
        marginBottom: 50,
    },
    text: {
        textAlign: 'center',
        fontSize: 14,
        paddingHorizontal: 24,
        marginBottom: 10,
    }

})