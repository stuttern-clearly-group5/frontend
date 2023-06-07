import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'

const CustomButton = ({label, onPress}) => {
  return (
        <TouchableOpacity onPress={onPress}
            style={styles.button}>
          <Text style={{fontWeight: 500, fontSize: 16, color: 'white', textAlign: 'center'}}>{label} </Text>
        </TouchableOpacity>
  )
}

export default CustomButton;

const styles = StyleSheet.create({
        button: {
        backgroundColor: '#42DA00', 
        borderRadius: 20, 
        alignContent: 'center' , 
        paddingTop: 15, 
        paddingBottom: 15, 
        paddingLeft: 12, 
        paddingRight: 12,
        marginTop: 35,
    },
})