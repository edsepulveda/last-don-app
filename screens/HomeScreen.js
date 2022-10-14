import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth } from "./LoginScreen";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../enviorment";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";

const HomeScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch()

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
    borderColor: "#e9c46a",
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
