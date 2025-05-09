import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../style";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  requestUnreadMessageCount,
  showConversation,
  pauseDisplayOfInAppNotification
} from "helpshift-plugin-sdkx-react-native";
import {isIos} from "../util";

const Conversation = ({sdkConfig}: {sdkConfig: any}) => {
  const [remoteUnreadCountFlag, setRemoteUnreadCountFlag] = React.useState(true);
  const [shouldPauseInAppNotification, setShouldPauseInAppNotification] = React.useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.lableText}>Conversation</Text>
      <TouchableOpacity
        style={styles.appButtonContainer}
        onPress={() => {
          showConversation(sdkConfig);
        }}>
        <Text style={styles.appButtonText}>Open Chat</Text>
      </TouchableOpacity>
      <View style={styles.horizontalContainer}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => requestUnreadMessageCount(remoteUnreadCountFlag)}>
          <Text style={styles.appButtonText}>Unread Message Count</Text>
        </TouchableOpacity>
        <BouncyCheckbox
          size={22}
          fillColor="green"
          unFillColor="#FFFFFF"
          text="From Remote"
          textStyle={{textDecorationLine: "none"}}
          innerIconStyle={{borderWidth: 2}}
          isChecked={remoteUnreadCountFlag}
          onPress={(isChecked: boolean) => {
            setRemoteUnreadCountFlag(isChecked);
          }}
        />
      </View>
      <View style={styles.horizontalContainer}>
        {isIos && (
          <View style={styles.horizontalContainer}>
            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={() => pauseDisplayOfInAppNotification(shouldPauseInAppNotification)}>
              <Text style={styles.appButtonText}>Pause In-App </Text>
            </TouchableOpacity>
            <BouncyCheckbox
              size={22}
              fillColor="green"
              unFillColor="#FFFFFF"
              text="Should pause "
              textStyle={{textDecorationLine: "none"}}
              innerIconStyle={{borderWidth: 2}}
              isChecked={shouldPauseInAppNotification}
              onPress={(isChecked: boolean) => {
                setShouldPauseInAppNotification(isChecked);
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Conversation;
