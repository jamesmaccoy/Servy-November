import * as Google from "expo-google-app-auth";
export const onSignUp = (user) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let name = user.Name;
  let email = user.Email;
  let password = user.password1;
  let phoneNumber = user.phoneNumber;

  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      if (res.additionalUserInfo.isNewUser) {
        dispatch({
          type: "SIGNIN_SUCCESS",
          payload: false,
        });
        db.collection("users").doc(res.user.uid).set({
          Name: name,
          Email: email,
          PhoneNumber: phoneNumber,
          photoURL: "",
          approve: false,
          type: "user",
          about: "",
          firstName: "",
          lastName: "",
          userType: "",
          websiteUrl: "",
          facebookUrl: "",
          instagramUrl: "",

          cretedAt: Date.now(),
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: "SIGNUP_SUCCESS",
        payload: false,
      });
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
      } else {
      }
    });
};
export const signInWithEmail = (email, password) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();

  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {})
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        console.log("weak password");
      } else {
        console.log("there is error");
      }
    });
};

export const verifyUser = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  dispatch({
    type: "LOADING",
    payload: true,
  });
  await firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      dispatch({
        type: "SIGNIN_SUCCESS",
        payload: true,
      });
      dispatch({
        type: "CURRENT_USER",
        payload: user.uid,
      });
      dispatch({
        type: "LOADING",
        payload: false,
      });
    } else {
      dispatch({
        type: "SIGNIN_SUCCESS",
        payload: false,
      });
      dispatch({
        type: "LOADING",
        payload: false,
      });
    }
  });
};
export const Logout = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  await firebase
    .auth()
    .signOut()
    .then(function () {
      dispatch({
        type: "SIGNIN_SUCCESS",
        payload: false,
      });
    })
    .catch(function (error) {
      console.log("signout error", error);
    });
};

export const signInWithGoogle = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  dispatch({
    type: "LOADING",
    payload: true,
  });

  try {
    const isUserEqual = (googleUser, firebaseUser) => {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
          if (
            providerData[i].providerId ===
              firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()
          ) {
            // We don't need to reauth the Firebase connection.
            return true;
          }
        }
      }
      return false;
    };

    const onSignIn = (googleUser) => {
      var unsubscribe = firebase
        .auth()
        .onAuthStateChanged(function (firebaseUser) {
          unsubscribe();
          if (!isUserEqual(googleUser, firebaseUser)) {
            var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
            );

            firebase
              .auth()
              .signInWithCredential(credential)
              .then((res) => {
                if (res.additionalUserInfo.isNewUser) {
                  db.collection("users").doc(res.user.uid).set({
                    Name: res.user.displayName,
                    photoURL: res.user.photoURL,
                    PhoneNumber: res.user.phoneNumber,
                    Email: res.user.email,
                    type: "user",
                    firstName: "",
                    lastName: "",
                    about: "",
                    userType: "",
                    websiteUrl: "",
                    facebookUrl: "",
                    instagramUrl: "",
                  });
                }
              })
              .catch(function (error) {
                console.log(error, "errrrr");
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
              });
          } else {
            console.log("User already signed-in Firebase.");
          }
        });
    };
    const result = await Google.logInAsync({
      androidClientId:
        "256539792953-u00leiuuf4odj68p6ephgfneq2r1p7uo.apps.googleusercontent.com",
      status: true,
      xfbml: true,
      scopes: ["profile", "email"],
    });
    if (result.type === "success") {
      onSignIn(result);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch ({ message }) {
    alert("login: Error:" + message);
  }
};

export const Authorization = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  const state = getState();
  let currentUser = state.Auth.user;
  let data;
  dispatch({
    type: "AUTH_CHECK",
    payload: true,
  });

  const res = await db
    .collection("users")
    .doc(currentUser)
    .onSnapshot(function (response) {
      console.log("response data", response.data());
      if (response.data().type) {
        dispatch({
          type: "ADMIN",
          payload: response.data().type,
        });
        dispatch({
          type: "AUTH_CHECK",
          payload: false,
        });
      }
    });
};
