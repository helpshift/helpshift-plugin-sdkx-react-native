import React from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../style";
import {
  showFAQSectionWithConfig,
  showFAQsWithConfig,
  showSingleFaqWithConfig
} from "helpshift-plugin-sdkx-react-native";

const Helpcenter = ({sdkConfig}: {sdkConfig: any}) => {
  const [faqSectionId, setFaqSectionId] = React.useState("");
  const [faqQuestionId, setFaqQuestionId] = React.useState("");

  return (
    <View style={styles.card}>
      <Text style={styles.lableText}>Help Center</Text>
      <TouchableOpacity
        style={styles.appButtonContainer}
        onPress={() => showFAQsWithConfig(sdkConfig)}>
        <Text style={styles.appButtonText}>Show FAQs</Text>
      </TouchableOpacity>
      <View style={styles.horizontalContainer}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => showSingleFaqWithConfig(faqQuestionId, sdkConfig)}>
          <Text style={styles.appButtonText}>Show FAQ Question</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={setFaqQuestionId}
          value={faqQuestionId}
          placeholder="Faq Question Id"
        />
      </View>
      <View style={styles.horizontalContainer}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => showFAQSectionWithConfig(faqSectionId, sdkConfig)}>
          <Text style={styles.appButtonText}>Show FAQ Section</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={setFaqSectionId}
          value={faqSectionId}
          placeholder="Faq Section Id"
        />
      </View>
    </View>
  );
};

export default Helpcenter;
