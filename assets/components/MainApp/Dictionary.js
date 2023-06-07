import { StyleSheet, Text, View, Platform, StatusBar, 
  SafeAreaView, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import DictionaryBackground from '../../img/mainApp/DictionaryBackground.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const Dictionary = () => {
  const [searchText, setSearchText] = useState('');
  const [newWord, setNewWord] = useState('');
  const [checkedWord, setCheckedWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');

  const searchWord = (enteredWord) => {
    setNewWord(enteredWord);
  };

  const clearSearchText = () => {
    setSearchText('');
  };

  const getInfo = () => {
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;

    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].word;
        setCheckedWord(word);

        var def = response[0].meanings[0].definitions[0].definition;
        setDefinition(def);

        var eg = response[0].meanings[0].definitions[0].example;
        setExample(eg);
      });
  };

  const speak = () => {
    Speech.speak(checkedWord);
  };

  const clear = () => {
    setCheckedWord('');
    setDefinition('');
    setExample('');
    setNewWord('');
  };

  useEffect(() => {
    if (checkedWord !== '') {
      speak();
    }
  }, [checkedWord]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        style={{ flex: 1, }}
        resizeMode='cover'
        source={DictionaryBackground}
      > 
        <View style={{ flex: 0.2 }}>
          <Image
            style={styles.Dictionary}
            resizeMode='contain'
            source={require('../../img/mainApp/dictionary3.jpg')}
          />
        </View>
        <View style={{ flex: 0.8 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              placeholder="Search a word"
              placeholderTextColor="#2E8E05"
              style={styles.inputBox}
              multiline={true}
              value={newWord}
              onChangeText={searchWord}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={clearSearchText} style={styles.clearButton}>
                <MaterialIcons name="clear" size={20} color="#8C8C8C" />
               {/* <Text style={styles.clearButtonText}>Clear</Text> */}
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.ButtonView}>
           <TouchableOpacity style={styles.Button} 
           onPress={() => {
                  getInfo();
                }}
           >
            <Text style={{color: 'white', textAlign: 'center'}}> Go !</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.Button}
           onPress={()=>{
                clear();
              }}
           >
            <Text style={{color: 'white', textAlign: 'center'}}>Clear</Text>
           </TouchableOpacity>

           <TouchableOpacity 
           onPress={() => {
                  speak();
                }}
           >
           <AntDesign name="sound" size={34} color="black" />
           </TouchableOpacity>

          </View>
          <View>
              <Text style={styles.textDesign}>
                <Text style={{fontWeight: 'bold', color: "#062400"}}>Entered Word : {' '}</Text>{checkedWord}{" "}
              </Text>
              <Text style={styles.textDesign}><Text style={{fontWeight: 'bold', color: "#062400"}}>Definition : {' '} </Text> {definition} </Text>
              <Text style={styles.textDesign}><Text style={{fontWeight: 'bold', color: "#062400"}}>Example : {' '}</Text>{example} </Text>
            </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Dictionary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  Dictionary: {
    width: 160,
    height: 120,
    alignSelf: 'center',
    marginTop: '10%',
  },
  inputBox: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#2E8E05',
    marginTop: 70,
    fontSize: 24,
    padding: 3,
    textAlign: 'center',
  },
  clearButton: {
    position: 'absolute',
    right: 50,
    top: 85,
  },
  clearButtonText: {
    color: '#2E8E05',
    fontSize: 18,
  },
  ButtonView: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignContent: 'center', 
    paddingHorizontal: 68,
    marginVertical: 10
  },
  Button: {
    backgroundColor: '#2E8E05',
    padding: 5,
    borderRadius: 10,
    width: '25%'
  },
  textDesign: {
    color: '#2E8E05',
    fontSize: 18,
    // backgroundColor: "#2E8E05",
    marginTop: 10,
    alignSelf: "center",
    paddingHorizontal: 24,
  },
});
