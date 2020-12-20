import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserHome from "./UserHome";
import Admin from "./Admin";
import Loader from "../src/screens/Auth/Loader";
import { connect } from "react-redux";
import { Authorization } from "../src/store/actions/Auth";
import { profileInformation } from "../src/store/actions/User";

const Stack = createStackNavigator();

const Authority = ({ type, Authorization, authCheck, profileInformation }) => {
  useEffect(() => {
    Authorization();
  }, []);

  useEffect(() => {
    profileInformation();
  }, [authCheck]);

  return (
    <>
      {authCheck ? (
        <Loader />
      ) : (
        <>
          {type == "admin" ? (
            <Stack.Navigator initialRouteName="admin">
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="admin"
                component={Admin}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="user">
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="user"
                component={UserHome}
              />
            </Stack.Navigator>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.Auth.admin,
    authCheck: state.Auth.authCheck,
  };
};

export default connect(mapStateToProps, { Authorization, profileInformation })(
  Authority
);
