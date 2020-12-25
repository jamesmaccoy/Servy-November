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
import { getAdminCategory } from "../../store/actions/Category";
import MutipleSelect from "../../components/User/Multiple";
let deviceHeight = Dimensions.get("window").height;

const Services = ({ ...props }) => {
  let navigation = props.navigation;
  let getServices = props.getServices;
  let getServicesByCategory = props.getServicesByCategory;
  let getAdminCategory = props.getAdminCategory;
  let categories = props.categories;
  let services = props.services;

  const [loading, setLoading] = useState(true);
  const [newServices, setNewServices] = useState([]);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    if (services.length === 0) {
      getServices();
    }
    getAdminCategory();
  }, []);
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

  const [filterCategory, setFilterCategory] = useState([]);

  useEffect(() => {
    if (filterCategory.length === 0) {
      setNewServices(props.services);
    }
  }, [filterCategory]);

  return (
    <View style={styles.screen}>
      <Header
        filterButton={false}
        notificationButton={true}
        name="Services"
        navigation={navigation}
        visible={true}
      />
      <MutipleSelect
        setFilterCategory={setFilterCategory}
        categories={categories}
      />
      {loading ? (
        <View style={styles.loading}>
          <Loader />
        </View>
      ) : (
        <>
          {newServices.length === 0 ? (
            <View style={styles.noService}>
              <Text>No Service Available</Text>
            </View>
          ) : (
            <View style={styles.list}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingTop: 50, minHeight: deviceHeight }}>
                  {services.map((data) => {
                    if (
                      attributes.length !== 0 &&
                      data.attributes.includes(attributes)
                    ) {
                      if (filterCategory.includes(data.category)) {
                        return (
                          <ListingItem
                            pad={0}
                            key={data.id}
                            data={data}
                            navigation={navigation}
                          />
                        );
                      }
                    }
                    if (attributes.length === 0) {
                      if (filterCategory.includes(data.category)) {
                        return (
                          <ListingItem
                            pad={0}
                            key={data.id}
                            data={data}
                            navigation={navigation}
                          />
                        );
                      }
                    }
                    if (filterCategory.length === 0) {
                      return (
                        <ListingItem
                          pad={0}
                          key={data.id}
                          data={data}
                          navigation={navigation}
                        />
                      );
                    }
                  })}
                </View>
              </ScrollView>
            </View>
          )}
        </>
      )}
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
    paddingTop: 30,
    marginBottom: 90,
  },
  noService: {
    backgroundColor: "#f7f7f7",
    paddingTop: 80,
    paddingBottom: 20,
    height: deviceHeight,
  },
  loading: {
    backgroundColor: "#f7f7f7",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: deviceHeight - 100,
  },
});
