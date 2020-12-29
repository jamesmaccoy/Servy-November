import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Notification = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={{ paddingTop: 0 }}>
        <Text>No New Notification</Text>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    paddingTop: 20,
    height: 670,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 80,
  },
});
