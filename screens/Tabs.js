import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import MapScreen from './MapScreen'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants/index'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Home' component={HomeScreen} options={{ tabBarIcon: ({color = COLORS.primary}) => ( 
        <Ionicons name='home-outline' color={color} size={30}/>
       ), tabBarActiveTintColor: COLORS.primary, tabBarInactiveTintColor: COLORS.darkGray}}/>
      <Tab.Screen name='Map' component={MapScreen} options={{ tabBarIcon: ({color = COLORS.primary}) => ( 
        <Ionicons name='map-outline' color={color} size={30}/>
       ), tabBarActiveTintColor: COLORS.primary, tabBarInactiveTintColor: COLORS.darkGray}}/>
    </Tab.Navigator>
  )
}

export default Tabs
