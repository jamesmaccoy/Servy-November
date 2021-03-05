import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  Dimensions,
} from "react-native";
import Header from "../../components/User/Header";
import ListingItem from "../../components/User/ListingItem";
import { Text } from "native-base";
import { connect } from "react-redux";
import {
  getServices,
  getServicesByCategory,
  getServicesByProvider,
  getDynamicLinkId,
  resetDynamicLoader,
  restrictNavigation,
} from "../../store/actions/Services";
import { bannerInfo } from "../../store/actions/User";
import Filter from "../../components/User/Filter";
import ProviderItem from "../../components/User/ProviderItem";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { switchLoader } from "../../store/actions/User";
import ProviderModal from "../../components/User/ProviderModal";
import { styles } from "../../styles/User/HomeStyle";
import Loader from "../Auth/Loader";
import SnackBar from "../../components/Generic/SnackBar";

const Home = ({ ...props }) => {
  let navigation = props.navigation;
  let getServices = props.getServices;
  let checkVisible = props.checkVisible;
  let serviceLoader = props.serviceLoader;
  let switchLoader = props.switchLoader;
  let switchLoading = props.switchLoading;
  let getServicesByProvider = props.getServicesByProvider;
  let bannerInfo = props.bannerInfo;
  let dynamicId = props.dynamicId;
  let dynamicLoader = props.dynamicLoader;
  let resetDynamicLoader = props.resetDynamicLoader;
  let restrictNavigation = props.restrictNavigation;

  const [showFilter, setShowFilter] = useState(false);
  const [newServices, setNewServices] = useState([]);
  const [proServices, setProServices] = useState([]);
  const [providerModal, setProviderModal] = useState(false);
  const [activeServices, setActiveServices] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getServices();
    bannerInfo();
  }, []);

  const chnageScreen = () => {
    navigation.navigate("ListDetail", {
      data: {},
      key: dynamicId,
    });
  };

  useEffect(() => {
    if (dynamicId !== "") {
      setTimeout(() => {
        chnageScreen();
      }, 200);
      setTimeout(() => {
        resetDynamicLoader();
      }, 1000);
    }
    if (dynamicId === "") {
      resetDynamicLoader();
    }
  }, [dynamicId]);

  useEffect(() => {
    switchLoader(false);
  }, [checkVisible]);

  useEffect(() => {
    if (checkVisible === true) {
      getServicesByProvider();
    }
  }, [checkVisible]);
  useEffect(() => {
    setNewServices(props.services);
  }, [props.services]);

  useEffect(() => {
    setProServices(props.providerServices);
    setActiveServices(
      props.providerServices.filter((data) => {
        return data.approve === true && data.id !== "snmpjSLY6rnMC39rxi9F";
      })
    );
  }, [props.providerServices]);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (props.route.params) {
      if (props.route.params.id === 121) {
        // restrictNavigation();
        // setVisible(true);
        setAlertMessage(props.route.params.message);
      }
    }
  }, [props]);
  useEffect(() => {
    if (props.serviceMessage) {
      setVisible(true);
    }
  }, [props.serviceMessage]);

  useEffect(() => {
    fetch("https://thanks.digital/survey/banner-content.php")
      .then((response) => response.json())
      .then((json) => setData(json.content))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <View>
      {dynamicLoader ? (
        <Modal transparent={true} visible={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </View>
        </Modal>
      ) : (
        <View>
          {switchLoading && (
            <View style={styles.loading}>
              <Text>Switching...</Text>
            </View>
          )}
          <View opacity={showFilter ? 0.7 : 1} style={styles.screen}>
            <View style={styles.header}>
              <Header
                navigation={navigation}
                name="Home"
                visible={true}
                notificationButton={true}
                filterButton={false}
              />
            </View>
            {/* <Text>dynamic id {dynamicId} </Text>
            <Text>check url {props.checkUrl} </Text> */}
            <ScrollView style={styles.screenitemcontainer}>
              <SnackBar
                setVisible={setVisible}
                visible={visible}
                message={alertMessage}
              />
              <ScrollView
                style={styles.screenitem}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              >
                {items.map((item) => (
                  <View
                    style={[
                      styles.listoption,
                      { backgroundColor: item.bgcolor },
                    ]}
                    key={item.key}
                  >
                    <FontAwesome
                      style={[styles.listimg, { fontSize: 30, paddingTop: 10 }]}
                      name={item.ico}
                    />

                    <Text style={styles.listtxt}>{item.label}</Text>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.categorieslisting}>
                {checkVisible === false ? (
                  <View style={styles.milesdata}>
                    <Text style={styles.milesdatatxt}>
                      Suggested Servey pro's in your area
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={handleFilter}
                    >
                      <View style={styles.milesdatain}>
                        <MaterialCommunityIcons
                          style={{ fontSize: 22, paddingTop: 10 }}
                          name="filter-variant"
                        />
                        <Text style={styles.milesStyle}> 2 Mile</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.milesdata}>
                    <Text style={styles.milesdatatxt}>
                      Services({activeServices.length} Active Services)
                    </Text>
                  </View>
                )}
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                >
                  <>
                    {serviceLoader || switchLoading ? (
                      <View style={styles.dummyContent}>
                        <View style={styles.innerDummy}></View>
                        <View style={styles.innerDummy2}></View>
                      </View>
                    ) : checkVisible === false ? (
                      <>
                        {props.serviceAvailable === false && (
                          <View style={styles.noService}>
                            <Text style={{ color: "#9c9c9c", fontSize: 18 }}>
                              No Service Available in this Area
                            </Text>
                            <Entypo
                              style={{ color: "#9c9c9c", fontSize: 22 }}
                              name="emoji-sad"
                            />
                          </View>
                        )}
                        {newServices.length !== 0 &&
                          newServices.map((data) => {
                            return (
                              <ListingItem
                                pad={15}
                                key={data.id}
                                data={data}
                                navigation={navigation}
                              />
                            );
                          })}
                      </>
                    ) : (
                      <>
                        {proServices.map((data, index) => {
                          return (
                            <ProviderItem
                              setProviderModal={setProviderModal}
                              pad={15}
                              key={data.id}
                              data={data}
                              navigation={navigation}
                            />
                          );
                        })}
                      </>
                    )}
                  </>
                </ScrollView>

                <View style={styles.bannercont}>
                  {isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <FlatList
                      data={data}
                      keyExtractor={({ id }, index) => id}
                      renderItem={({ item }) => (
                        <View style={styles.bannerdetail}>
                          <Text style={styles.bannertitle}>{item.title}</Text>

                          <Text style={styles.bannerdescription}>
                            {item.content}
                          </Text>
                          <View style={styles.bannerbuttontok}>
                            <TouchableOpacity
                              style={styles.loginScreenButton}
                              underlayColor="#fff"
                            >
                              <FontAwesome
                                style={{ fontSize: 30, color: "#62ad80" }}
                                name="code-fork"
                              />
                              <Text style={styles.bannerbutton}>Button</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    />
                  )}
                  <Image
                    style={styles.bannerimg}
                    source={require("../../../assets/images/13.png")}
                  />
                </View>
              </View>
            </ScrollView>

            {providerModal && (
              <ProviderModal
                navigation={navigation}
                setProviderModal={setProviderModal}
                visible={providerModal}
              />
            )}
            {showFilter && (
              <Filter
                navigation={navigation}
                setShowFilter={setShowFilter}
                modalVisible={showFilter}
                route={props.route}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    services: state.Service.services,
    userLocation: state.location.userLocation,
    serviceLoader: state.Service.serviceLoader,
    checkVisible: state.User.status,
    currentUser: state.Auth.user,
    switchLoading: state.User.switchLoader,
    providerServices: state.Service.userServices,
    dynamicId: state.Service.dynamicId,
    dynamicLoader: state.Service.dynamicLoader,
    dynamicUrl1: state.Service.dynamicUrl1,
    checkUrl: state.Service.checkUrl,
    serviceAvailable: state.Service.servicesLenght,
    serviceMessage: state.Service.serviceMessage,
  };
};
export default connect(mapStateToProps, {
  getServices,
  getServicesByCategory,
  switchLoader,
  getServicesByProvider,
  bannerInfo,
  getDynamicLinkId,
  resetDynamicLoader,
  restrictNavigation,
})(Home);

const items = [
  {
    key: String(Math.random()),
    ico: "user-circle",
    label: "Add Profile Picture",
    bgcolor: "#60ad7f",
  },
  {
    key: String(Math.random()),
    ico: "image",
    label: "Upload ID document",
    bgcolor: "#bacdd9",
  },
  {
    key: String(Math.random()),
    ico: "address-card",
    label: "Category 3",
    bgcolor: "#68a3ca",
  },
  {
    key: String(Math.random()),
    ico: "handshake-o",
    label: "Category 4",
    bgcolor: "#999",
  },
];
