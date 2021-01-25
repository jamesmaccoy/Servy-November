import React from "react";
import { StyleSheet, Image, Text } from "react-native";
import {
  Container,
  Content,
  Button,
} from "native-base";
import icon from "../../../assets/icon.png";
import { connect } from "react-redux";
import { Logout } from "../../store/actions/Auth";
const Conformaion = ({ Logout }) => {
  const handleSignout = () => {
    Logout();
  };
  return (
    <Container style={styles.wrapper}>
      <Content style={styles.container}>
        <Image style={styles.imtxc} source={icon} />
        <Text style={styles.header}>Congrates!</Text>
        <Text style={styles.loginsizetxt}>Welcome</Text>
        <Button onPress={handleSignout} full success style={styles.buttons}>
          <Text style={styles.buttonstxt}>Signout</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default connect("", { Logout })(Conformaion);
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 30,
  },
  imtxc: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    width: 90,
    height: 90,
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#60ac7f",
  },
  loginsizetxt: {
    paddingTop: 50,
    fontSize: 22,
    textAlign: "center",
    color: "#000",
  },
  buttons: { color: "#fff", marginTop: 250 },
  inputtexts: { paddingBottom: 10 },
  textinfob: { color: "#666", marginTop: 50, textAlign: "center" },
  signuplink: { textAlign: "center", color: "#60ad7f" },
  buttonstxt: { color: "#fff" },
});
