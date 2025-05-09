import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../style";
import {updateAppAttributes} from "helpshift-plugin-sdkx-react-native";
import {Attributes} from "../Types";

const AppAttributes = () => {
  const [attributeKey, setAttributeKey] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [cufKey, setCufKey] = useState("");
  const [cufValue, setCufValue] = useState("");
  const [attributes, setAttributes] = useState<Attributes>({});

  const addCufs = () => {
    setAttributes((prevState) => ({
      ...prevState,
      custom_user_fields: {
        ...(prevState?.custom_user_fields ?? {}),
        [cufKey]: cufValue
      }
    }));
    setCufKey("");
    setCufValue("");
  };

  const addAttributes = () => {
    setAttributes((prevState) => ({
      ...prevState,
      [attributeKey]: attributeValue
    }));
    setAttributeKey("");
    setAttributeValue("");
  };

  const updateAttributes = () => {
    updateAppAttributes({...attributes});
  };
  const resetAttributes = () => {
    setAttributes({});
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>APP ATTRIBUTES</Text>
      <View style={styles.horizontalContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setAttributeKey}
          value={attributeKey}
          placeholder="Identifier Key"
        />
        <TextInput
          style={styles.input}
          onChangeText={setAttributeValue}
          placeholder="Identifier value"
          value={attributeValue}
        />
        <TouchableOpacity style={styles.appButtonContainer} onPress={() => addAttributes()}>
          <Text style={styles.appButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.note}>CUF</Text>
      <View style={styles.horizontalContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setCufKey}
          value={cufKey}
          placeholder="Identifier Key"
        />
        <TextInput
          style={styles.input}
          onChangeText={setCufValue}
          placeholder="Identifier value"
          value={cufValue}
        />
        <TouchableOpacity style={styles.appButtonContainer} onPress={() => addCufs()}>
          <Text style={styles.appButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.appButtonContainer, styles.mt]}
        onPress={() => updateAttributes()}>
        <Text style={styles.appButtonText}>Update App Attributes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.secondaryButtonContainer, styles.mt]}
        onPress={() => resetAttributes()}>
        <Text style={styles.secondaryButtonText}>Reset App Attributes</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <Text style={styles.title}>App Attributes Preview</Text>
      <Text style={styles.note}>{JSON.stringify(attributes)}</Text>
    </View>
  );
};

export default AppAttributes;
