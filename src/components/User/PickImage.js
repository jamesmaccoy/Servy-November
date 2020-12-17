import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../styles/User/AddServiceStyle";
const getImage = ({ images }) => {
  const [imageState, setImageState] = useState(false);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 5],
      multiple: true,
    });
    if (!result.cancelled) {
      setImageState(false);
      images.push(result.uri);
      setImageState(true);
    }
  };

  return (
    <>
      <View style={{ justifyContent: "center", flexDirection: "row" }}>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <TouchableOpacity style={styles.image} onPress={pickImage}>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                color: "#a9a9a9",
                paddingTop: 10,
              }}
            >
              Select Image
            </Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
      <View style={{ paddingTop: 20, flexDirection: "row", flexWrap: "wrap" }}>
        {imageState &&
          images.map((url, index) => (
            <Image
              key={index}
              source={{ uri: url }}
              style={{ width: 100, height: 100 }}
            />
          ))}
      </View>
    </>
  );
};

export default getImage;
