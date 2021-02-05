import React, { useState } from "react";
import { Avatar, Button, Card, Paragraph } from "react-native-paper";
import { View, Text, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { styles } from "../../styles/Admin/listingItemStyle";
import { Approve } from "../../store/actions/Admin";
import { sendPushNotification } from "../../store/actions/Auth";
import { currentOption } from "../../store/actions/Admin";
import { connect } from "react-redux";
const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const ListingItem = ({
  data,
  Approve,
  sendPushNotification,
  setProviderModal,
  currentOption,
}) => {
  // const [approveFalg, setApproveFlag] = useState(false);
  // const [cloneFalg, setCloneFlag] = useState(false);
  const handleClone = () => {
    Approve(false, data.userId);
    // setCloneFlag(!cloneFalg);
    // const timer = setTimeout(() => {
    //   setCloneFlag(false);
    // }, 100);
  };
  const handlePreview = () => {
    currentOption(data);
    setProviderModal(true);
  };
  const handleApprove = () => {
    sendPushNotification(data.userId, data.serviceName, data.id);
  };

  return (
    <View style={{ paddingBottom: 20 }}>
      <Card style={{ height: 280 }}>
        <ImageBackground
          style={{ flex: 1 }}
          source={{ uri: data.imagesUrl[0] }}
        >
          <View
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
              <TouchableWithoutFeedback activeOpacity={1}>
                <TouchableOpacity
                  onPress={(e) => {
                    handlePreview(e);
                  }}
                >
                  <Entypo size={20} color="#fff" name="dots-three-vertical" />
                </TouchableOpacity>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ImageBackground>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Card.Content style={styles.left}>
            <Card.Content style={{ paddingLeft: 0, paddingRight: 0 }}>
              <MaterialCommunityIcons style={styles.updateIcon} name="update" />
              <Paragraph style={styles.time}>
                {data.createdAt.toDate().toLocaleTimeString("en-US")} {"\n"}
                {data.createdAt.toDate().toLocaleDateString("en-US")}
              </Paragraph>
            </Card.Content>
            <Card.Content
              style={{ fontSize: 20, paddingLeft: 15, paddingTop: 10 }}
            >
              <Paragraph style={styles.center}>{data.providerName}</Paragraph>
              <Paragraph style={{ color: "#a9a9a9", maxWidth: 90 }}>
                {data.location}
              </Paragraph>
            </Card.Content>
          </Card.Content>
          <View style={styles.rightContent}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleApprove}
              style={{ marginTop: 10, height: 50 }}
            >
              <Text style={styles.right}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleClone}
              style={{ marginTop: 10, height: 50 }}
            >
              <Text style={styles.right}>Clone</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default connect("", { Approve, sendPushNotification, currentOption })(
  ListingItem
);
