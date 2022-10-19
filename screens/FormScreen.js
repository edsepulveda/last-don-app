import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { db } from "./LoginScreen";
import { collection, addDoc } from "firebase/firestore";

const FormScreen = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bags: "",
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewAdvise = async () => {
    if (state.name == '' || state.bags == '' || state.email == '' || state.address == '' || state.phone == '') {
      Alert.alert(`Todos los campos son requeridos`);
    } else{
      const docRef = await addDoc(collection(db, "avisos"), {
        name: state.name,
        email: state.email,
        phone: state.phone,
        address: state.address,
        bags: state.bags,
      });
      alert("Guardado");
      console.log("Documento guardado", docRef.id);
    }
  };
  

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "700" }}>
          Avisos
        </Text>
        <Text style={{ color: COLORS.gray, fontSize: 18, marginVertical: 10 }}>
          Ingresa tus detalles para el retiro de ropa
        </Text>
        <View style={{ marginVertical: 20 }}>
          <View>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" style={styles.iconStyle} />
              <TextInput
                onChangeText={(value) => handleChangeText("name", value)}
                style={styles.textInputStyle}
                autoCorrect={false}
                placeholder="Ingresa tu nombre"
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" style={styles.iconStyle} />
              <TextInput
                onChangeText={(value) => handleChangeText("email", value)}
                keyboardType="email-address"
                style={styles.textInputStyle}
                autoCorrect={false}
                placeholder="Ingresa tu Correo"
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" style={styles.iconStyle} />
              <TextInput
                onChangeText={(value) => handleChangeText("phone", value)}
                keyboardType="numeric"
                maxLength={9}
                style={styles.textInputStyle}
                autoCorrect={false}
                placeholder="Telefono"
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="locate-outline" style={styles.iconStyle} />
              <TextInput
                onChangeText={(value) => handleChangeText("address", value)}
                style={styles.textInputStyle}
                autoCorrect={false}
                placeholder="Dirección"
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="clipboard-outline" style={styles.iconStyle} />
              <TextInput
                onChangeText={(value) => handleChangeText("bags", value)}
                keyboardType="numeric"
                maxLength={2}
                style={styles.textInputStyle}
                autoCorrect={false}
                placeholder="Cantidad de Bolsas"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => saveNewAdvise()}
            style={[styles.buttonContainer, styles.loginButton]}
          >
            <Text>ENVIAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  label: {
    marginVertical: 15,
    marginLeft: 23,
    fontSize: 15,
    color: COLORS.gray,
  },
  inputContainer: {
    height: 45,
    backgroundColor: COLORS.lightGray2,
    flexDirection: "row",
    marginHorizontal: 15,
    borderWidth: 0.5,
    alignItems: "center",
    marginTop: 50,
    borderRadius: 20,
    borderColor: COLORS.primary,
  },
  buttonContainer: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    left: 55,
    marginTop: 40,
    width: 250,
    borderRadius: 20,
    fontWeight: "700",
    backgroundColor: COLORS.primary,
  },
  iconStyle: {
    fontSize: 25,
    color: COLORS.primary,
    marginLeft: 10,
  },
  textInputStyle: {
    color: COLORS.darkGray,
    flex: 1,
    marginLeft: 8,
  },
});