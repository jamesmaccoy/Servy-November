import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { connect } from "react-redux";
import { getAdminCategory } from "../../store/actions/Category";
import FeaturesSelect from "./Features";
import { distanceRadius } from "../../store/actions/Location";
import { Picker } from "@react-native-community/picker";
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const Filter = ({ ...props }) => {
  let modalVisible = props.modalVisible;
  let setShowFilter = props.setShowFilter;
  let getAdminCategory = props.getAdminCategory;
  let categories = props.categories;
  let navigation = props.navigation;

  const [key, setKey] = useState(1);
  const [distance, setDistance] = useState(props.initialDistance);
  const [categoriesList, setCategoriesList] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [state, setState] = useState("");

  useEffect(() => {
    getAdminCategory();
  }, []);
  useEffect(() => {
    setKey(navigation.dangerouslyGetState().routes[0].params.key);
  }, [navigation]);

  useEffect(() => {
    setCategoriesList(categories);

    categories.forEach((e, index) => {
      if (index === 0) {
        setState(e);
      }
    });
  }, [categories]);

  const handleCategory = (data) => {
    setState(data);
  };
  const handleFilter = () => {
    if (key === 1) {
      navigation.navigate("SearchResult", {
        id: 2,
        state: state.label,
        distance: distance,
        attributes: attributes,
      });
      props.distanceRadius(distance);
      setShowFilter(!modalVisible);
    }
    if (key === 0) {
      navigation.navigate("SearchResult", {
        id: 2,
        state: state.label,
        distance: distance,
        attributes: attributes,
      });
      props.distanceRadius(distance);
      setShowFilter(!modalVisible);
    }
  };
  const handleClear = () => {
    if (key === 1) {
      navigation.navigate("SearchResult", {
        id: 3,
        state: state,
        distance: distance,
        attributes: attributes,
      });
      props.distanceRadius(distance);
      setShowFilter(!modalVisible);
    }
    if (key === 0) {
      navigation.navigate("SearchResult", {
        id: 3,
        state: state,
        distance: distance,
        attributes: attributes,
      });
      props.distanceRadius(distance);
      setShowFilter(!modalVisible);
    }
  };
  return (
    <KeyboardAvoidingView enabled={true}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            setShowFilter(false);
          }}
        >
          <TouchableOpacity
            onPress={() => setShowFilter(!modalVisible)}
            style={styles.transparent}
          ></TouchableOpacity>
          <View style={styles.filterWrapper}>
            <View
              style={{
                padding: 10,
                paddingRight: 15,
                paddingLeft: 15,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <MaterialCommunityIcons
                style={styles.filter}
                name="filter-variant"
              />
            </View>
            <View style={styles.filterInner}>
              <View style={styles.filterCategory}>
                <View>
                  <View style={styles.filterLocation}>
                    <MaterialIcons style={styles.filter} name="location-on" />
                    <Text style={styles.headerText}>Distance</Text>
                    <Text style={styles.distance}>{distance} Mile </Text>
                  </View>
                  <Slider
                    onValueChange={(e) => setDistance(e)}
                    style={{ height: 10, paddingTop: 50, flex: 1 }}
                    minimumValue={1}
                    value={distance}
                    maximumValue={1000}
                    minimumTrackTintColor="#488d4b"
                    maximumTrackTintColor="#a9a9a9"
                  />
                </View>
                <Picker
                  selectedValue={state}
                  style={{ width: deviceWidth - 50, paddingLeft: 50 }}
                  enabled={true}
                  itemStyle={{ paddingLeft: 50, backgroundColor: "red" }}
                  prompt={"Service Category"}
                  onValueChange={(itemValue, itemIndex) =>
                    handleCategory(itemValue)
                  }
                >
                  {categoriesList.map((item) => (
                    <Picker.Item
                      itemStyle={{ paddingLeft: 100, backgroundColor: "red" }}
                      label={item.label}
                      value={item}
                    />
                  ))}
                </Picker>
                <View
                  style={{
                    backgroundColor: "red",
                    marginTop: 20,
                    zIndex: -1,
                    width: deviceWidth - 50,
                  }}
                >
                  <FeaturesSelect
                    featuresSelect={state}
                    setAttributes={setAttributes}
                    attributes={attributes}
                  />
                </View>
              </View>

              <View style={styles.btn}>
                <TouchableOpacity onPress={handleClear} style={styles.clear}>
                  <Text style={{ color: "#488d4b", fontWeight: "bold" }}>
                    Clear All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFilter} style={styles.accept}>
                  <Text style={{ fontWeight: "bold" }}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <ScrollView
            style={{
              position: "absolute",
              alignSelf: "center",
              top: deviceHeight / 25,
              backgroundColor: "#fff",
              zIndex: 1,
              height: 300,
            }}
          >
            {categoriesList.map((data) => (
              <View style={{ flexDirection: "row" }}>
                <RadioButton
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
                />
                <Text>{data.label} </Text>
              </View>
            ))}
          </ScrollView> */}
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = (state) => {
  return {
    categories: state.category.adminCollection,
    initialDistance: state.location.initialDistance,
  };
};
export default connect(mapStateToProps, { getAdminCategory, distanceRadius })(
  Filter
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: deviceHeight,
  },
  filterWrapper: {
    backgroundColor: "#fff",
    width: deviceWidth,
    height: 420,
    position: "absolute",
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
  },
  transparent: {
    height: 100,
    flex: 1,
    width: deviceWidth,
    backgroundColor: "rgba(0, 0, 0, .6)",
  },
  filterInner: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 0,
  },
  filter: {
    fontSize: 25,
    color: "#000",
    paddingRight: 10,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    paddingLeft: 20,
    fontSize: 15,
  },
  filterLocation: {
    flexDirection: "row",
  },
  distance: {
    flex: 1,
    textAlign: "right",
  },
  filterCategory: {
    paddingTop: 20,
  },
  categoryText: {
    fontSize: 15,
  },
  pickerStyle: {
    borderColor: "#a9a9a9",
    borderBottomWidth: 1,
  },
  picker: {
    height: 50,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  clear: {
    width: 80,
    height: 25,
    marginRight: 20,
    alignItems: "center",
    color: "green",
  },
  accept: {
    width: 80,
    height: 25,
    backgroundColor: "#a9a9a9",
    alignItems: "center",
  },
});
