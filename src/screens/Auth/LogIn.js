import React, { useState } from "react";
import { StyleSheet, Image, Text } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  View,
  TouchableOpacity,
} from "native-base";
import icon from "../../../assets/icon.png";
import { connect } from "react-redux";
import { signInWithEmail } from "../../store/actions/Auth";
import { signInWithGoogle } from "../../store/actions/Auth";
import googleIcon from "../../../assets/images/google.jpg";
import facebookIcon from "../../../assets/images/facebook.png";
import { FontAwesome } from "@expo/vector-icons";

const Login = ({ signInWithEmail, navigation, signInWithGoogle }) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event) => {
    event && event.preventDefault && event.preventDefault();

    signInWithEmail(userEmail, password);
    // setShouldShow(true);
  };
  const handleSignInWithGoogle = (event) => {
    event && event.preventDefault && event.preventDefault();
    signInWithGoogle();
  };
  const handleNavigation = () => {
    navigation.navigate("signup");
  };

  return (
    <Container style={styles.wrapper}>
      <Content style={styles.container}>
        <FontAwesome
          name="envelope"
          size={50}
          color={"#000"}
          style={styles.topenvicon}
        />

        <Text style={styles.loginsizetxt}>
          Sign in with your {"\n"} email address
        </Text>
        {shouldShow ? (
          <View style={styles.ifdontha}>
            <Text style={styles.cnatxt}>
              Sorry, we can't find an account with this email address. Please
              try again or
              <Text
                onPress={handleNavigation}
                style={{ color: "#fff", textDecorationLine: "underline" }}
              >
                {" "}
                create a new account
              </Text>
            </Text>
          </View>
        ) : null}

        <Form vstyle={styles.form}>
          <Item floatingLabel last style={styles.inputtexts}>
            <Label style={styles.label}>Email Address</Label>
            <Input onChangeText={(text) => setEmail(text)} />
          </Item>
          <Item floatingLabel last style={styles.inputtexts}>
            <Label style={styles.label}>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </Item>

          <Button onPress={handleSignIn} full success style={styles.buttons}>
            <Text style={styles.buttonstxt}>Login</Text>
          </Button>
        </Form>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Text style={styles.textinfob}>Forgot your password? </Text>
            <Text onPress={handleNavigation} style={styles.signuplink}>
              {" "}
              Reset Password{" "}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={styles.textinfob}>Dont't have an account? </Text>
            <Text onPress={handleNavigation} style={styles.signuplink}>
              {" "}
              Sign Up{" "}
            </Text>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default connect("", {
  signInWithEmail,
  signInWithGoogle,
  signInWithEmail,
})(Login);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 15,
  },
  topenvicon: { alignSelf: "center", marginBottom: 20 },

  ifdontha: {
    backgroundColor: "#5dae7e",
    paddingTop: 15,
    borderRadius: 5,
    paddingBottom: 15,
    paddingRight: 5,
    paddingLeft: 5,
    marginTop: 25,
  },
  cnatxt: { color: "#fff", textAlign: "center", fontSize: 15, lineHeight: 25 },
  imtxc: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    width: 90,
    height: 90,
  },
  loginsizetxt: {
    fontSize: 26,
    lineHeight: 40,
    textAlign: "center",
  },
  usernamedetail: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  usernamedetailn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  otcontain: {
    padding: 10,
    marginTop: 20,
  },
  scriconsscroll: {
    display: "flex",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    overflow: "scroll",
  },
  form: {
    marginTop: 10,
  },
  googleBtn: {
    backgroundColor: "#4081ec",
    marginTop: 20,
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
  facebookBtn: {
    backgroundColor: "#3a5592",
    marginTop: 20,
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
  buttons: {
    backgroundColor: "#5dae7e",
    marginTop: 40,
    position: "relative",
    paddingLeft: 0,
    borderRadius: 5,
    height: 70,
  },
  inputtexts: {
    paddingBottom: 10,
    borderRadius: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "#cfcfcf",
  },
  label: { fontSize: 18, marginTop: 0 },
  textinfob: { color: "#666", textAlign: "center", fontSize: 16 },
  signuplink: { textAlign: "center", color: "#60ad7f", fontSize: 16 },
  buttonstxt: { color: "#fff", textAlign: "center", fontSize: 18 },
  socialBtnText: { paddingLeft: 50, color: "#fff" },
});
