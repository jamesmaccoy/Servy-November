import React, { useState, useEffect } from "react";
import { ImageBackground, Text, Modal, Dimensions } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { View } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Rating from "../Generic/Rating";
import { LinearGradient } from "expo-linear-gradient";
import bg from "../../../assets/images/bg.png";
import { connect } from "react-redux";
import { selectOption } from "../../store/actions/Services";

const stars = [1, 2, 3, 4, 5];
const ProviderItem = ({
  data,
  navigation,
  pad,
  setProviderModal,
  selectOption,
}) => {
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

  const handlePreview = (e) => {
    setProviderModal(true);
    selectOption(data);
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <TouchableWithoutFeedback
      onPressOut={() => {
        navigation.navigate("AddService", {
          data: data,
          key: data.id,
          user: "Provider",
        });
      }}
    >
      <View>
        <View
          style={{ paddingBottom: 20, paddingLeft: pad, paddingRight: pad }}
        >
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
                  height: 300,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ padding: 20, color: "#fff", fontSize: 18 }}>
                  {data.serviceName}
                </Text>
                <View style={{ paddingTop: 20, paddingRight: 5 }}>
                  <TouchableWithoutFeedback
                    activeOpacity={1}
                    // onPress={(e) => {
                    //   e.preventDefault();
                    //   e.stopPropagation();
                    //   e.nativeEvent.stopImmediatePropagation();
                    // }}
                  >
                    <TouchableOpacity
                      // activeOpacity={1}
                      onPressIn={(e) => {
                        handlePreview(e);
                      }}
                    >
                      <Entypo
                        size={20}
                        color="#fff"
                        name="dots-three-vertical"
                      />
                    </TouchableOpacity>
                  </TouchableWithoutFeedback>
                </View>
              </LinearGradient>
            </ImageBackground>
            <Card.Content style={{ flexDirection: "row", padding: 20 }}>
              <FontAwesome
                style={{ fontSize: 30, paddingTop: 10 }}
                name="briefcase"
              />
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
      </View>
    </TouchableWithoutFeedback>
  );
};
const mapStateToProps = (state) => {
  return {
    userLocation: state.location.userLocation,
    initialDistance: state.location.initialDistance,
  };
};
export default connect(mapStateToProps, { selectOption })(ProviderItem);
