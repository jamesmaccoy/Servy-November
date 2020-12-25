import React, { useEffect, useState } from "react";
import { Text, Image, View, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Drawer from "./Drawer";
import { connect } from "react-redux";
import { profileInformation } from "../../store/actions/User";
import { styles } from "../../styles/User/UserHeaderStyle";
const Header = ({ ...props }) => {
  let navigation = props.navigation;
  let profileInfo = props.profileInfo;
  let checkVisible = props.checkVisible;
  let filterButton = props.filterButton;
  let notificationButton = props.notificationButton;

  const [state, setState] = useState({
    update: false,
    photo: "",
    switchValue: false,
  });
  const [userName, setUserName] = useState("");
  const [check, setCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    profileInfo.map((data) => {
      if (data.photoURL !== "") {
        setState({ ...state, update: true, photo: data.photoURL });
      }
    });
  }, []);

  useEffect(() => {
    profileInfo.map((data) => {
      if (data.photoURL !== "") {
        setState({
          ...state,
          update: true,
          photo: data.photoURL,
        });
      }
      if (data.firstName === "") {
        setUserName(data.Name);
      }
      if (data.firstName !== "") {
        setUserName(data.firstName);
      }
    });
  }, [profileInfo]);

  useEffect(() => {
    console.log(checkVisible);
    setCheck(checkVisible);
  }, [checkVisible]);

  const navigationHanlder = () => {
    navigation.navigate("AddService");
  };

  const handleNotification = () => {
    navigation.navigate("Notification");
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.usernamedetail}>
          <View style={styles.userNameDetails}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              {state.update === true ? (
                <Image style={styles.image} source={{ uri: state.photo }} />
              ) : (
                <Image
                  style={styles.image}
                  source={require("../../../assets/images/user1.jpeg")}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.text}>
              Welcome Back{"\n"} {userName}
            </Text>
          </View>
          <View style={styles.icons}>
            {filterButton !== true && check && (
              <Entypo
                onPress={navigationHanlder}
                name="plus"
                onPress={navigationHanlder}
                size={25}
                color={"#000"}
                style={{ paddingRight: 12 }}
              />
            )}
            {notificationButton && (
              <TouchableOpacity onPress={handleNotification}>
                <Ionicons name={"ios-notifications"} size={25} color={"#000"} />
              </TouchableOpacity>
            )}
          </View>
          {filterButton && (
            <MaterialCommunityIcons
              onPress={props.handleFilter}
              style={{ fontSize: 25 }}
              name="filter-variant"
            />
          )}
        </View>
      </View>
      <Drawer
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    profileInfo: state.profile.profileInformation,
    checkVisible: state.User.status,
  };
};
export default connect(mapStateToProps, { profileInformation })(Header);
