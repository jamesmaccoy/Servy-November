import React, { useState } from "react";
import { Avatar, Button, Card, Paragraph } from "react-native-paper";
import {
  View,
  Text,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../styles/Admin/listingItemStyle";
import { Approve } from "../../store/actions/Admin";
import { connect } from "react-redux";
const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const ListingItem = ({ data, Approve }) => {
  const [approveFalg, setApproveFlag] = useState(false);
  const [cloneFalg, setCloneFlag] = useState(false);
  const handleClone = () => {
    Approve(false, data.userId);
    setCloneFlag(!cloneFalg);
    const timer = setTimeout(() => {
      setCloneFlag(false);
    }, 100);
  };
  const handleApprove = () => {
    Approve(true, data.userId, data.id);
    setApproveFlag(!approveFalg);
    const timer = setTimeout(() => {
      setApproveFlag(false);
    }, 100);
  };

  return (
    <View style={{ paddingBottom: 20 }}>
      <Card style={{ height: 280 }}>
        <ImageBackground style={{ flex: 1 }} source={{ uri: data.imagesUrl[0] }}>
          <Text style={{ padding: 20, color: "#fff", fontSize: 18 }}>
            {data.serviceName}
          </Text>
        </ImageBackground>
        <View style={{flexDirection: "row" , justifyContent: "space-between"}}>
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
              <Paragraph style={{ color: "#a9a9a9" }}>
                {data.location}
              </Paragraph>
            </Card.Content>
          </Card.Content>
          <Card.Content style={styles.rightContent}>
            <Button
              onPress={handleApprove}
              style={{ marginTop: 10 , height: 50}}
              mode={approveFalg && "contained"}
              color="#eee"
            >
              <Text style={styles.right}>Approve</Text>
            </Button>
            <Button
              onPress={handleClone}
              style={{  marginTop: 10 , height: 50 }}
              mode={cloneFalg && "contained"}
              color="#eee"
              compact={true}
            >
              <Text style={styles.right}>Clone</Text>
            </Button>
          </Card.Content>
        </View>
      </Card>
    </View>
  );
};

export default connect("", { Approve })(ListingItem);
