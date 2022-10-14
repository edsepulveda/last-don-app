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
        name="Principal"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color = COLORS.primary }) => (
            <Ionicons name="home-outline" color={color} size={30} />
          ),
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.darkGray,
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color = COLORS.primary }) => (
            <Ionicons name="map-outline" color={color} size={30} />
          ),
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.darkGray,
        }}
      />
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
        name="Mapav2"
        component={MapScreenV2}
        options={{
          tabBarIcon: ({ color = COLORS.primary }) => (
            <Ionicons name="map-outline" color={color} size={30} />
          ),
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.darkGray,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
