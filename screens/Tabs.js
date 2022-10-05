import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import MapScreen from './MapScreen'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen name='Home' component={HomeScreen} options={{ tabBarIcon: ({}) => ( 
        <Ionicons name='home-outline' size={30}/>
       )}}/>
      <Tab.Screen name='Map' component={MapScreen} options={{ tabBarIcon: ({}) => ( 
        <Ionicons name='map-outline' size={30}/>
       )}}/>
    </Tab.Navigator>
  )
}

export default Tabs
