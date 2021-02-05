import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Entypo } from "react-native-vector-icons";
import { connect } from "react-redux";
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const ListingModal = ({
  visible,
  setProviderModal,
  navigation,
  currentData,
}) => {
  const handleSelect = () => {
    setProviderModal(false);
  };
  const handlePreview = () => {
    setProviderModal(false);
  };
  const handleEdit = () => {
    setProviderModal(false);
  };


  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modelStyle}>
        <TouchableOpacity
          onPress={handleSelect}
          style={styles.wrapper}
        ></TouchableOpacity>
        <View style={styles.innerWrapper}>
          <Text style={{ fontSize: 18 }}>More</Text>
          <View>
            <TouchableOpacity onPress={handlePreview} style={styles.actions}>
              <Entypo
                size={30}
                style={{ color: "#000" }}
                name="controller-play"
              />
              <Text style={{ paddingLeft: 30, fontSize: 18 }}>
                {currentData.serviceName}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    optionSelect: state.Service.optionSelect,
    currentData: state.Admin.currentData,
  };
};
export default connect(mapStateToProps)(ListingModal);

export const styles = StyleSheet.create({
  modelStyle: {
    height: deviceHeight,
    width: deviceWidth,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  wrapper: {
    flex: 8,
    width: deviceWidth,
    backgroundColor: "rgba(0,0,0,.5)",
  },
  innerWrapper: {
    flex: 2.5,
    width: deviceWidth,
    backgroundColor: "#fff",
    padding: 20,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
