import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput} from 'react-native'
import { COLORS } from "../constants";

const createContactForm = () =>{
  const [contact, setContact] = useState({
    
  })
}

const Input = ({ label, iconName, error, password, onFocus =() =>{}, ...props }) =>{


  return (
    <View style={{marginBottom: 20}}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer]}>
        <Ionicons name={iconName} style={{fontSize: 30, color: COLORS.orange, marginLeft: 5}}/>
        <TextInput {...props} style={{color: COLORS.darkBlue, flex: 1, marginLeft: 10}} autoCorrect={false} onFocus={() =>{onFocus}}/>
      </View>
    </View>
  )
}

export default Input


const styles = StyleSheet.create({
  label:{
    marginVertical: 15,
    marginLeft: 23,
    fontSize: 15,
    color: COLORS.gray
  },
  inputContainer: {
    height: 45,
    backgroundColor: COLORS.lightGray2,
    flexDirection: 'row',
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",


  }
})