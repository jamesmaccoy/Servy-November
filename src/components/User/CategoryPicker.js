import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { styles } from "../../styles/User/AddServiceStyle";
import { Picker } from "@react-native-community/picker";

const CategoryPicker = ({
  selectedValue,
  setState,
  setSelectedValue,
  state,
  categories,
  setSelect,
  setVisible,
  stateChange,
}) => {
  const [selectCategory, setSelectCateory] = useState("");

  useEffect(() => {
    setSelectCateory(selectedValue);
  }, [selectedValue]);
  return (
    <View style={styles.picker}>
      <Picker
        style={{ flex: 1, zIndex: 2 }}
        selectedValue={
          selectedValue.value !== "other" ? selectedValue : "other"
        }
        onValueChange={(itemValue, itemIndex) => {
          if (stateChange === false) {
            if (itemValue !== "other") {
              setSelectedValue(itemValue);
              setState({
                ...state,
                category: itemValue.label,
              });
              setSelect(true);
              setVisible(false);
            }
            if (itemValue === "other") {
              setSelectedValue({
                ...selectedValue,
                value: "other",
                features: [],
              });
              setSelect(true);
              setVisible(true);
            }
          }
        }}
        mode="dropdown"
      >
        {stateChange ? (
          <Picker.Item label={selectedValue.label} key={0} value="0" />
        ) : (
          <Picker.Item label="Select Category" key={1} value="0" />
        )}
        {categories != null ? (
          categories.map((data, index) => (
            <Picker.Item label={data.label} key={index + 2} value={data} />
          ))
        ) : (
          <Picker />
        )}
        <Picker.Item label="Other..." key="other" value="other" />
      </Picker>
    </View>
  );
};
export default CategoryPicker;
