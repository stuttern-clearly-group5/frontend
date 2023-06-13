import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

const BasicSignLanguage = () => {
  const [showImage, setShowImage] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);
  const [showDays, setShowDays] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showWords, setShowWords] = useState(false);
  const [showAnimals, setShowAnimals] = useState(false);


  const toggleImage = () => {
    setShowImage(!showImage);
  };
 
    const toggleNumbers = () => {
    setShowNumbers(!showNumbers);
  };

  const toggleDays = () => {
    setShowDays(!showDays);
  };

  const toggleName = () => {
    setShowName(!showName);
  };

    const toggleWords = () => {
    setShowWords(!showWords);
  };

      const toggleAnimals = () => {
    setShowAnimals(!showAnimals);
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
    <SafeAreaView style={styles.container}>
      <View style={{paddingTop: 25}}>
        <TouchableOpacity onPress={toggleImage} style={styles.header}>
          <Text style={styles.headerText}>Alphabets</Text>
          <Text>{showImage ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {showImage && (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../img/mainApp/Alphabets.jpg')}
          />
        )}
      </View>
      <View style={{paddingTop: 25}}>
        <TouchableOpacity onPress={toggleNumbers} style={styles.header}>
          <Text style={styles.headerText}>Numbers</Text>
          <Text>{showNumbers ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {showNumbers && (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../img/mainApp/Numbers.png')}
          />
        )}
        </View>
            <View style={{paddingTop: 25}}>
        <TouchableOpacity onPress={toggleAnimals} style={styles.header}>
          <Text style={styles.headerText}>Common Animals</Text>
          <Text>{showAnimals ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {showAnimals && (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../img/mainApp/Animals.jpg')}
          />
        )}
        </View>
    <View style={{paddingTop: 25}}>
        <TouchableOpacity onPress={toggleDays} style={styles.header}>
          <Text style={styles.headerText}>Days of the week</Text>
          <Text>{showDays ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {showDays && (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../img/mainApp/DaysOfTheWeek.png')}
          />
        )}
        </View>
            <View style={{paddingTop: 25}}>
        <TouchableOpacity onPress={toggleName} style={styles.header}>
          <Text style={styles.headerText}>Introduce yourself</Text>
          <Text>{showName ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {showName && (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../img/mainApp/SignYourName.jpg')}
          />
        )}
        </View>
    <View style={{paddingTop: 25}}>
        <TouchableOpacity onPress={toggleWords} style={styles.header}>
          <Text style={styles.headerText}>Common words</Text>
          <Text>{showWords ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {showWords && (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../img/mainApp/CommonWords.jpg')}
          />
        )}
        </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default BasicSignLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    // fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});
