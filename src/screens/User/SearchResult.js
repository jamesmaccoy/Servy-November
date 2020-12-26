import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import Header from "../../components/User/Header";
import ListingItem from "../../components/User/ListingItem";
import { Text } from "native-base";
import { connect } from "react-redux";
import Loader from "./Loader";
import {
  getServices,
  getServicesByCategory,
} from "../../store/actions/Services";
import Filter from "../../components/User/Filter";
import { getAdminCategory } from "../../store/actions/Category";
let deviceHeight = Dimensions.get("window").height;

const Services = ({ ...props }) => {
  let navigation = props.navigation;
  let getServices = props.getServices;
  let getServicesByCategory = props.getServicesByCategory;
  let getAdminCategory = props.getAdminCategory;
  let services = props.services;

  const [loading, setLoading] = useState(true);
  const [newServices, setNewServices] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (filterCategory.length === 0) {
      setNewServices(services);
    }
  }, [services, filterCategory]);
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
    setLoading(props.serviceLoader);
  }, [props.serviceLoader]);
  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  const [filterCategory, setFilterCategory] = useState([]);

  useEffect(() => {
    if (filterCategory.length === 0) {
      setNewServices(props.services);
    }
  }, [filterCategory]);
  return (
    <View style={styles.screen}>
      <Header
        filterButton={true}
        notificationButton={false}
        name="Services"
        navigation={navigation}
        visible={true}
        handleFilter={handleFilter}
      />

      {loading ? (
        <View
          style={{
            backgroundColor: "#f7f7f7",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            minHeight: deviceHeight - 100,
          }}
        >
          <Loader />
        </View>
      ) : (
        <>
          {newServices.length === 0 ? (
            <View
              style={{
                backgroundColor: "#f7f7f7",
                paddingTop: 10,
                paddingBottom: 20,
                height: deviceHeight,
              }}
            >
              <Text style={{ color: "#9c9c9c" }}>No Service Available</Text>
            </View>
          ) : (
            <View style={styles.list}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingTop: 10, paddingBottom: 20 }}>
                  <Text style={{ color: "#9c9c9c" }}>Search Results</Text>
                </View>
                <View style={{ minHeight: deviceHeight }}>
                  {services.map((data) => {
                    return (
                      <ListingItem
                        pad={0}
                        key={data.id}
                        data={data}
                        navigation={navigation}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          )}
        </>
      )}
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
    serviceLoader: state.Service.serviceLoader,
    categories: state.category.adminCollection,
  };
};
export default connect(mapStateToProps, {
  getServices,
  getServicesByCategory,
  getAdminCategory,
})(Services);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    paddingTop: 35,
  },
  list: {
    marginBottom: 90,
    paddingTop: 20,
  },
});