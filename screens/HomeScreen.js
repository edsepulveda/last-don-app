import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth } from "./LoginScreen";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Inicio de Sesión");
      })
      .catch((err) => alert(err.message));
  };

  
  return (
    <>
      <View style={styles.container}>
        <Text>Se encuentra logeado con el correo: {user.email}</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          style={[styles.buttonContainer, styles.loginButton]}
        >
          <Ionicons
            name="log-out-outline"
            color="black"
            size={20}
            style={styles.icon}
          />
          <Text style={styles.loginText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: 250,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  loginText: {
    fontWeight: "700",
    fontSize: 15,
  },
  icon: {
    marginRight: 5,
  },
});
