import React, {useState} from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../style";
import Toast from "react-native-toast-message";
import {addUserIdentities, loginWithIdentity, logout} from "helpshift-plugin-sdkx-react-native";
import AppAttributes from "../component/AppAttributes";
import MasterAttributes from "../component/MasterAttributes";
import {generateJWT} from "../util";
import {Identity} from "../Types";
import CustomInput from "../component/CustomInput";
import AppContainer from "../AppContainer";
import {useAppContext} from "../data/AppContext";

const UserIdentityLoginScreen = () => {
  const [identifierKeyName, setIdentifierKeyName] = useState("identifier");
  const [identifierKeyValue, setIdentifierKeyValue] = useState("");
  const [identifierValueName, setIdentifierValueName] = useState("value");
  const [identifierValue, setIdentifierValue] = useState("");
  const [iatKeyName, setIatKeyName] = useState("iat");
  const [iatValue, setIatValue] = useState<string | undefined>("");
  const [metadataKey, setMetaDataKey] = useState("");
  const [metadatValue, setMetaDataValue] = useState("");
  const [jwt, setJwt] = useState("");
  const [loginConfig, setLoginConfig] = useState({});
  const [configKey, setConfigKey] = useState("");
  const [configValue, setConfigValue] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [metadata, setMetadata] = useState({});
  const {addEvent} = useAppContext();

  const loginWithJwt = (jwtToken: string) => {
    loginWithIdentity(jwtToken, loginConfig)
      .then(() => Toast.show({type: "info", text1: "Identity User Loggedin"}))
      .catch((err) => addEvent({eventName: "IDENTITY_LOGIN", eventData: err}));
  };

  const addConfig = () => {
    setLoginConfig((prevState) => ({
      ...prevState,
      [configKey]: configValue
    }));
    setConfigKey("");
    setConfigValue("");
  };

  const identityLogin = async () => {
    const jwtToken = await generateJWT(
      {[iatKeyName]: Number(iatValue), identities: identities},
      secretKey
    );
    if (jwtToken) {
      loginWithJwt(jwtToken);
    }
  };

  const addUserId = async () => {
    const jwtToken = await generateJWT(
      {[iatKeyName]: Number(iatValue), identities: identities},
      secretKey
    );
    if (jwtToken) {
      addUserIdentities(jwtToken);
    }
  };

  const saveIdentity = () => {
    setIdentities((prevState) => [
      ...prevState,
      {
        metadata,
        identifier: identifierKeyValue,
        value: identifierValue
      }
    ]);
    setIdentifierKeyValue("");
    setIdentifierValue("");
  };

  const saveMetaData = () => {
    setMetadata((prevState) => ({
      ...prevState,
      [metadataKey]: metadatValue
    }));
    setMetaDataKey("");
    setMetaDataValue("");
  };

  return (
    <View style={[styles.flex, styles.mb]}>
      <AppContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.title}>LOGIN CONFIG</Text>
            <View style={styles.horizontalContainer}>
              <CustomInput
                onChangeText={setConfigKey}
                value={configKey}
                placeholder="Identifier Key"
              />
              <CustomInput
                onChangeText={setConfigValue}
                placeholder="Identifier value"
                value={configValue}
              />
              <TouchableOpacity style={styles.appButtonContainer} onPress={() => addConfig()}>
                <Text style={styles.appButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.secondaryButtonContainer}
              onPress={() => setLoginConfig({})}>
              <Text style={styles.secondaryButtonText}>Reset Config</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Login Config Preview</Text>
            <Text style={styles.note}>{JSON.stringify(loginConfig)}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>JWT Login</Text>
            <CustomInput onChangeText={setJwt} value={jwt} placeholder="config key" />
            <View style={styles.horizontalContainer}>
              <TouchableOpacity style={styles.appButtonContainer} onPress={() => loginWithJwt(jwt)}>
                <Text style={styles.appButtonText}>Login</Text>
              </TouchableOpacity>
              <Text style={styles.title}>or</Text>

              <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={() => addUserIdentities(jwt)}>
                <Text style={styles.appButtonText}>Add User Identity</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />
            <Text style={styles.title}>Anon Login</Text>
            <TouchableOpacity style={styles.appButtonContainer} onPress={() => loginWithJwt("")}>
              <Text style={styles.appButtonText}>Anon User Identity Login</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.secondaryButtonContainer} onPress={() => logout()}>
              <Text style={styles.secondaryButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>USER IDENTITIES</Text>
            <View style={styles.horizontalContainer}>
              <CustomInput
                onChangeText={setIdentifierKeyName}
                value={identifierKeyName}
                placeholder="Identifier Key"
              />
              <CustomInput
                onChangeText={setIdentifierKeyValue}
                placeholder="Identifier value"
                value={identifierKeyValue}
              />
            </View>
            <View style={styles.horizontalContainer}>
              <CustomInput
                onChangeText={setIdentifierValueName}
                value={identifierValueName}
                placeholder="value"
              />
              <CustomInput
                onChangeText={setIdentifierValue}
                placeholder="Add Value"
                value={identifierValue}
              />
            </View>
            <View style={styles.horizontalContainer}>
              <CustomInput onChangeText={setIatKeyName} value={iatKeyName} placeholder="iat" />
              <CustomInput onChangeText={setIatValue} placeholder="iat value" value={iatValue} />
            </View>
            <Text style={styles.title}>Metadata for identity to be added next</Text>
            <View style={styles.horizontalContainer}>
              <CustomInput onChangeText={setMetaDataKey} value={metadataKey} placeholder="key" />
              <CustomInput
                onChangeText={setMetaDataValue}
                placeholder="value"
                value={metadatValue}
              />
              <TouchableOpacity style={styles.appButtonContainer} onPress={() => saveMetaData()}>
                <Text style={styles.appButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalContainer}>
              <TouchableOpacity style={styles.appButtonContainer} onPress={() => saveIdentity()}>
                <Text style={styles.appButtonText}>Save Identity</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButtonContainer}
                onPress={() => setIdentities([])}>
                <Text style={styles.secondaryButtonText}>Reset Ideneties</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalContainer}>
              <Text style={styles.title}>Secret Key</Text>
              <CustomInput onChangeText={setSecretKey} value={secretKey} placeholder="Secret Key" />
            </View>
            <TouchableOpacity
              style={[styles.appButtonContainer, styles.mt]}
              onPress={() => identityLogin()}>
              <Text style={styles.appButtonText}>Login with Identity</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.appButtonContainer, styles.mt]}
              onPress={() => addUserId()}>
              <Text style={styles.appButtonText}>Add User Identity</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <Text style={styles.title}>Identities Preview</Text>
            <Text>{JSON.stringify(identities)}</Text>
          </View>
          <AppAttributes />
          <MasterAttributes />
        </ScrollView>
      </AppContainer>
    </View>
  );
};

export default UserIdentityLoginScreen;
