import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";


const Maps = ({ userLocation, companyName, locationName, initialValue }) => {
  const [state, setState] = useState({
    userLatitude: 0,
    userLongitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setState({
      ...state,
      userLatitude: userLocation.coords.latitude,
      userLongitude: userLocation.coords.longitude,
    });
  }, [userLocation]);


  useEffect(() => {
    if (initialValue) {
      
      setState({
        ...state,
        userLatitude: initialValue.coords.latitude,
        userLongitude: initialValue.coords.longitude,
      });
    }
  }, [initialValue]);

  return (
    <View>
 

      <View style={styles.container}>
        <MapView
          loadingEnabled={false}
          region={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
          style={styles.mapStyle}
        >
          <MapView.Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title={companyName}
            description={locationName}
          />
        </MapView>
      </View>
    </View>
  );
};

export default Maps;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: 200,
  },
});
