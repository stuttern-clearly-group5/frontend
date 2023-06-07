import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const OptionsButton = ({label, onPress, icon}) => {
  return (
        <TouchableOpacity onPress = {onPress}
                          style   = {styles.button}>
            <View>{icon}</View>
          <Text style = {{fontWeight: 500, fontSize: 15, color: '#3E3E3E', textAlign: 'center', marginTop: 18}}>{label} </Text>
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