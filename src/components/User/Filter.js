import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Menu, Divider, Provider } from "react-native-paper";
import { connect } from "react-redux";
import { getAdminCategory } from "../../store/actions/Category";
import FeaturesSelect from "./Features";
import { distanceRadius } from "../../store/actions/Location";
import { set } from "react-native-reanimated";
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const Filter = ({ ...props }) => {
  let modalVisible = props.modalVisible;
  let setShowFilter = props.setShowFilter;
  let getAdminCategory = props.getAdminCategory;
  let categories = props.categories;
  let navigation = props.navigation;
  let distanceRadius = props.distanceRadius;
  let initialDistance = props.initialDistance;

  const [key, setKey] = useState(1);
  const [distance, setDistance] = useState(initialDistance);
  const [categoriesList, setCategoriesList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(true);
  const [locationVisible, setLocationVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [state, setState] = useState("");
  const [allVisible, setAll] = useState(false);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    setKey(navigation.dangerouslyGetState().routes[0].params.key);
  }, [navigation]);

  useEffect(() => {
    setCategoriesList(categories);
  }, [props.categories]);

  useEffect(() => {
    getAdminCategory();
  }, []);
  const openMenu = () => setVisible(true);
  const handleCategoryVisible = () => {
    setLocationVisible(false);
    setFeaturesVisible(false);
    setCategoryVisible(true);
    setVisible(false);
  };
  const handleLocationVisible = () => {
    setFeaturesVisible(false);
    setCategoryVisible(false);
    setLocationVisible(true);
    setVisible(false);
  };
  const handleFeaturesVisible = () => {
    setLocationVisible(false);
    setCategoryVisible(false);
    setFeaturesVisible(true);
    setVisible(false);
  };

  const handleCategory = (data) => {
    setState(data.label);
    setAll(false);
  };
  const handleFilter = () => {
    if (key === 1) {
      navigation.navigate("ServicesHome", {
        id: 2,
        state: state,
      });
      setShowFilter(!modalVisible);
    }
    if (key === 0) {
      navigation.navigate("Services", {
        id: 2,
        state: state,
      });
      setShowFilter(!modalVisible);
    }
  };
  const handleClear = () => {
    if (key === 1) {
      navigation.navigate("ServicesHome", {
        id: 3,
        state: state,
      });
      setShowFilter(!modalVisible);
    }
    if (key === 0) {
      navigation.navigate("Services", {
        id: 3,
        state: state,
      });
      setShowFilter(!modalVisible);
    }
  };
  const handleDistance = () => {
    props.distanceRadius(distance);
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
          <View style={styles.filterWrapper}>
            <View style={styles.filterInner}>
              <Provider>
                <View
                  style={{
                    paddingTop: 0,
                    flexDirection: "row",
                    margin: 0,
                    padding: 0,
                    justifyContent: "flex-start",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    flex: 1,
                  }}
                >
                  <Menu
                    style={{
                      position: "absolute",
                      top: 50,
                      left: 15,
                      flexDirection: "row",
                      zIndex: 1,
                    }}
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                      <TouchableOpacity
                        style={styles.filterHeader}
                        onPress={openMenu}
                      >
                        <MaterialCommunityIcons
                          style={styles.filter}
                          name="filter-variant"
                        />
                        <Text style={styles.headerText}>
                          Filter By {categoryVisible && <Text>Category</Text>}
                          {locationVisible && <Text>Location</Text>}
                          {featuresVisible && <Text>Features</Text>}
                        </Text>
                      </TouchableOpacity>
                    }
                  >
                    <Menu.Item
                      onPress={handleCategoryVisible}
                      style={{ zIndex: 1 }}
                      title="Categories"
                    />
                    <Divider />
                    <Menu.Item
                      onPress={handleLocationVisible}
                      style={{ zIndex: 1 }}
                      title="Location"
                    />
                    <Divider />
                    <Menu.Item
                      onPress={handleFeaturesVisible}
                      style={{ zIndex: 1 }}
                      title="Features"
                    />
                  </Menu>
                </View>
              </Provider>
              <View
                style={{ position: "absolute", top: 80, left: 15, flex: 1 }}
              >
                {locationVisible && (
                  <View
                    style={{
                      zIndex: -1,
                      width: 300,
                    }}
                  >
                    <View style={styles.filterLocation}>
                      <MaterialIcons style={styles.filter} name="location-on" />
                      <Text style={styles.headerText}>Distance</Text>
                      <Text style={styles.distance}>{distance} km </Text>
                    </View>
                    <Slider
                      onValueChange={(e) => setDistance(e)}
                      onSlidingComplete={handleDistance}
                      style={{ height: 10, paddingTop: 50, flex: 1 }}
                      minimumValue={1}
                      value={distance}
                      maximumValue={1000}
                      minimumTrackTintColor="#488d4b"
                      maximumTrackTintColor="#a9a9a9"
                    />
                  </View>
                )}
              </View>
              {categoryVisible && (
                <View style={styles.filterCategory}>
                  <FlatList
                    style={{ height: 200 }}
                    data={categoriesList}
                    renderItem={(data, index) => {
                      return (
                        <TouchableHighlight
                          underlayColor="#eee"
                          onPress={() => handleCategory(data.item)}
                        >
                          <View
                            style={{
                              padding: 10,
                              flexDirection: "row",
                              marginTop: 5,
                              backgroundColor:
                                data.item.label === state ? "#eee" : "#fff",
                            }}
                          >
                            <MaterialCommunityIcons
                              size={25}
                              name="hand"
                              style={{ marginRight: 30 }}
                            />
                            <Text style={{ color: "#000", fontSize: 18 }}>
                              {data.item.label}{" "}
                            </Text>
                          </View>
                        </TouchableHighlight>
                      );
                    }}
                  />
                </View>
              )}
              {featuresVisible && (
                <View
                  style={{
                    backgroundColor: "red",
                    position: "absolute",
                    top: 50,
                    left: 15,
                    marginTop: 20,
                    zIndex: -1,
                    width: deviceWidth - 50,
                  }}
                >
                  <FeaturesSelect categories={categoriesList} />
                </View>
              )}
              <View
                style={{
                  position: "absolute",
                  top: 20,
                  right: 10,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Entypo
                  onPress={() => setShowFilter(!modalVisible)}
                  size={25}
                  color="#000"
                  name="cross"
                />
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
  },
  filterWrapper: {
    backgroundColor: "#fff",
    width: deviceWidth,
    height: deviceHeight,
    // height: deviceHeight - 300,
    position: "absolute",
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
  },
  filterInner: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
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
    zIndex: -1,
    position: "absolute",
    top: 60,
    left: 5,
    flex: 1,
    flexDirection: "column",
    width: 310,
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
