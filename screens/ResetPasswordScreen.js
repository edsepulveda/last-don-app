import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "./LoginScreen";
import { useNavigation } from '@react-navigation/core'

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Enviado",
          "Correo enviado, verifique su bandeja de entrada"
        )
        navigation.goBack()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="light" />
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
            Cambiar Contraseña
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 13,
              textAlign: "auto",
              color: COLORS.red2,
            }}
          >
            Ingresa tu correo electronico para cambiar la contraseña
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
          <View style={{ marginTop: 40 }}>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={handleResetPassword}
            >
              <Ionicons
                name="send-outline"
                color="white"
                size={20}
                style={styles.icon}
              />
              <Text style={styles.loginText}>Enviar Correo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPasswordScreen;

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
    color: "white",
  },
});
