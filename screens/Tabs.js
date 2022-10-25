import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import MapScreen from "./MapScreen";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/index";
import FormScreen from "./FormScreen";
import MapScreenV2 from "./MapScreenV2";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Formulario"
        component={FormScreen}
        options={{
          tabBarIcon: ({ color = COLORS.primary }) => (
            <Ionicons name="document-text-outline" color={color} size={30} />
          ),
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.darkGray,
        }}
      />
      <Tab.Screen
        name="Puntos de Acoplo"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color = COLORS.primary }) => (
            <Ionicons name="navigate-outline" color={color} size={30} />
          ),
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.darkGray,
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={MapScreenV2}
        options={{
          tabBarIcon: ({ color = COLORS.primary }) => (
            <Ionicons name="map-outline" color={color} size={30} />
          ),
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.darkGray,
        }}
      />
      <Tab.Screen
        name="Opciones"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color = COLORS.primary }) => (
            <Ionicons name="settings-outline" color={color} size={30} />
          ),
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.darkGray,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
