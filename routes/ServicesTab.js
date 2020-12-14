import React, { useState } from "react";
import ServicesHome from "../src/screens/User/Home";
import AddService from "../src/screens/User/AddService";
import { createStackNavigator } from "@react-navigation/stack";
import Services from "../src/screens/User/Services";
import ListDetail from "../src/screens/User/ListDetail";
import Notification from "../src/screens/User/Notification";

const Stack = createStackNavigator();

const ServicesTab = () => {
  return (
    <Stack.Navigator initialRouteName="ServicesHome">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ServicesHome"
        component={ServicesHome}
        initialParams={{ key: 1 }}
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
        name="Services"
        component={Services}
      />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};
export default ServicesTab;
