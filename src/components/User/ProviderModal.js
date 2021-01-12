import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Entypo, MaterialIcons } from "react-native-vector-icons";
import { connect } from "react-redux";
import { deletesService } from "../../store/actions/Services";
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const ProviderModal = ({
  visible,
  setProviderModal,
  optionSelect,
  navigation,
  deletesService,
}) => {
  const handleSelect = () => {
    setProviderModal(false);
  };
  const handlePreview = () => {
    setProviderModal(false);
    navigation.navigate("ListDetail", {
      data: optionSelect,
      key: optionSelect.id,
      user: "Provider",
    });
  };
  const handleDelete = () => {
    console.log("herreee");
    Alert.alert(
      "Are You Sure You Want to Delete? ",
      ``,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setProviderModal(false);
            deletesService(optionSelect.id);
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          height: deviceHeight,
          width: deviceWidth,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={handleSelect}
          style={{
            flex: 4,
            width: deviceWidth,
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        ></TouchableOpacity>
        <View
          style={{
            flex: 2,
            width: deviceWidth,
            backgroundColor: "#fff",
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 18 }}>More</Text>
          <View style={{ paddingTop: 30 }}>
            <TouchableOpacity
              onPress={handlePreview}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Entypo
                size={30}
                style={{ color: "#000" }}
                name="controller-play"
              />
              <Text style={{ paddingLeft: 30, fontSize: 18 }}>Preview</Text>
            </TouchableOpacity>
            {optionSelect.serviceName !== "Hoola hoop teacher" && (
              <TouchableOpacity
                onPress={handleDelete}
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  size={30}
                  style={{ color: "#000" }}
                  name="delete"
                />
                <Text style={{ paddingLeft: 30, fontSize: 18 }}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    optionSelect: state.Service.optionSelect,
  };
};
export default connect(mapStateToProps, { deletesService })(ProviderModal);
