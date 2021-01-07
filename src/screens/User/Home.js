import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
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
} from "../../store/actions/Services";
import Filter from "../../components/User/Filter";
import ProviderItem from "../../components/User/ProviderItem";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { switchLoader } from "../../store/actions/User";
import Loader from "../Auth/Loader";
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

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
const Home = ({ ...props }) => {
  let navigation = props.navigation;
  let getServices = props.getServices;
  let getServicesByCategory = props.getServicesByCategory;
  let checkVisible = props.checkVisible;
  let serviceLoader = props.serviceLoader;
  let currentUser = props.currentUser;
  let switchLoader = props.switchLoader;
  let switchLoading = props.switchLoading;
  let getServicesByProvider = props.getServicesByProvider;

  const [showFilter, setShowFilter] = useState(false);
  const [newServices, setNewServices] = useState([]);
  const [proServices, setProServices] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    getServices();
  }, []);
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
  }, [props.providerServices]);

  useEffect(() => {
    if (props.route.params.id === 2) {
      if (props.route.params.state !== "") {
        getServicesByCategory(
          props.route.params.state,
          props.route.params.attributes
        );
      } else {
        getServices();
      }
    }
    if (props.route.params.id === 3) {
      getServices();
    }
  }, [props.route]);
  useEffect(() => {
    (async () => {
      await fetch("https://webrabbit.in/survey/banner-content.php")
        .then((response) => response.json())
        .then((json) => setData(json.content))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    })();
  }, []);
  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <View>
      {switchLoading && (
        <View
          style={{
            zIndex: 1,
            width: deviceWidth,
            height: deviceHeight,
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
        <ScrollView style={styles.screenitemcontainer}>
          <View>
            <ScrollView
              style={styles.screenitem}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {items.map((item) => (
                <View
                  style={[styles.listoption, { backgroundColor: item.bgcolor }]}
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
          </View>
          <View style={styles.categorieslisting}>
            {checkVisible === false && (
              <View style={styles.milesdata}>
                <Text style={styles.milesdatatxt}>
                  Suggested Servey pro's in your area
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={handleFilter}>
                  <View style={styles.milesdatain}>
                    <MaterialCommunityIcons
                      style={{ fontSize: 22, paddingTop: 10 }}
                      name="filter-variant"
                    />
                    <Text style={styles.milesdatatxtmi}> 2 Mile</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <>
                {serviceLoader || switchLoading ? (
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        marginLeft: 15,

                        flex: 1,
                        width: 260,
                        backgroundColor: "#eee",
                        height: 280,
                      }}
                    ></View>
                    <View
                      style={{
                        marginLeft: 15,
                        flex: 1,
                        width: 260,
                        backgroundColor: "#eee",
                        height: 280,
                      }}
                    ></View>
                  </View>
                ) : checkVisible === false ? (
                  newServices.length === 0 ? (
                    <View style={{ paddingLeft: 15 }}>
                      <Text>No Service Available</Text>
                    </View>
                  ) : (
                    newServices.map((data) => (
                      <ListingItem
                        pad={15}
                        key={data.id}
                        data={data}
                        navigation={navigation}
                      />
                    ))
                  )
                ) : (
                  <>
                    {proServices.map((data) => {
                      return (
                        <ProviderItem
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
          </View>
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

                    <Text style={styles.bannerdescription}>{item.content}</Text>
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
        </ScrollView>
      </View>

      <Filter
        navigation={navigation}
        setShowFilter={setShowFilter}
        modalVisible={showFilter}
        route={props.route}
      />
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
  };
};
export default connect(mapStateToProps, {
  getServices,
  getServicesByCategory,
  switchLoader,
  getServicesByProvider,
})(Home);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    paddingBottom: 110,
    minHeight: deviceHeight,
    paddingTop: 35,
  },
  header: { paddingLeft: 15, paddingRight: 15 },
  list: {
    paddingTop: 20,
    paddingBottom: 0,
  },
  screenitem: { paddingTop: 20, paddingLeft: 0 },
  screenitemcontainer: {},

  listoption: {
    alignItems: "center",
    flexDirection: "row",
    width: 140,
    height: 80,
    marginRight: 0,
    marginLeft: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },

  listimg: {
    width: 50,
    height: 50,
    color: "#fff",
  },
  listtxt: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 14,
    color: "#fff",
  },
  bannercont: {
    backgroundColor: "#ededed",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },

  bannerdetail: { flex: 1 },

  bannertitle: { color: "#62ad80", fontSize: 19, fontWeight: "bold" },

  bannerdescription: { color: "#999", fontSize: 16, marginBottom: 20 },
  bannerimg: { width: 90, height: 90 },

  loginScreenButton: {
    textAlign: "center",
    paddingTop: 8,
    padding: 10,
    paddingBottom: 8,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  bannerbuttontok: {
    borderColor: "#62ad80",
    borderWidth: 2,
    width: 200,
    textAlign: "center",
    borderColor: "#62ad80",
    borderWidth: 2,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  bannerbutton: {
    color: "#62ad80",
    marginLeft: 60,
  },
  categorieslisting: {
    marginTop: 20,
  },
  milesdata: {
    marginBottom: 18,
    marginTop: 6,
    paddingLeft: 10,
    paddingRight: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  milesdatain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: -4,
    justifyContent: "flex-end",
  },
  milesdatatxt: { fontSize: 16 },
  milesdatatxtmi: { fontSize: 16, marginTop: 10, marginLeft: 5 },
});
