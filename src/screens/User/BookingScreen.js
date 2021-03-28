import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../styles/User/BookingScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import Maps from "../../components/Generic/Maps";
import Calender from "../../components/User/Calender";
const { width } = Dimensions.get("window");
import {
  Entypo,
  MaterialCommunityIcons,
  Foundation,
  Ionicons,
} from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

const BookingScreen = ({ serviceData }) => {
  const [callCalender, setCallCalender] = useState(true);
  const navigation = useNavigation();
  const navHandler = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.viewover}>
        <SafeAreaView style={styles.HeaderContainer}>
          <View style={styles.headerCategory}>
            <MaterialCommunityIcons
              style={styles.brief}
              onPress={navHandler}
              name="arrow-left"
            />

            <Text style={styles.title}>{serviceData.category}</Text>
          </View>

          <Entypo name="share" size={30} color={"#fff"} />
        </SafeAreaView>
        <View style={styles.borderbot}>
          <View style={styles.statusvi}>
            <Text style={{ color: "#fff" }}>Status</Text>
          </View>
          <View style={styles.viewposr}>
            <Text style={styles.taskco}>Complete</Text>
            <View style={styles.bluedot}></View>
          </View>
        </View>
        <Text style={styles.categoryTitle}>
          Global status of task. Both parties{" "}
        </Text>
      </View>
      <Image
        source={require("../../../assets/images/plumber.webp")}
        style={{ height: 500 }}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.bookingtitle}>Booking Details</Text>
        <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkheading}>Booking Date:</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.blacktxt}>June 12 2020</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkheading}>Time Slot:</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkdescdate}>1:00 pm - 6:00 pm</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkheading}>Client:</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkdesc}>
                jimmy MaclacHlan thankyou.digital@gmail.com +27796125991
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkheading}>Sburb:</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkdesc}>Pinelands</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkheading}>Address:</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkdesc}>
                82 Hargrave road, Llandundo 7806 ZA
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkheading}>Booking Request On:</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: "stretch" }}>
            <View>
              <Text style={styles.bkdesc}>June 11 2020 at 2:37 pm</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.fawbtn}>
          <Text style={styles.iconinbtn}>
            <Ionicons name="ios-hand" color={"#61ad7f"} size={35} />
          </Text>
          <Text style={styles.textinbtn}>Frequently Asked Question</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fawbtn}>
          <Text style={styles.iconinbtn}>
            <Foundation name="telephone" color={"#61ad7f"} size={35} />
          </Text>
          <Text style={styles.textinbtn}>Talk</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.services}>Location</Text>
          <Maps
            userLocation={serviceData.maps}
            companyName={serviceData.serviceName}
            locationName={serviceData.location}
          />
        </View>
        <View>
          <View style={styles.titlereviewbtn}>
            <TouchableOpacity
              style={{ paddingBottom: 70, position: "relative", width: "100%" }}
            >
              <View style={styles.buttonaddr}>
                <Entypo name={"edit"} size={26} color={"#fff"} />
                <Text
                  style={{
                    fontSize: 18,
                    paddingLeft: 5,
                    color: "#ffffff",
                    textTransform: "uppercase",
                  }}
                >
                  Edit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <Calendar
              setCallCalender={setCallCalender}
              callCalender={callCalender}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = (state) => {
  return {
    serviceData: state.Service.serviceDataByKey,
  };
};
export default connect(mapStateToProps)(BookingScreen);
