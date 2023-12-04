// Navigation.js

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import ProductDetail from '../screens/ProductDetail';
import Favorites from '../screens/Favorites';
import Cart from '../screens/Cart';
import OrderConfirm from '../screens/OrderConfirm';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomePage"
      component={Home}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetail}
      options={({navigation}) => ({
        headerTitle: '',
      })}
    />
  </Stack.Navigator>
);

const FavouriteStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="FavouritePage"
      component={Favorites}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetail}
      options={({navigation}) => ({
        headerTitle: '',
      })}
    />
  </Stack.Navigator>
);

const CartStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CartPage"
      component={Cart}
      options={{headerShown: false}}
    />
    <Stack.Screen
      options={{headerTitle: 'Order Confirmation'}}
      name="OrderConfirm"
      component={OrderConfirm}
    />
  </Stack.Navigator>
);

const AppNavigation = () => (
  <NavigationContainer>
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Favourite"
        component={FavouriteStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="heart"
              color={color}
              size={size}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <View>
              <MaterialCommunityIcons
                name="cart"
                color={color}
                size={size}
                style={styles.tabIcon}
              />
              {/* <View
                style={{
                  position: 'absolute',
                  right: -15,
                  backgroundColor: 'red',
                  borderRadius: 12,
                  padding: 6,
                  height: 28,
                  width: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
              6
                </Text>
              </View> */}
            </View>
          ),
        }}
        component={CartStack}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigation;

const styles = StyleSheet.create({
  tabIcon: {
    marginTop: 12,
  },
});
