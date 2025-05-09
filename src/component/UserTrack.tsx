import React from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../style";
import {clearBreadcrumbs, HelpshiftLog, leaveBreadCrumb} from "helpshift-plugin-sdkx-react-native";
import SelectDropdown from "react-native-select-dropdown";

const UserTrack = () => {
  const [breadCrumb, setBreadCrumb] = React.useState("");
  const [logLevel, setLogLevel] = React.useState("Verbose");
  const [tag, setTag] = React.useState("");
  const [debugMsg, setDebugMsg] = React.useState("");
  const logLevels = ["Verbose", "Debug", "Info", "Warn", "Error"];

  const addLog = () => {
    if (logLevel === "Verbose") {
      HelpshiftLog.v(tag, debugMsg);
    } else if (logLevel === "Debug") {
      HelpshiftLog.d(tag, debugMsg);
    } else if (logLevel === "Info") {
      HelpshiftLog.i(tag, debugMsg);
    } else if (logLevel === "Warn") {
      HelpshiftLog.w(tag, debugMsg);
    } else if (logLevel === "Error") {
      HelpshiftLog.e(tag, debugMsg);
    }
    setDebugMsg("");
    setLogLevel("Verbose");
    setTag("");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.lableText}>BreadCrumb</Text>
      <View style={styles.horizontalContainer}>
        <TouchableOpacity style={styles.appButtonContainer} onPress={() => clearBreadcrumbs()}>
          <Text style={styles.appButtonText}>Clear Breadcrumbs</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setBreadCrumb}
          value={breadCrumb}
          placeholder="Enter leaveBreadCrumb"
        />
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => {
            leaveBreadCrumb(breadCrumb);
            setBreadCrumb("");
          }}>
          <Text style={styles.appButtonText}>Leave BreadCrumb</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.lableText}>Debug Logs</Text>
      <View style={styles.horizontalContainer}>
        <SelectDropdown
          data={logLevels}
          onSelect={(selectedItem) => {
            setLogLevel(selectedItem);
          }}
          defaultValue={logLevel}
          renderButton={(selectedItem) => {
            return (
              <View style={styles.dropdown1BtnStyle}>
                <Text>{selectedItem || "Select "}</Text>
              </View>
            );
          }}
          renderItem={(item) => {
            return (
              <View style={styles.dropdown1BtnStyle}>
                <Text>{item}</Text>
              </View>
            );
          }}
        />
        <TextInput style={styles.input} onChangeText={setTag} value={tag} placeholder="Tag" />
        <TextInput
          style={styles.input}
          onChangeText={setDebugMsg}
          value={debugMsg}
          placeholder="Log Message"
        />
      </View>
      <TouchableOpacity style={styles.appButtonContainer} onPress={() => addLog()}>
        <Text style={styles.appButtonText}>Add Debug Log</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserTrack;
