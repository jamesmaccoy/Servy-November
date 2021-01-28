import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ListDetail = ({  filled , size}) => {
  return (
    <TouchableOpacity>
      <Entypo
        name={filled ? "star" : "star-outlined"}
        size={size}
        color="#fbbc04"
      />
    </TouchableOpacity>
  );
};

export default ListDetail;

const styles = StyleSheet.create({
  ratingList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  ratingBox: {
    paddingLeft: 10,
    paddingTop: 20,
  },
  review: {
    backgroundColor: "#f9f9f9",
    marginTop: 30,
    paddingTop: 40,
    padding: 10,
  },
  reviewHead: {
    padding: 10,
  },

  input: {
    paddingTop: 10,
    paddingLeft: 10,
    padding: 0,
    height: 150,
    borderColor: "#5c9b84",
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlignVertical: "top",
    color: "#000",
  },
  buttons: { color: "#5c9b84", marginTop: 20, backgroundColor: "#5c9b84" },
  buttonstxt: { color: "#fff" },
});
