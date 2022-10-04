import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Inicio de Sesión</Text>
        <TextInput
          placeholder="Ingresa tu Correo..."
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Ingresa tu Contraseña..."
          style={styles.input}
          secureTextEntry
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.button}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonOutline}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonGoogle}>Iniciar Sesión con Google</Text>
        </TouchableOpacity>
        
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: '80%',
  },

  input: {

  },
  buttonContainer: {

  },
  button: {},
  buttonOutline: {},
  buttonGoogle: {},



});
