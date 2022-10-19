import {
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { COLORS } from "../constants";
import { getFirestore } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";

let myApp = initializeApp(firebaseConfig);
export const auth = getAuth(myApp);
export const db = getFirestore(myApp);

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        Alert.alert("Usuario creado con exito!!", user.email);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logeado como", user.email);
        if (!user) {
          alert("Hola");
        }
        navigation.replace("Pantalla Principal");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Pantalla Principal");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="light"/>
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={{ height: Dimensions.get("window").height / 2 }}
      >
        <View style={styles.brand}>
          <Ionicons
            name="leaf-outline"
            style={{ color: COLORS.primary, fontSize: 100 }}
          />
          <Text style={styles.brandText}>Ideas Nuevas</Text>
        </View>
      </ImageBackground>
      <View style={styles.bottomView}>
        <View style={{ padding: 40 }}>
          <Text
            style={{
              color: COLORS.darkBlue,
              fontSize: 34,
              textAlign: "center",
            }}
          >
            Bienvenido
          </Text>

          <View style={[styles.inputContainer]}>
            <TextInput
              placeholder="Ingresa tu Correo..."
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.inputs}
              keyboardType="email-address"
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Ingresa tu Contraseña..."
              value={password}
              onChangeText={(pass) => setPassword(pass)}
              style={styles.inputs}
              secureTextEntry={true}
            ></TextInput>
          </View>
          <View style={{marginTop: 40}}>

          
          <TouchableOpacity
            onPress={handleLogin}
            style={[styles.buttonContainer, styles.loginButton]}
          >
            <Ionicons
              name="log-in-outline"
              color="white"
              size={20}
              style={styles.icon}
            />
            <Text style={styles.loginText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRegister}
            style={[styles.buttonContainer, styles.registerButton]}
          >
            <Ionicons
              name="add-circle-outline"
              color="black"
              size={20}
              style={styles.icon}
            />
            <Text style={styles.registerText}>Registrarse</Text>
          </TouchableOpacity>
          <Text style={{textAlign:"center", color: COLORS.blue}}>¿Olvidaste tu contraseña?</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  brand: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brandText: {
    color: COLORS.primary,
    fontSize: 40,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: COLORS.white,
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  inputContainer: {
    borderBottomColor: COLORS.primary,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderBottomWidth: 3,
    borderColor: COLORS.primary,
    marginTop: 50,
  },
  icon: {
    marginRight: 5,
  },
  inputs: {
    height: 40,
    marginLeft: 14,
    borderBottomColor: COLORS.primary,
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 17,
    width: 330,
    borderRadius: 10,

  },
  loginButton: {
    backgroundColor: COLORS.primary,
  },
  registerButton: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  registerText: {
    fontWeight: "700",
    fontSize: 15,
  },
  loginText: {
    fontWeight: "700",
    fontSize: 15,
    color: "white"
  },
});
