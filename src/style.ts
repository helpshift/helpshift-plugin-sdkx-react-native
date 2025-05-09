import {isIos} from "./util";
import {StyleSheet} from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start"
    // justifyContent: "center"
  },
  horizontalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 0,
    marginVertical: 8,
    alignItems: "center"
  },
  input: {
    height: 35,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1
  },
  appButtonContainer: {
    height: 35,
    elevation: 8,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#006021",
    borderRadius: 4,
    paddingVertical: 4,
    marginHorizontal: 10,
    paddingHorizontal: 15
  },
  secondaryButtonContainer: {
    height: 35,
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF0000",
    borderRadius: 4,
    paddingVertical: 4,
    marginHorizontal: 10,
    paddingHorizontal: 15
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "400",
    alignSelf: "center",
    textTransform: "capitalize"
  },
  secondaryButtonText: {
    fontSize: 14,
    color: "#FF0000",
    fontWeight: "400",
    alignSelf: "center"
  },
  lableText: {
    fontSize: 18,
    color: "#000",
    marginVertical: 8,
    marginHorizontal: 10,
    fontWeight: "bold",
    left: 0,
    textTransform: "capitalize"
  },
  configText: {
    fontSize: 12,
    color: "#000",
    margin: 12,
    left: 0,
    textTransform: "capitalize"
  },
  dropdown1BtnStyle: {
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#444",
    marginHorizontal: 5,
    fontSize: 14,
    margin: "auto"
  },
  flex: {
    flex: 1
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
    marginVertical: 10
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
    padding: 5
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000"
  },
  title: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  note: {
    fontSize: 10,
    fontWeight: "400",
    color: "#171717",
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  mt: {
    marginTop: 10
  },
  mb: {
    marginBottom: 10
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: isIos ? 30 : 20
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center"
  },
  modalTitle: {fontSize: 18, fontWeight: "bold", marginBottom: 10},
  eventItem: {marginBottom: 10, padding: 10, backgroundColor: "#f2f2f2", borderRadius: 5},
  eventName: {fontWeight: "bold"},
  eventData: {fontSize: 12, color: "gray"}
});
