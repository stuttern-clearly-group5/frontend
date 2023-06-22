import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'


const HelpAndSupport = () => {
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
    <SafeAreaView style={{flex: 1, marginHorizontal: 24, backgroundColor: 'white'}}>
    <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8}}>Introduction:</Text>
      <Text style={{marginBottom: 10}}>
        Clearly App is a user-friendly mobile application designed specifically 
        for individuals with special needs. The app aims to provide a range of features
        and functionalities to enhance accessibility, communication, and daily living for users. 
        To ensure a positive user experience, the Clearly App team is dedicated to offering comprehensive 
        help and support to address any concerns or inquiries that users may have.
      </Text>
      <View>
        <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8}}>User Guides and Tutorials:</Text>
        <Text>
            Clearly App offers detailed user guides and tutorials to assist users in understanding the app's 
            features and functionalities. These resources provide step-by-step instructions, visual aids, and 
            practical examples to help users navigate the app effectively. The user guides are available within 
            the app and can be accessed at any time, offering a self-help option for users who prefer independent
             learning.
        </Text>
      </View>
      <View>
        <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8}}>In-App Help Center:</Text>
        <Text>
            The Clearly App incorporates an in-app help center that serves as a centralized hub for user assistance. 
            The help center features a comprehensive knowledge base, frequently asked questions (FAQs), and troubleshooting 
            guides. Users can browse through the help center to find answers to common queries, explore solutions for technical 
            issues, and gain a better understanding of the app's capabilities.
        </Text>
      </View>
      <View>
        <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8}}>Email Support:</Text>
        <Text>
            Users can also reach out to the Clearly App support team through email <Text style={{color: '#2E8E05', fontWeight: 600}}>(stutern@gmail.com)</Text>. By sending an email to the designated support 
            address, users can explain their concerns or request additional information. The support team strives to respond promptly, 
            addressing user queries, troubleshooting issues, and offering personalized support whenever required.
        </Text>
      </View>
      <View>
      <Text style={{fontWeight: 600, fontSize: 16, marginBottom:8, marginTop:8}}>Conclusion:</Text>
        <Text>
            Help and support are fundamental to the Clearly App experience, ensuring that users with special
            needs have the necessary resources to maximize the app's benefits. Through user guides, an in-app 
            help center and email assistance Clearly App strives to empower its users, foster independence, and 
            enhance the overall user experience. The Clearly App team remains committed to continuously improving its help and support services to meet the unique needs of its users.
        </Text>
      </View>
    </SafeAreaView>
    </ScrollView>
  )
}

export default HelpAndSupport

const styles = StyleSheet.create({})