import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 60,
  },
  horizontalContainer: {
    display: 'flex',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 0
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    width: '90%',
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    width: '60%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '25%',
  },
  inputForm: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '40%',
  },
  input1: {
    height: 40,
    marginTop: 10,
    marginEnd: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    width: '50%',
  },
  appButtonContainer: {
    elevation: 8,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 4,
    marginTop: 10,
    margin: 2,
    paddingHorizontal: 5
  },
  appButtonContainerSmall: {
    width: '50%'
  },

  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "capitalize"
  },
  lableText: {
    fontSize: 18,
    color: "#000",
    marginTop: 10,
    fontWeight: "bold",
    left: 0,
    textTransform: "capitalize"
  },
  dropdown1BtnStyle: {
    width: '30%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
});