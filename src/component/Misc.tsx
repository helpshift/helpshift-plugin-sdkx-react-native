import React from "react";
import {PermissionsAndroid, Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../style";
import {isAndroid} from "../util";
import Toast from "react-native-toast-message";
import {handleProactiveLink, sdkVersion} from "helpshift-plugin-sdkx-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from "@react-native-clipboard/clipboard";

const Misc = ({sdkConfig}: {sdkConfig: any}) => {
  const [proactiveUrl, setProactiveUrl] = React.useState("");

  const getNotificationPermission = async () => {
    try {
      const hasPermission = await PermissionsAndroid.check("android.permission.POST_NOTIFICATIONS");
      if (hasPermission) {
        Toast.show({
          type: "info",
          text1: "Permissioin Already Granted",
          autoHide: true,
          visibilityTime: 2000
        });
      } else {
        const androidVersion = parseInt(String(Platform.Version), 10);

        if (isNaN(androidVersion)) {
          return;
        }

        if (androidVersion > 32) {
          const granted = await PermissionsAndroid.request("android.permission.POST_NOTIFICATIONS");
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Toast.show({
              type: "info",
              text1: "Permission Granted",
              autoHide: true,
              visibilityTime: 2000
            });
          }
        } else {
          Toast.show({
            type: "info",
            text1: "Not Required",
            autoHide: true,
            visibilityTime: 2000
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPushToken = async () => {
    try {
      const oldToken = await AsyncStorage.getItem("FCMTOKEN");
      if (oldToken !== null && oldToken.trim() !== "") {
        console.log("Push Token : " + oldToken);
        Clipboard.setString(oldToken);
        Toast.show({
          type: "info",
          text1: "Token Copied",
          autoHide: true,
          visibilityTime: 2000
        });
      }
    } catch (error) {
      console.error("Error reading token from AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.lableText}>Misc</Text>
      {isAndroid && (
        <TouchableOpacity style={styles.appButtonContainer} onPress={getNotificationPermission}>
          <Text style={styles.appButtonText}>Get Notification Permission</Text>
        </TouchableOpacity>
      )}
      <>
        <View style={styles.horizontalContainer}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => {
              Toast.show({
                type: "success",
                text1: "Plugin Version is " + sdkVersion()
              });
            }}>
            <Text style={styles.appButtonText}>Get Plugin Version</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appButtonContainer} onPress={getPushToken}>
            <Text style={styles.appButtonText}>Get Push Token </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setProactiveUrl}
            value={proactiveUrl}
            placeholder="Handle Proactive"
          />
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => handleProactiveLink(proactiveUrl, sdkConfig)}>
            <Text style={styles.appButtonText}>Handle Proactive </Text>
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
};

export default Misc;
