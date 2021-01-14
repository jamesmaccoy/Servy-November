import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
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
import ProviderModal from "../../components/User/ProviderModal";
import { styles } from "../../styles/User/HomeStyle";

const Home = ({ ...props }) => {
  let navigation = props.navigation;
  let getServices = props.getServices;
  let getServicesByCategory = props.getServicesByCategory;
  let checkVisible = props.checkVisible;
  let serviceLoader = props.serviceLoader;
  let switchLoader = props.switchLoader;
  let switchLoading = props.switchLoading;
  let getServicesByProvider = props.getServicesByProvider;

  const [showFilter, setShowFilter] = useState(false);
  const [newServices, setNewServices] = useState([]);
  const [proServices, setProServices] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [providerModal, setProviderModal] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    getServices();
  }, []);
  useEffect(() => {
    switchLoader(false);
  }, [checkVisible]);

  useEffect(() => {
    if (checkVisible === true && props.providerServices.length === 0) {
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
        <ScrollView style={styles.screenitemcontainer}>
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
                  <View style={styles.dummyContent}>
                    <View style={styles.innerDummy}></View>
                    <View style={styles.innerDummy2}></View>
                  </View>
                ) : checkVisible === false ? (
                  newServices.length === 0 ? (
                    <View style={{ paddingLeft: 15 }}>
                      <Text>No Service Available</Text>
                    </View>
                  ) : (
                    newServices.map((data) => {
                      return (
                        <ListingItem
                          pad={15}
                          key={data.id}
                          data={data}
                          navigation={navigation}
                        />
                      );
                    })
                  )
                ) : (
                  <>
                    {proServices.map((data) => {
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
        </ScrollView>
      </View>
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
