import React, { useEffect, useState } from "react";
import { View, Text, BackHandler } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Notification from "../src/screens/User/Notification";
import GuestTabs from "./Guest";
import MyAccount from "./AccountTab";
import * as Location from "expo-location";
import { Button } from "react-native-paper";
import { getCurrentLocation } from "../src/store/actions/Location";
import { connect } from "react-redux";
import Loader from "../src/screens/Auth/Loader";

const Stack = createStackNavigator();
const UserHome = ({ getCurrentLocation }) => {
  const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
  const [state, setState] = useState(false);
  useEffect(() => {
    if (location) {
      getCurrentLocation(location);
    }
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      console.log("Status", status);
      if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");
        BackHandler.exitApp();
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (e) {
        setState(true);
      }
    })();
  }, []);

  const allowLocation = () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");
        BackHandler.exitApp();
        return;
      }
      try {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (e) {
        setState(true);
      }
    })();
  };
  return (
    <>
      {location !== null ? (
        <Stack.Navigator initialRouteName="Guest">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            initialParams={{
              checkVisible: false,
            }}
            name="Guest"
            component={GuestTabs}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="MyAccount"
            component={MyAccount}
          />
          <Stack.Screen name="Notification" component={Notification} />
        </Stack.Navigator>
      ) : (
        <>
          {state ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <Text>Please Allow Location To Use This App</Text>
                <Button
                  style={{
                    marginTop: 20,
                    color: "#fff",
                    backgroundColor: "#60ad7f",
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                  full
                  success
                  onPress={allowLocation}
                >
                  <Text style={{ color: "#fff" }}>Allow Location</Text>
                </Button>
              </View>
            </View>
          ) : (
            <Loader />
          )}
        </>
      )}
    </>
  );
};
export default connect("", { getCurrentLocation })(UserHome);
