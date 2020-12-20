export const providerService = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let services = [];

  const res = await db
    .collection("services")
    .get()
    .then((response) => {
      response.docs.forEach((item, index) => {
        services.push({ ...item.data(), id: item.id });
      });

      dispatch({
        type: "SERVICES_LIST",
        payload: services,
      });
    });
};

export const getUsers = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  let users = [];

  const data = await db
    .collection("users")
    .get()
    .then((userInfo) => {
      userInfo.docs.forEach((userData) => {
        if (userData.data().type == "user") {
          users.push({ ...userData.data(), id: userData.id });
        }
      });
    })
    .then(() => {
      dispatch({
        type: "GET_USERS",
        payload: users,
      });
    });
};

export const Approve = (state, userId, documentId) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const db = getFirestore();
  const firebase = getFirebase();
  const data = await db.collection("services").doc(documentId);

  data.update({
    approve: state,
  });
};
