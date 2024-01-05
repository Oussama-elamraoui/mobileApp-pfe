import React from 'react';
import { View, Text } from 'react-native';
import Paragraph from '../components/Paragraph';
import ProfileScreen from './ProfileScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './MapScreen';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 40,
    background: '#fff',
  },
};

export default function Dashboard({ navigation }) {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      {/* <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph> */}

      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={MapScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Fontisto
                    name="map"
                    size={24}
                    color={focused ? '#16247d' : '#111'}
                  />
                
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <FontAwesome name="user" size={24} color={focused ? '#16247d' : '#111'} />
                 
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
