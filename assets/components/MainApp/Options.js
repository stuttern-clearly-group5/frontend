import { Platform, StatusBar, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import OptionsButton from './OptionsButton';
import { useNavigation } from "@react-navigation/native";

const Options = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style = {styles.container}>
    <View         style = {styles.header}>
        <View>
          <Text style = {{color: 'white', fontSize: 16}}>Keyboard Settings</Text>
          <Text style = {{color: 'white', fontSize: 13}}>Enable & disable {"\n"} your Keyboard settings</Text>
        </View>
        <AntDesign name = "doubleright" size = {16} color = "white" />
      </View>
      <View style = {{flexDirection: 'row', flexWrap: 'wrap' , gap: 8, flex: 0.80}}>
        <OptionsButton 
          icon  = {<AntDesign name="picture" size={24} color="#42DA00" />}
          label = {'Text on image'}
        />
        <OptionsButton 
          onPress = {() => navigation.navigate('Dictionary')}
          icon    = {<AntDesign name="book" size={24} color='red'/>}
          label   = {'Easy Dictionary'}
        />
                <OptionsButton 
          icon  = {<MaterialIcons name="history" size={24} color="#42DA00" />}
          label = {'History'}
        />
        <OptionsButton 
          icon  = {<MaterialIcons name="favorite-border" size={24} color="red" />}
          label = {'Favorites'}
        />
        <OptionsButton 
          icon  = {<MaterialCommunityIcons name="file-download-outline" size={24} color="black" />}
          label = {'Saved images'}
        />
      </View>
    </SafeAreaView>
  )
}

export default Options;

const styles = StyleSheet.create({
        container: {
        flex: 1,
          // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor  : 'white',
        paddingHorizontal: 20,
    },
    header: {
      backgroundColor: '#42DA00',
      flex           : 0.20,
      flexDirection  : 'row',
      justifyContent : 'space-between',
      alignItems     : 'center',
      borderRadius   : 8,
      padding        : 10,
      marginBottom   : 25,
    }
})