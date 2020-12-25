import React, { useState } from "react";
import AddService from "../src/screens/User/AddService";
import { createStackNavigator } from "@react-navigation/stack";
import Services from "../src/screens/User/Services";
import ListDetail from "../src/screens/User/ListDetail";
import Notification from "../src/screens/User/Notification";
import SearchResult from "../src/screens/User/SearchResult";

const Stack = createStackNavigator();

const ServicesTab = () => {
  return (
    <Stack.Navigator initialRouteName="Services">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Services"
        component={Services}
        initialParams={{ key: 0 }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AddService"
        component={AddService}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ListDetail"
        component={ListDetail}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SearchResult"
        component={SearchResult}
        initialParams={{ key: 4 }}
      />

      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};
export default ServicesTab;
