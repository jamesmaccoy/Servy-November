import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import Header from "../../components/User/Header";
import ListingItem from "../../components/User/ListingItem";
import { Text } from "native-base";
import { connect } from "react-redux";
import Loader from "../Auth/Loader";
import {
  getServices,
  getServicesByCategory,
  getServicesByProvider,
} from "../../store/actions/Services";
import { switchLoader } from "../../store/actions/User";
import { getAdminCategory } from "../../store/actions/Category";
import MutipleSelect from "../../components/User/Multiple";
import ProviderItem from "../../components/User/ProviderItem";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const Services = ({ ...props }) => {
  let navigation = props.navigation;
  let getServices = props.getServices;
  let getServicesByCategory = props.getServicesByCategory;
  let getAdminCategory = props.getAdminCategory;
  let categories = props.categories;
  let services = props.services;
  let serviceLoader = props.serviceLoader;
  let switchLoading = props.switchLoading;
  let checkVisible = props.checkVisible;
  let currentUser = props.currentUser;
  let getServicesByProvider = props.getServicesByProvider;
  let providerServices = props.providerServices;

  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState([]);
  const [newServices, setNewServices] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [proServices, setProServices] = useState([]);

  useEffect(() => {
    getServices();
    getAdminCategory();
  }, []);
  useEffect(() => {
    if (filterCategory.length === 0) {
      if (checkVisible === false) {
        setNewServices(services);
      }
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

  useEffect(() => {
    if (filterCategory.length === 0) {
      setNewServices(props.services);
    }
  }, [filterCategory]);

  useEffect(() => {
    switchLoader(false);
    if (checkVisible === true && providerServices.length === 0) {
      getServicesByProvider();
    }
  }, [checkVisible]);

  useEffect(() => {
    setProServices(props.providerServices);
  }, [props.providerServices]);

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

      <View style={styles.screen}>
        <Header
          filterButton={false}
          notificationButton={true}
          name="Services"
          navigation={navigation}
          visible={true}
        />
        {checkVisible === false && (
          <MutipleSelect
            setFilterCategory={setFilterCategory}
            categories={categories}
          />
        )}
        {serviceLoader ? (
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
              <View
                style={{ paddingTop: checkVisible ? 0 : 30, marginBottom: 90 }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ paddingTop: 50, minHeight: deviceHeight }}>
                    {checkVisible ? (
                      proServices.map((data) => {
                        return (
                          <ProviderItem
                            pad={0}
                            key={data.id}
                            data={data}
                            navigation={navigation}
                          />
                        );
                      })
                    ) : (
                      <>
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
                      </>
                    )}
                  </View>
                </ScrollView>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    services: state.Service.services,
    serviceLoader: state.Service.serviceLoader,
    categories: state.category.adminCollection,
    switchLoading: state.User.switchLoader,
    checkVisible: state.User.status,
    currentUser: state.Auth.user,
    providerServices: state.Service.userServices,
  };
};
export default connect(mapStateToProps, {
  getServices,
  getServicesByCategory,
  getAdminCategory,
  switchLoader,
  getServicesByProvider,
})(Services);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    paddingTop: 35,
    paddingBottom: 80,
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
