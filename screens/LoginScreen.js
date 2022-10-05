import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'



let myApp = initializeApp(firebaseConfig)
export const auth = getAuth(myApp)


//WEB: 801765162827-7g7e7nj2l6er0auc26m1kb5pa69spn9h.apps.googleusercontent.com
//IOS: 801765162827-sqsileqn4nb69k7glcn866d5m7m4ier6.apps.googleusercontent.com
//ANDROID: 801765162827-v2ntcov1vnt08h395rhtn9isam8nsk0d.apps.googleusercontent.com


const LoginScreen = () => {

  const navigation = useNavigation()  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () =>{
    createUserWithEmailAndPassword(auth,email, password)
    .then((userCredentials) => {
      const user = userCredentials.user
      console.log(user.email)
      Alert.alert('Usuario creado con exito!!', user.email)
    }).catch(err =>{
      alert(err.message)
    })
  }

  const handleLogin = () =>{
    signInWithEmailAndPassword(auth,email, password)
    .then((userCredentials) =>{
      const user = userCredentials.user
      console.log('Logeado como', user.email)
      if(!user){
        alert('Hola')
      }
      navigation.replace("Pantalla Principal")
    })
    .catch(err =>{
      console.log(err)
      alert(err.message)
    })
  }

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, user =>{
      if(user){
        navigation.replace("Pantalla Principal")
      }
    })
    return unsubscribe
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ingresa tu Correo..."
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.inputs}
          keyboardType="email-address"
          underlineColorAndroid="transparent"
        ></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ingresa tu Contraseña..."
          value={password}
          onChangeText={pass => setPassword(pass)}
          style={styles.inputs}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
        ></TextInput>
      </View>

      <TouchableOpacity onPress={handleLogin} style={[styles.buttonContainer, styles.loginButton]}>
        <Ionicons name="log-in-outline" color="black" size={20} style={styles.icon}/>
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegister} style={[styles.buttonContainer, styles.registerButton]}>
        <Ionicons name="add-circle-outline" color="black" size={20} style={styles.icon}/>
        <Text style={styles.registerText}>Registrarse</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderBottomWidth: 1,
    width: 300,
    height: 55,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  icon:{
    marginRight: 5
  },
  inputs: {
    height: 40,
    marginLeft: 14,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 10,
    backgroundColor: "#"
  },
  loginButton: {
    backgroundColor: "#e9c46a",
  },
  registerButton: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#e9c46a",
    borderWidth: 2,

  },
  registerText: {
    fontWeight: "700",
    fontSize: 15,
  },
  loginText: {
    fontWeight: "700",
    fontSize: 15,
  },

});
