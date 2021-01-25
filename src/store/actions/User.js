export const userStatus = (state) => async (dispatch) => {
  dispatch({
    type: "USER_STATUS",
    payload: state,
  });
};
export const profileInformation = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  const state = getState();
  let userInformation = [];

  if (user) {
    const data = await db
      .collection("users")
      .get()
      .then((providerInfo) => {
        providerInfo.docs.forEach((userData) => {
          if (user.uid == userData.id) {
            userInformation.push({ ...userData.data(), id: userData.id });
          }
        });
      })
      .then(() => {
        dispatch({
          type: "PROFILE_INFO",
          payload: userInformation,
        });
      });
  } else {
    console.log("user is not signed in");
  }
};

export const updateInformation = (information) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  let Email = information.Email;
  let about = information.about;
  let firstName = information.firstName;
  let lastName = information.lastName;
  let PhoneNumber = information.PhoneNumber;
  let websiteUrl = information.websiteUrl;
  let instagramUrl = information.instagramUrl;
  let facebookUrl = information.facebookUrl;
  let userType = information.userType;
  let userId = information.userId;

  if (user) {
    const accountRef = await db.collection("users").doc(user.uid);
    accountRef
      .update({
        Email: Email,
        about: about,
        firstName: firstName,
        lastName: lastName,
        PhoneNumber: PhoneNumber,
        websiteUrl: websiteUrl,
        instagramUrl: instagramUrl,
        facebookUrl: facebookUrl,
        userType: userType,
      })
      .then(() => {
        console.log("sucessss");
        dispatch({
          type: "ACCOUNT_ADDED_INFO",
          payload: true,
        });
      });
  } else {
    console.log("user not signed in");
  }
};

export const serviceProviderInformation = (id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();

  let userInformation = [];

  const data = await db
    .collection("users")
    .get()
    .then((providerInfo) => {
      providerInfo.docs.forEach((userData) => {
        if (id == userData.id) {
          userInformation.push({ ...userData.data(), id: userData.id });
        }
      });
    })
    .then(() => {
      dispatch({
        type: "SERVICE_PROVIDER_INFO",
        payload: userInformation,
      });
    });
};
