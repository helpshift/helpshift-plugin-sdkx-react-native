import React, {useState} from "react";
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../style";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-toast-message";
import {cifTypes, commonCheckboxProps, contactUsValues, DEFAULT_CONFIG} from "../util";
import {useAppContext} from "../data/AppContext";
import SelectDropdown from "react-native-select-dropdown";

const ConfigScreen = () => {
  const [showConfig, setShowConfig] = useState(true);
  const [configKey, setConfigKey] = useState("");
  const [cifKey, setCifKey] = useState("");
  const [cifValue, setCifValue] = useState("");
  const [cifType, setCifType] = useState("singleline");
  const [configValue, setConfigValue] = useState("");
  const {sdkConfig, setSDKConfig} = useAppContext();
  const [refresh, setRefresh] = useState(0);

  const setTags = (tagsToAdd: string) => {
    setSDKConfig((existingValues) => ({
      ...existingValues,
      tags: tagsToAdd.split(",")
    }));
  };

  const setPrefillText = (text: string) => {
    setSDKConfig((existingValues) => ({
      ...existingValues,
      conversationPrefillText: text
    }));
  };

  const setInitialUserMessage = (text: string) => {
    setSDKConfig((existingValues) => ({
      ...existingValues,
      initialUserMessage: text
    }));
  };

  const setFullPrivacy = (privacy: boolean) => {
    setSDKConfig((existingValues) => ({
      ...existingValues,
      fullPrivacy: privacy
    }));
  };

  const setInitiateChatOnLoad = (isEnabled: boolean) => {
    setSDKConfig((existingValues) => ({
      ...existingValues,
      initiateChatOnLoad: isEnabled
    }));
  };

  const setPresentFullScreenOniPad = (isEnabled: boolean) => {
    setSDKConfig((existingValues) => ({
      ...existingValues,
      presentFullScreenOniPad: isEnabled
    }));
  };

  const addCifs = () => {
    setSDKConfig((existingValues) => ({
      ...existingValues,
      cifs: {...existingValues.cifs, cifKey: {type: cifType, value: cifValue}}
    }));
    setCifKey("");
    setCifValue("");
    setCifType("singleline");
  };

  const setEnableContactUs = (contactUs: string) => {
    setSDKConfig((existingValues) => ({
      ...existingValues,
      enableContactUs: contactUs
    }));
  };

  const addConfig = () => {
    setSDKConfig((prevState) => {
      return {
        ...prevState,
        [configKey]: configValue
      };
    });
    setConfigKey("");
    setConfigValue("");
  };

  return (
    <View style={styles.card} key={refresh}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>CUSTOM KEY VALUE</Text>
        <View style={styles.horizontalContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setConfigKey}
            value={configKey}
            placeholder="config key"
          />
          <TextInput
            style={styles.input}
            onChangeText={setConfigValue}
            placeholder="config value"
            value={configValue}
          />
          <TouchableOpacity style={styles.appButtonContainer} onPress={addConfig}>
            <Text style={styles.appButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <Text style={styles.title}>CUSTOM ISSUE FIELDS</Text>
        <View style={styles.horizontalContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setCifKey}
            value={cifKey}
            placeholder="Cifs key"
          />
          <TextInput
            style={styles.input}
            onChangeText={setCifValue}
            placeholder="Cifs value"
            value={cifValue}
          />
        </View>
        <View style={styles.horizontalContainer}>
          <SelectDropdown
            data={cifTypes}
            onSelect={(selectedItem) => {
              setCifType(selectedItem);
            }}
            defaultValue={cifType}
            searchInputStyle={{height: 100, width: 100, backgroundColor: "red"}}
            renderButton={(selectedItem) => <Text>{selectedItem || "Select CIF Type"}</Text>}
            renderItem={(item, index, isSelected) => <Text style={{padding: 10}}>{item}</Text>}
          />
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => {
              addCifs();
            }}>
            <Text style={styles.appButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <Text style={styles.title}>Tags</Text>
        <View style={styles.horizontalContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setTags}
            value={sdkConfig.tags}
            placeholder="comma seperated tags"
          />
        </View>
        <View style={styles.separator} />
        <BouncyCheckbox
          {...commonCheckboxProps}
          text="Enable Full Privacy"
          isChecked={sdkConfig.fullPrivacy}
          onPress={(isChecked: boolean) => {
            setFullPrivacy(isChecked);
          }}
        />
        <View style={styles.separator} />
        <BouncyCheckbox
          {...commonCheckboxProps}
          text="Initiate Chat On Load"
          isChecked={sdkConfig.initiateChatOnLoad}
          onPress={(isChecked: boolean) => {
            setInitiateChatOnLoad(isChecked);
          }}
        />
        <View style={styles.separator} />
        <BouncyCheckbox
          {...commonCheckboxProps}
          text="Present Full Screen On iPad"
          isChecked={sdkConfig.presentFullScreenOniPad}
          onPress={(isChecked: boolean) => {
            setPresentFullScreenOniPad(isChecked);
          }}
        />
        <View style={styles.separator} />
        <View style={styles.horizontalContainer}>
          <Text>Enable Contact Us</Text>

          <SelectDropdown
            data={contactUsValues}
            onSelect={(selectedItem) => {
              setEnableContactUs(selectedItem);
            }}
            defaultValue={sdkConfig.enableContactUs}
            renderButton={(selectedItem) => {
              return (
                <View style={styles.dropdown1BtnStyle}>
                  <Text>{selectedItem || "Select Language"}</Text>
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
            // buttonStyle={styles.dropdown1BtnStyle}
          />
        </View>
        <View style={styles.separator} />
        <Text style={styles.title}>CONVERSATION PREFILL TEXT</Text>
        <View style={styles.horizontalContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPrefillText}
            value={sdkConfig.conversationPrefillText}
            placeholder="Conversation Prefill Text"
          />
        </View>
        <View style={styles.separator} />
        <Text style={styles.title}>INITIAL USER MESSAGE</Text>
        <View style={styles.horizontalContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setInitialUserMessage}
            value={sdkConfig.initialUserMessage}
            placeholder="Initial  User Message"
          />
        </View>
        <View style={styles.separator} />

        <BouncyCheckbox
          {...commonCheckboxProps}
          text="Show Config"
          isChecked={showConfig}
          onPress={(isChecked: boolean) => {
            setShowConfig(isChecked);
          }}
        />
        <View style={styles.horizontalContainer}>
          <TouchableOpacity
            style={styles.secondaryButtonContainer}
            onPress={() => {
              setSDKConfig({...DEFAULT_CONFIG});
              setRefresh((prev: number) => prev + 1);
            }}>
            <Text style={styles.secondaryButtonText}>Reset Config</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => {
              Clipboard.setString(JSON.stringify(sdkConfig));
              Toast.show({
                type: "info",
                text1: "Config Copied",
                autoHide: true,
                visibilityTime: 2000
              });
            }}>
            <Text style={styles.appButtonText}>Copy Config</Text>
          </TouchableOpacity>
        </View>
        {showConfig && (
          <>
            <Text style={styles.lableText}>Config Preview</Text>
            <Text>{JSON.stringify(sdkConfig, null, 4)}</Text>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ConfigScreen;
