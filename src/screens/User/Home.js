import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/User/Header";
import ListingItem from "../../components/User/ListingItem";
import { Text } from "native-base";
import { connect } from "react-redux";
import {
  getServices,
  getServicesByCategory,
} from "../../store/actions/Services";
import Filter from "../../components/User/Filter";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { cos } from "react-native-reanimated";

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

  const [showFilter, setShowFilter] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [newServices, setNewServices] = useState([]);
  useEffect(() => {
    getServices();
  }, []);
  const handleFilter = () => {
    setShowFilter(!showFilter);
  };
  useEffect(() => {
    getServices();
  }, []);
  useEffect(() => {
    setNewServices(props.services);
  }, [props.services]);
  useEffect(() => {
    if (props.route.params.id === 2) {
      setAttributes(props.route.params.attributes);
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
      setAttributes(props.route.params.attributes);
      getServices();
    }
  }, [props.route]);

  return (
    <TouchableOpacity onPress={() => setShowFilter(false)} activeOpacity={1}>
      <View opacity={showFilter ? 0.7 : 1} style={styles.screen}>
        <View style={styles.header}>
          <Header navigation={navigation} name="Home" visible={true} />
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
                  <Text style={styles.milesdatatxtmi}> 2 Km</Text>
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {newServices.map((data) => (
                <ListingItem
                  // initialDistance={distance}
                  pad={15}
                  key={data.id}
                  data={data}
                  navigation={navigation}
                />
              ))}
            </ScrollView>
            {newServices.length === 0 && (
              <View style={{ paddingLeft: 15 }}>
                <Text>No service Available</Text>
              </View>
            )}
          </View>

          <View style={styles.bannercont}>
            <View style={styles.bannerdetail}>
              <Text style={styles.bannertitle}>Lorem Ipsum Dior almet</Text>

              <Text style={styles.bannerdescription}>Lorem Ipsum</Text>
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
    </TouchableOpacity>
  );
};
const mapStateToProps = (state) => {
  return {
    services: state.Service.services,
    userLocation: state.location.userLocation,
  };
};
export default connect(mapStateToProps, { getServices, getServicesByCategory })(
  Home
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7f7f7",
    paddingBottom: 110,
    paddingTop: 35,
  },
  header: { paddingLeft: 15, paddingRight: 15 },
  list: {
    paddingTop: 20,
    paddingBottom: 0,
  },
  screenitem: { paddingTop: 20, paddingLeft: 0 },
  screenitemcontainer: {
    minHeight: 450,
  },

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
