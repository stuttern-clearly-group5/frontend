import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React, { useContext } from 'react'
import themeContext from './ThemeContext';

const OptionsButton = ({label, onPress, icon}) => {
  const theme = useContext(themeContext);

  return (
        <TouchableOpacity onPress = {onPress}
                          style   = {styles.button}>
            <View>{icon}</View>
          <Text style = {{fontWeight: 500, fontSize: 15, color: theme.color, textAlign: 'center', marginTop: 18}}>{label} </Text>
        </TouchableOpacity>
        
  )
}

export default OptionsButton

const styles = StyleSheet.create({
    button: {
        height         : 150,
        width          : 100,
        borderRadius   : 8,
        backgroundColor: 'rgba(109, 243, 51, 0.3)',
        alignItems     : 'center',
        justifyContent : 'center',
        marginBottom   : 15,
    }
})