import React from "react";
import Header from "../../components/User/Header";
import { View, Text, StyleSheet, Dimensions } from "react-native";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
const BookingList = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Header
        filterButton={false}
        notificationButton={true}
        name="Services"
        navigation={navigation}
        visible={true}
      />
      <Text
        style={{
          paddingTop: 50,
          textAlign: "center",
          fontSize: 17,
          color: "#a9a9a9",
        }}
      >
        No active Bookings
      </Text>
    </View>
  );
};

export default BookingList;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    paddingTop: 35,
    paddingBottom: 80,
    minHeight: deviceHeight,
  },
});
