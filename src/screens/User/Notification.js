import React from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { connect } from "react-redux";
import { handleRemoveNotification } from "../../store/actions/User";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
let deviceHeight = Dimensions.get("window").height;
const Notification = ({ notifications, handleRemoveNotification }) => {
  const onRemoveNotification = (id) => {
    handleRemoveNotification(id);
  };
  return (
    <View style={styles.screen}>
      {notifications.length === 0 ? (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 40,
          }}
        >
          <Text style={{ color: "#a9a9a9", fontSize: 15 }}>
            No New Notification
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ minHeight: deviceHeight }}
          data={notifications}
          renderItem={({ item }) => (
            <View style={styles.notification}>
              <Text style={{ textAlign: "right", color: "#90a7b7" }}>
                {timeago(item.cretedAt)}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  style={styles.updateIcon}
                  name="update"
                />
                <Text style={{ marginLeft: 5 }}>{item.message}</Text>
              </View>
              <TouchableOpacity onPress={() => onRemoveNotification(item.id)}>
                <Text style={styles.dismiss}>Dimiss</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    notifications: state.User.notifications,
  };
};
export default connect(mapStateToProps, { handleRemoveNotification })(
  Notification
);

function timeago(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 2)
    return Math.round(seconds / (60 * 60 * 24 * 365.25)) + " years ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 1)
    return "1 year ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 2)
    return Math.round(seconds / (60 * 60 * 24 * 30.4)) + " months ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 1)
    return "1 month ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 2)
    return Math.round(seconds / (60 * 60 * 24 * 7)) + " weeks ago";
  else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 1) return "1 week ago";
  else if (Math.round(seconds / (60 * 60 * 24)) >= 2)
    return Math.round(seconds / (60 * 60 * 24)) + " days ago";
  else if (Math.round(seconds / (60 * 60 * 24)) >= 1) return "1 day ago";
  else if (Math.round(seconds / (60 * 60)) >= 2)
    return Math.round(seconds / (60 * 60)) + " hours ago";
  else if (Math.round(seconds / (60 * 60)) >= 1) return "1 hour ago";
  else if (Math.round(seconds / 60) >= 2)
    return Math.round(seconds / 60) + " minutes ago";
  else if (Math.round(seconds / 60) >= 1) return "1 minute ago";
  else if (seconds >= 2) return seconds + " seconds ago";
  else return seconds + "1 second ago";
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7f7f7",
    padding: 5,
    height: 670,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 80,
  },
  notification: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 2,
    padding: 20,
    elevation: 2,
    marginRight: 5,
    marginLeft: 5,
  },
  updateIcon: {
    fontSize: 25,
    backgroundColor: "#e84b19",
    width: 25,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
  dismiss: {
    textAlign: "right",
    marginTop: 10,
    fontSize: 16,
    color: "#90a7b7",
    marginRight: 10
  },
});
