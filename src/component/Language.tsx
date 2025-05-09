import React from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import styles from "../style";
import {setLanguage} from "helpshift-plugin-sdkx-react-native";

const Language = () => {
  const langCodes = ["en", "fr", "nl", "de"];
  const [langCode, setLangCode] = React.useState("en");

  return (
    <View style={styles.card}>
      <Text style={styles.lableText}>Language</Text>
      <View style={styles.horizontalContainer}>
        <SelectDropdown
          data={langCodes}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setLangCode(selectedItem);
          }}
          renderButton={(selectedItem) => {
            return (
              <View style={styles.dropdown1BtnStyle}>
                <Text>{(selectedItem && selectedItem.title) || "Select Language"}</Text>
              </View>
            );
          }}
          renderItem={(item, isSelected) => {
            return (
              <View style={styles.dropdown1BtnStyle}>
                <Text>{item}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity style={styles.appButtonContainer} onPress={() => setLanguage(langCode)}>
          <Text style={styles.appButtonText}>Set Language</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Language;
