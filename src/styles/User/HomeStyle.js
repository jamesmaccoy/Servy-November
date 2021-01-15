import { StyleSheet, Dimensions } from "react-native";
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  loading: {
    zIndex: 1,
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dummyContent: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  innerDummy: {
    marginLeft: 15,
    flex: 1,
    width: 260,
    backgroundColor: "#eee",
    height: 280,
  },
  innerDummy2: {
    marginLeft: 15,
    flex: 1,
    width: 260,
    backgroundColor: "#eee",
    height: 280,
  },
  screen: {
    backgroundColor: "#fff",
    paddingBottom: 110,
    paddingTop: 35,
  },
  header: { paddingLeft: 15, paddingRight: 15 },
  list: {
    paddingTop: 20,
    paddingBottom: 0,
  },
  screenitem: { paddingTop: 20, paddingLeft: 0 },
  screenitemcontainer: {},

  listoption: {
    alignItems: "center",
    flexDirection: "row",
    width: 140,
    height: 80,
    marginRight: 0,
    marginLeft: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },

  listimg: {
    width: 50,
    height: 50,
    color: "#fff",
  },
  listtxt: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 14,
    color: "#fff",
  },
  bannercont: {
    backgroundColor: "#ededed",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },

  bannerdetail: { flex: 1 },

  bannertitle: { color: "#62ad80", fontSize: 19, fontWeight: "bold" },

  bannerdescription: { color: "#999", fontSize: 16, marginBottom: 20 },
  bannerimg: { width: 90, height: 90 },

  loginScreenButton: {
    textAlign: "center",
    paddingTop: 8,
    padding: 10,
    paddingBottom: 8,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  bannerbuttontok: {
    borderColor: "#62ad80",
    borderWidth: 2,
    width: 200,
    textAlign: "center",
    borderColor: "#62ad80",
    borderWidth: 2,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  bannerbutton: {
    color: "#62ad80",
    marginLeft: 60,
  },
  categorieslisting: {
    marginTop: 20,
  },
  milesdata: {
    marginBottom: 18,
    marginTop: 6,
    paddingLeft: 10,
    paddingRight: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  milesdatain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: -4,
    justifyContent: "flex-end",
  },
  milesdatatxt: { fontSize: 16 },
  milesdatatxtmi: { fontSize: 16, marginTop: 10, marginLeft: 5 },
});