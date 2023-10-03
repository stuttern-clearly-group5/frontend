import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import themeContext from './ThemeContext';


const History = () => {
  const theme = useContext(themeContext);

  return (
    <ScrollView style={{backgroundColor: theme.background}}>
    <SafeAreaView style={{flex: 1, marginHorizontal: 24, backgroundColor: theme.background}}>
    <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8, color: theme.color}}>Introduction:</Text>
      <Text style={{marginBottom: 10, color: theme.color, width: 320}}>
        Apps and technologies for deaf and mute (also known as non-verbal) individuals have evolved significantly over the years, 
        aiming to enhance communication, accessibility, and inclusivity for this community. Here's a brief history of apps for deaf and mute people:
      </Text>
      <View>
        <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8, color: theme.color}}>Early Communication Devices:</Text>
        <Text style={{color: theme.color, width: 320}}>
        Before smartphones and mobile apps, early communication devices for deaf and mute individuals included TTY (Text Telephone) machines. 
        These machines allowed users to communicate through typed text over telephone lines in the 1960s.{'\n'}
        
        </Text>
      </View>
      <View>
        <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8, color: theme.color}}>Video Relay Service (VRS):</Text>
        <Text style={{color: theme.color, width: 320}}>
        In the 1990s, VRS was introduced, allowing deaf individuals to communicate with hearing individuals via sign
        language interpretation over video calls. This technology provided greater accessibility and enabled more seamless communication.
        </Text>
      </View>
      <View>
        <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8, color: theme.color}}>Early Mobile Apps: </Text>
        <Text style={{color: theme.color, width: 320}}>
            With the advent of smartphones, basic communication apps emerged, offering texting and instant messaging for deaf individuals. 
            These apps were not specifically designed for the deaf and mute community but provided a new way of communication.
        </Text>
      </View>
      <View>
      <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8, color: theme.color}}>Sign Language Apps:</Text>
        <Text style={{color: theme.color, width: 320}}>
            As technology advanced, mobile apps focused on teaching sign language became available. These apps offered interactive lessons and 
            videos to help both deaf and hearing individuals learn sign language.
        </Text>
      </View>
      <View>
      <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8, color: theme.color}}>Speech-to-Text Apps:</Text>
        <Text style={{color: theme.color, width: 320}}>
            Speech-to-text apps started to gain popularity, enabling non-verbal individuals to communicate by speaking into their devices, 
            which then converted the speech to written text.
        </Text>
      </View>
      <View>
      <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8, color: theme.color}}>Augmentative and Alternative Communication (AAC) Apps: </Text>
        <Text style={{color: theme.color, width: 320}}>
             AAC apps became more prevalent, offering a range of features like symbol-based communication, customizable vocabularies, and voice output. These apps 
             provided powerful tools for non-verbal individuals to express themselves.
        </Text>
      </View>
      <View>
      <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8, color: theme.color}}>Real-time Translation Apps: </Text>
        <Text style={{color: theme.color, width: 320}}>
             In recent years, apps capable of real-time translation of sign language into spoken or written language and vice versa have emerged. These apps have the 
             potential to bridge communication gaps between the deaf and hearing communities further.
        </Text>
      </View>
      <View>
      <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8, color: theme.color}}>Inclusive Social Media and Communication Platforms: </Text>
        <Text style={{color: theme.color, width: 320}}>
             Mainstream social media platforms and communication apps started implementing accessibility features such as closed captioning, auto-generated captions, 
             and AI-based sign language recognition to make communication more inclusive for the deaf and mute community.
             {'\n'}
             {'\n'}
             Throughout this evolving history, the apps and technologies designed for deaf and mute individuals have played a significant role in breaking down 
             communication barriers and promoting inclusivity. As technology continues to advance, it is expected that more innovative and empowering apps will 
             be developed to further enhance communication and accessibility for this community.
             {'\n'}
        </Text>
      </View>
    </SafeAreaView>
    </ScrollView>
  )
}

export default History;

const styles = StyleSheet.create({})