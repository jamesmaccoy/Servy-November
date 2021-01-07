import React, { useState, useEffect } from "react";
import { ImageBackground, Text } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Rating from "../Generic/Rating";
import { LinearGradient } from "expo-linear-gradient";
import bg from "../../../assets/images/bg.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
const stars = [1, 2, 3, 4, 5];
const ListingItem = ({ data, navigation, pad }) => {
  const [serviceImage, setServiceImage] = useState({
    image: "",
    state: false,
  });

  useEffect(() => {
    if (data.imagesUrl.length !== 0) {
      setServiceImage({
        ...serviceImage,
        image: data.imagesUrl[0],
        state: true,
      });
    }
  }, [data]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("ListDetail", {
          data: data,
          key: data.id,
          user: "Provider",
        });
      }}
    >
      <View style={{ paddingBottom: 20, paddingLeft: pad, paddingRight: pad }}>
        <Card style={{ height: 280 }}>
          <ImageBackground
            style={{ flex: 1 }}
            source={
              serviceImage.state === true ? { uri: serviceImage.image } : bg
            }
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.5)", "transparent"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 300,
              }}
            >
              <Text style={{ padding: 20, color: "#fff", fontSize: 18 }}>
                {data.serviceName}
              </Text>
            </LinearGradient>
          </ImageBackground>
          <Card.Content
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 0,
            }}
          >
            <View
              style={{
                padding: 0,
                flexDirection: "column",
                justifyContent: "flex-end",
                flex: 1,
                marginTop: 10,
              }}
            >
              <MaterialCommunityIcons style={{ fontSize: 30 }} name="update" />
              <Paragraph style={{ fontSize: 10 }}>
                {data.createdAt.toDate().toLocaleTimeString("en-US")} {"\n"}
                {data.createdAt.toDate().toLocaleDateString("en-US")}
              </Paragraph>
            </View>
            <Card.Content style={{ fontSize: 20 }}>
              <Paragraph>{data.category} </Paragraph>
              <Card.Content style={{ paddingLeft: 0, flexDirection: "row" }}>
                <View style={{ flexDirection: "row" }}>
                  {stars.map((x, index) => (
                    <TouchableOpacity key={x}>
                      <Rating
                        filled={x <= data.averageRating ? true : false}
                        name="Service"
                        size={16}
                        key={x}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <Paragraph style={{ paddingLeft: 5 }}>
                  Reviews ({data.totalReviews})
                </Paragraph>
              </Card.Content>
            </Card.Content>
          </Card.Content>
        </Card>
      </View>
    </TouchableOpacity>
  );
};
const mapStateToProps = (state) => {
  return {
    userLocation: state.location.userLocation,
    initialDistance: state.location.initialDistance,
  };
};
export default connect(mapStateToProps)(ListingItem);
