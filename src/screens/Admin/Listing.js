import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import Header from "../../components/Admin/Header";
import { styles } from "../../styles/Admin/ListingStyle";
import ListingItem from "../../components/Admin/ListingItem";
import { providerService } from "../../store/actions/Admin";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import ListingModel from "../../components/Admin/ListingModel";

const Listing = ({ navigation, providerService, servicesList }) => {
  const [providerModal, setProviderModal] = useState(false);

  useEffect(() => {
    providerService();
  }, []);
  return (
    <ScrollView style={styles.screen}>
      <Header visible={false} navigation={navigation} name="Listing" />
      <View style={styles.list}>
        {servicesList.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={1}>
            <ListingItem
              setProviderModal={setProviderModal}
              data={item}
              key={item.id}
            />
          </TouchableOpacity>
        ))}
      </View>
      {providerModal && (
        <ListingModel
          setProviderModal={setProviderModal}
          visible={providerModal}
          navigation={navigation}
        />
      )}
    </ScrollView>
  );
};
const mapStateToProps = (state) => {
  return {
    servicesList: state.Admin.servicesList,
  };
};
export default connect(mapStateToProps, { providerService })(Listing);
