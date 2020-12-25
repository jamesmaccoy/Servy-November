import React, { useState, useEffect } from "react";
import { Text, View, Animated, KeyboardAvoidingView } from "react-native";
import Input from "../../components/Generic/Input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Entypo } from "@expo/vector-icons";
import CheckBoxList from "../../components/User/CheckBoxList";
import { styles } from "../../styles/User/AddServiceStyle";
import { AddNewService } from "../../store/actions/Services";
import { getAdminCategory } from "../../store/actions/Category";
import { connect } from "react-redux";
import PickImage from "../../components/User/PickImage";
import ServiceLocation from "../../components/User/ServiceLocation";
import CategoryPicker from "../../components/User/CategoryPicker";
import Loader from "../../screens/Auth/Loader";
import { Button } from "native-base";

const AddService = ({
  navigation,
  AddNewService,
  serviceMessage,
  getAdminCategory,
  categories,
  loading,
  serviceLoading,
}) => {
  const [array, setArray] = useState([]);

  const [message, setMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [state, setState] = useState({
    serviceName: "",
    location: "",
    maps: "",
    category: "",
  });
  const [cat, setCat] = useState([]);
  useEffect(() => {
    getAdminCategory();
    setCat(categories);
  }, []);
  useEffect(() => {
    setCat(categories);
  }, [categories]);
  useEffect(() => {
    console.log();
    setMessage(serviceMessage);
  }, [serviceMessage]);

  const [addServiceLoading, setAddServiceLoading] = useState(false);
  const [stateChange, setStateChange] = useState(false);
  useEffect(() => {
    setAddServiceLoading(loading);
  }, [loading]);
  const navigationHandler = () => {
    navigation.goBack();
  };
  const [images, setImages] = useState([]);
  const [selectedValue, setSelectedValue] = useState({
    value: "",
    features: [],
  });

  const [userLocation, setUserLocation] = useState({
    errorMessage: "",
    locationCords: {},
    map: false,
  });
  const [visible, setVisible] = useState(false);

  const handleInfo = () => {
    if (
      state.serviceName !== "" &&
      state.location !== "" &&
      state.maps !== null &&
      state.category !== "" &&
      array !== [] &&
      Object.keys(userLocation.locationCords).length !== 0 &&
      images.length !== 0
    ) {
      AddNewService(state, array, userLocation, images);
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
      setMessage(false);
    }
  };
  const [newFeature, setNewFeature] = useState({
    label: "",
    state: false,
  });
  const [featureVisible, setFeatureVisible] = useState(false);
  const showFeature = () => {
    setFeatureVisible(!featureVisible);
  };
  const AddFeature = () => {
    console.log("selected value", selectedValue);
    if (newFeature.label !== "") {
      setStateChange(true);
      setSelectedValue({
        ...selectedValue,
        other: selectedValue.other,
        value: selectedValue.value,
        label: selectedValue.label,
        features: selectedValue.features.concat(newFeature),
      });
    }
  };
  const [select, setSelect] = useState(false);
  useEffect(() => {
    setArray([]);
    setSelect(false);
  }, [select]);

  return (
    <>
      {addServiceLoading ? (
        <Loader />
      ) : (
        <View style={styles.screen}>
          <View style={styles.header}>
            <TouchableOpacity onPress={navigationHandler}>
              <AntDesign name="arrowleft" size={25} color="#000" />
            </TouchableOpacity>
            {message && (
              <Text style={{ color: "green" }}>Data Added Sucessfully</Text>
            )}
            {serviceLoading && (
              <Text style={{ color: "green" }}>Please wait for a while</Text>
            )}
            {errorMessage && (
              <Text style={{ color: "red" }}>Provide All Information</Text>
            )}

            <TouchableOpacity onPress={handleInfo} style={styles.btn}>
              <Text>Save & Exit</Text>
            </TouchableOpacity>
          </View>
          <Animated.ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.create}>
              <KeyboardAvoidingView keyboardVerticalOffset={20}>
                <Text style={styles.heading}>Profile details</Text>
                <Input
                  name="service"
                  head="Give your service a name"
                  placeHolder="e.g Pine Technologies"
                  onChangeText={(serviceName) =>
                    setState({ ...state, serviceName: serviceName })
                  }
                />
                <CategoryPicker
                  selectedValue={selectedValue}
                  setState={setState}
                  categories={cat}
                  setSelectedValue={setSelectedValue}
                  state={state}
                  setArray={setArray}
                  setSelect={setSelect}
                  setVisible={setVisible}
                  visible={visible}
                  stateChange={stateChange}
                />

                {visible && (
                  <Input
                    name="NewCateogry"
                    head="Suggest a new Category"
                    placeHolder="eg. Electrition"
                    onChangeText={(text) =>
                      setState({ ...state, category: text })
                    }
                  />
                )}
                <Text
                  style={{ paddingTop: 15, fontSize: 15, color: "#a9a9a9" }}
                >
                  Assign Features for this category
                </Text>
                <View style={styles.checkboxList}>
                  {selectedValue.features &&
                    selectedValue.features.map((subValue, index) => {
                      return (
                        <>
                          {subValue.state && (
                            <CheckBoxList
                              select={select}
                              index={index}
                              head={subValue.label}
                              key={index}
                              array={array}
                              setArray={setArray}
                              label={subValue.label}
                              subValue={selectedValue.features}
                              state={subValue.state}
                              id={subValue.id}
                            />
                          )}
                        </>
                      );
                    })}
                </View>
                <View>
                  <View style={styles.nfbtn}>
                    <Text
                      style={{
                        textAlign: "left",
                        paddingTop: 10,
                        paddingLeft: 5,
                        width: 250,
                        color: "#000",
                        fontSize: 15,
                      }}
                    >
                      New Features
                    </Text>
                    <Button
                      style={styles.showFeatures}
                      onPress={showFeature}
                      full
                    >
                      <Entypo name="plus" color={"#000"} size={20} />
                      <Text
                        style={{
                          textAlign: "center",
                          paddingLeft: 8,
                          color: "#000",
                          fontSize: 15,
                        }}
                      >
                        Add
                      </Text>
                    </Button>
                  </View>
                  {featureVisible && (
                    <View>
                      <Input
                        name="Feature"
                        head="Feature"
                        placeHolder="eg. DeliveryIncluded"
                        onChangeText={(values) =>
                          setNewFeature({
                            ...newFeature,
                            attributeState: false,
                            label: values,
                            state: true,
                            id: values.replace(/\s/g, ""),
                          })
                        }
                      />
                      <View style={{ flexDirection: "row", paddingTop: 20 }}>
                        <Button
                          style={styles.addFeatures}
                          onPress={AddFeature}
                          full
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: "#000",
                              fontSize: 12,
                            }}
                          >
                            Add Feature
                          </Text>
                        </Button>
                      </View>
                    </View>
                  )}
                </View>
                <Text style={styles.heading}>Location</Text>
                <Input
                  name="location"
                  head="Friendly Location (suburb)"
                  placeHolder="eg. Rondebosch"
                  onChangeText={(location) => setState({ ...state, location })}
                />
                <ServiceLocation
                  userLocation={userLocation}
                  setUserLocation={setUserLocation}
                  state={state}
                />

                <Text style={styles.heading}>Gallery</Text>
                <PickImage images={images} />
              </KeyboardAvoidingView>
            </View>
          </Animated.ScrollView>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    serviceMessage: state.Service.serviceMessage,
    serviceLoading: state.Service.serviceLoading,
    categories: state.category.adminCollection,
    categoryFeatures: state.Service.categoryFeatures,
    loading: state.Service.loading,
  };
};
export default connect(mapStateToProps, {
  AddNewService,
  getAdminCategory,
})(AddService);
