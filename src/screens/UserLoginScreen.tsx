import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../style";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {clearAnonymousUser, login, logout} from "helpshift-plugin-sdkx-react-native";
import Toast from "react-native-toast-message";
import AppContainer from "../AppContainer";
import CustomInput from "../component/CustomInput";
import {commonCheckboxProps} from "../util";

const UserLoginScreen = () => {
  const [shouldClear, setShouldClear] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userSecret, setUserSecret] = React.useState("");
  const [userAuthentication, setUserAuthentication] = React.useState(true);

  const loginUser = () => {
    const userdata = {
      userId,
      userEmail,
      userName
    };

    if (userAuthentication) {
      const updatedUserData = {
        ...userdata,
        userAuthToken: userSecret
      };

      login(updatedUserData, (isLoggedIn: boolean) => {
        Toast.show({
          type: "info",
          text1: "isLoggedIn : " + isLoggedIn
        });
      });
    } else {
      login(userdata, (isLoggedIn: boolean) => {
        Toast.show({
          type: "info",
          text1: "isLoggedIn : " + isLoggedIn
        });
      });
    }
  };

  return (
    <View style={styles.flex}>
      <AppContainer>
        <View style={styles.card}>
          <View style={styles.horizontalContainer}>
            <CustomInput value={userId} onChangeText={setUserId} placeholder="Enter User ID" />
            <CustomInput
              value={userName}
              onChangeText={setUserName}
              placeholder="Enter User Name"
            />
          </View>
          <View style={styles.horizontalContainer}>
            <CustomInput
              value={userEmail}
              onChangeText={setUserEmail}
              placeholder="Enter User Email ID"
              style={{minWidth: 200}}
            />
            <BouncyCheckbox
              {...commonCheckboxProps}
              text="Enable Auth Token"
              isChecked={userAuthentication}
              onPress={(isChecked: boolean) => {
                setUserAuthentication(isChecked);
              }}
            />
          </View>
          <View style={styles.horizontalContainer}>
            <CustomInput
              value={userSecret}
              onChangeText={setUserSecret}
              placeholder="Add your secret key from Dashboard"
            />
          </View>
          <View style={styles.horizontalContainer}>
            <TouchableOpacity style={styles.appButtonContainer} onPress={loginUser}>
              <Text style={styles.appButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.appButtonContainer} onPress={() => logout()}>
              <Text style={styles.appButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalContainer}>
            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={() => clearAnonymousUser(shouldClear)}>
              <Text style={styles.appButtonText}>Clear Anon User</Text>
            </TouchableOpacity>
            <BouncyCheckbox
              {...commonCheckboxProps}
              isChecked={shouldClear}
              text="Clear Anon"
              onPress={(isChecked: boolean) => {
                setShouldClear(isChecked);
              }}
            />
          </View>
        </View>
      </AppContainer>
    </View>
  );
};

export default UserLoginScreen;
