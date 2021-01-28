import React from "react";
import { Share, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "../../styles/User/ListDestailStyle";
const ShareLink = ({url}) => {
  
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
          urls: url
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View>
      <Entypo onPress={onShare} style={styles.close} name="share" />
    </View>
  );
};

export default ShareLink;
