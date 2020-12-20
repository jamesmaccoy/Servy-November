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
} from "native-base";
import icon from "../../../assets/icon.png";
import { connect } from "react-redux";
import { signInWithEmail } from "../../store/actions/Auth";
import { signInWithGoogle } from "../../store/actions/Auth";
import googleIcon from "../../../assets/images/google.jpg";

const Login = ({ signInWithEmail, navigation, signInWithGoogle }) => {
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event) => {
    event && event.preventDefault && event.preventDefault();
    signInWithEmail(userEmail, password);
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
        <Image source={icon} style={styles.imtxc} />

        <Text style={styles.loginsizetxt}>Enter your email and Password</Text>
        <Form vstyle={styles.form}>
          <Item floatingLabel last style={styles.inputtexts}>
            <Label>Email Address</Label>
            <Input onChangeText={(text) => setEmail(text)} />
          </Item>
          <Item floatingLabel last style={styles.inputtexts}>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </Item>

          <Button onPress={handleSignIn} full success style={styles.buttons}>
            <Text style={styles.buttonstxt}>Login</Text>
          </Button>
          <Button
            onPress={handleSignInWithGoogle}
            full
            style={styles.googleBtn}
          >
            <Image style={styles.socialIcon} source={googleIcon} />
            <Text style={styles.socialBtnText}>SignIn with Google</Text>
          </Button>
        </Form>
        <View>
          <Text style={styles.textinfob}>Dont't have an account? </Text>
          <Text onPress={handleNavigation} style={styles.signuplink}>
            Sign Up
          </Text>
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
  loginsizetxt: {
    fontSize: 18,
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
  buttons: { color: "#fff", marginTop: 20 },
  inputtexts: { paddingBottom: 10 },
  textinfob: { color: "#666", marginTop: 50, textAlign: "center" },
  signuplink: { textAlign: "center", color: "#60ad7f" },
  buttonstxt: { color: "#fff" },
  socialBtnText: { paddingLeft: 50, color: "#fff" },
  socialIcon: {
    width: 30,
    height: 30,
  },
});
