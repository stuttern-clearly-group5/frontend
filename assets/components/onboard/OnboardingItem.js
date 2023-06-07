import { StyleSheet, Text, View, Image, useWindowDimensions, SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'

const OnboardingItem = ({item}) => {
const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image source={item.image} style={[styles.image, {width , resizeMode: 'contain', }]}/>
      <View style={{flex: 0.3, marginTop: -40}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    image: {
        flex: 0.7,
        justifyContent: 'center',
    },
    title: {
        fontWeight: '400',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center', 
    },
    description: {
        fontWeight: '300',
        fontSize: 12,
        textAlign: 'center',
        paddingHorizontal: 24,
    }
})