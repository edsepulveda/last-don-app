import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "./LoginScreen";
import { collection, onSnapshot } from "firebase/firestore";
import { COLORS } from "../constants";
import { StatusBar } from "expo-status-bar";

const AdvisesListScreen = () => {
  const [advise, setAdvise] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onSnapshot(collection(db, "avisos"), (snapshot) => {
      const advise = [];

      snapshot.docs.forEach((doc) => {
        advise.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setAdvise(advise);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.activity} color={COLORS.primary} size="large"/>
  }

  const BG_IMG = 'https://images.unsplash.com/photo-1666795572474-00b52c64b9e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
  const IMG = 'https://images.unsplash.com/photo-1666861986217-b011a4eb7d4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image source={{uri: BG_IMG}} style={StyleSheet.absoluteFillObject} blurRadius={80}/>
      <FlatList
        data={advise}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{
          padding: 20,
          paddingTop: StatusBar.currentHeight || 42
        }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              padding: 20,
              marginBottom: 20,
              backgroundColor: 'rgba(255,255,255,0.8)',
              borderRadius: 45,            
            }}
          >
            <Image source={{uri: IMG}} style={{width: 70, height: 70, borderRadius: 80, marginRight: 20}}/>
            <View>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>
                Nombre: {item.name}
              </Text>
              <Text style={{ fontSize: 14, opacity: 0.7, marginTop: 3, }}>Direccion: {item.address}</Text>
              <Text
                style={{
                  fontSize: 14,
                  opacity: 0.8,
                  color: COLORS.primary,
                  fontWeight: "700",
                  marginTop: 5,
                }}
              >
                Bolsas: {item.bags}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default AdvisesListScreen;

const styles = StyleSheet.create({
  activity:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
