import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { Foundation } from "@expo/vector-icons";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;
const PleaseWait = ({ addServiceLoading, success, navigation }) => {
  const handleNavigation = () => {
    navigation.navigate("ServicesHome", {
      id: 121,
      messageAlert: true,
    });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={addServiceLoading || success}
    >
      {addServiceLoading && (
        <View style={styles.inputContainer}>
          <View style={styles.container}>
            

            <ActivityIndicator color="#5dae7e" />
          </View>
        </View>
      )}
      {success && (
        <TouchableOpacity onPress={handleNavigation}>
        <View style={styles.inputContainer}>
          
          <View style={styles.container}>

           
              <Button style={{ backgroundColor: "#5dae7e",paddingBottom:15,paddingTop:15}}>
             <Foundation name="info" size={16}  color="#fff"/> 
                <Text style={{ color: "#fff",textTransform:'none',marginLeft:5 }}> This listing was saved successfully </Text>
              </Button>
           

            {/*<View>
              <Text style={styles.sucess}>Data Added Sucessfully </Text>
              <Text style={styles.sucess}>Press ok to continue</Text>
            </View>
            <TouchableOpacity onPress={handleNavigation}>
              <Button style={{ backgroundColor: "#5dae7e" }}>
                <Text style={{ color: "#000" }}>ok</Text>
              </Button>
            </TouchableOpacity>
          */}
          </View>

        </View>
        </TouchableOpacity>
      )}
    </Modal>
  );
};
export default PleaseWait;

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: deviceHeight,
    backgroundColor: "rgba(0,0,0,.5)",
  },
  container: {
   
    elevation: 50,
    width: deviceWidth - 50,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  name: {
    color: "#000",
    fontSize: 15,
    paddingBottom: 5,
  },
  sucess: {
    color: "#000",
    fontSize: 17,
    paddingBottom: 5,
  },

});
