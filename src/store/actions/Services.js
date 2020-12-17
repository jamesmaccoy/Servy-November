export const AddNewService = (
  service,
  attributes,
  userLocation,
  images
) => async (dispatch, getState, { getFirestore, getFirebase }) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let providerName;
  var user = await firebase.auth().currentUser;
  let serviceName = service.serviceName;
  let category = service.category;
  let location = service.location;
  let imageArray = [];
  // console.log("Imagess", images);
  dispatch({
    type: "SERVICE_LOADING",
    payload: true,
  });
  const res = await images.forEach(async (serviceImage, index) => {
    const ImageResponse = await fetch(serviceImage);
    const blob = await ImageResponse.blob();
    var ref = firebase.storage().ref().child(`images/${serviceImage}`);
    await ref.put(blob).then((response) => {
      response.ref
        .getDownloadURL()
        .then((url) => {
          imageArray.push(url);
        })
        .then(async () => {
          if (imageArray.length === images.length) {
            if (user) {
              dispatch({
                type: "SERVICE_LOADING",
                payload: true,
              });
              await db
                .collection("users")
                .get()
                .then((providerInfo) => {
                  providerInfo.docs.forEach((userData) => {
                    if (user.uid == userData.id) {
                      providerName = userData.data().Name;
                    }
                  });
                })
                .then(async () => {
                  function addService() {}
                  setTimeout(addService, 15000);
                })
                .then(async () => {
                  const res = db
                    .collection("services")
                    .add({
                      serviceName: serviceName,
                      category: category,
                      location: location,
                      maps: userLocation.locationCords,
                      userId: user.uid,
                      attributes: attributes,
                      approve: false,
                      providerName: providerName,
                      averageRating: 0,
                      totalReviews: 0,
                      imagesUrl: imageArray,
                      createdAt: new Date(),
                    })
                    .then(() => {
                      dispatch({
                        type: "ADD_SERVICE",
                        payload: true,
                      });
                      dispatch({
                        type: "SERVICE_LOADING",
                        payload: false,
                      });
                    })
                    .catch(() => {
                      dispatch({
                        type: "FAIL_SERVICE",
                        payload: true,
                      });
                      dispatch({
                        type: "SERVICE_LOADING",
                        payload: false,
                      });
                    });
                });
            } else {
              console.log("user is not signed in");
            }
          }
        });
    });
  });

  
};
export const getServices = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  dispatch({
    type: "SERVICE_LOADER",
    payload: true,
  });
  let services = [];

  const res = await db
    .collection("services")
    .where("approve", "==", true)
    .get()
    .then((response) => {
      response.docs.forEach((item, index) => {
        dispatch({
          type: "SERVICE_LOADER",
          payload: false,
        });
        services.push({ ...item.data(), id: item.id });
      });
      dispatch({
        type: "SERVICES",
        payload: services,
      });
      dispatch({
        type: "SERVICE_LOADER",
        payload: false,
      });
    });
};

export const addProviderServices = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  const state = getState();
  let currentUser = state.Auth.user;
};

export const addServiceReview = (state, id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  var user = await firebase.auth().currentUser;
  const reduxState = getState();
  let Name = reduxState.profile.profileInformation[0].Name;
  let photoURL = reduxState.profile.profileInformation[0].photoURL;
  let Reviews = [];

  const res = await db
    .collection("services")
    .doc(id)
    .collection("reviews")
    .add({
      serviceId: id,
      comment: state.comment,
      totalRating: state.service,
      userId: user.uid,
      Name: Name,
      photoURL: photoURL,
      createdAt: new Date(),
    })
    .then((e) => {
      db.collection("services")
        .doc(id)
        .get()
        .then((ratingDoc) => {
          db.collection("services")
            .doc(id)
            .collection("reviews")
            .get()
            .then((docRef) => {
              docRef.docs.map((data, index) => {
                var docRef = db.collection("services").doc(id);
                docRef.update({
                  averageRating:
                    (ratingDoc.data().averageRating += data.data().totalRating) /
                    (index + 1),
                  totalReviews: ratingDoc.data().totalReviews + 1,
                });
              });
            });
        });
    })
    .then(() => {
      db.collection("services")
        .doc(id)
        .collection("reviews")
        .orderBy("createdAt", "desc")
        .get()

        .then((docRef) => {
          docRef.docs.map((data) => {
            Reviews.push({
              ...data.data(),
              id: data.id,
            });
          });
        })
        .then(() => {
          dispatch({
            type: "GET_REVIEWS",
            payload: Reviews,
          });
        });
    });
};
export const getServiceReview = (id) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();

  let Reviews = [];
  dispatch({
    type: "LOADER",
    payload: false,
  });
  const res = await db
    .collection("services")
    .doc(id)
    .collection("reviews")
    .orderBy("createdAt", "desc")
    .get()
    .then((docRef) => {
      docRef.docs.map((data) => {
        Reviews.push({
          ...data.data(),
          id: data.id,
        });
      });
    })
    .then(() => {
      dispatch({
        type: "LOADER",
        payload: true,
      });
      dispatch({
        type: "GET_REVIEWS",
        payload: Reviews,
      });
    });
};

export const getServicesByCategory = (data) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  let services = [];
  dispatch({
    type: "SERVICE_LOADER",
    payload: true,
  });
  const res = await db
    .collection("services")
    .where("category", "==", data)
    .get()
    .then((response) => {
      response.docs.forEach((item, index) => {
        dispatch({
          type: "SERVICE_LOADER",
          payload: false,
        });
        if (item.data().approve === true) {
          services.push({ ...item.data(), id: item.id });
        }
      });
      console.log("Hereeee");
      dispatch({
        type: "SERVICES",
        payload: services,
      });
      dispatch({
        type: "SERVICE_LOADER",
        payload: false,
      });
    });
};
