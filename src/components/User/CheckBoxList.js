import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
const CheckBoxList = ({ head, array, setArray, label, select, index }) => {
  useEffect(() => {
    setCheck(false);
  }, [select]);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (array === []) {
      setCheck(false);
    }
  }, []);
  const handleCheckBox = () => {
    setCheck(!check);
    array.splice(index, 1, { label: label, attributeState: !check });
  };

  return (
    <View style={styles.checkboxList}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={check}
          onValueChange={handleCheckBox}
          style={styles.checkbox}
          key={index}
        />
        <Text style={styles.label}>{head}</Text>
      </View>
    </View>
  );
};
export default CheckBoxList;

const styles = StyleSheet.create({
  checkboxList: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    color: "#488d4b",
  },
  label: {
    color: "#488d4b",
    width: 70,
    fontSize: 12,
  },
});
