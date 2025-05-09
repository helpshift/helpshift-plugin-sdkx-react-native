import {install} from "helpshift-plugin-sdkx-react-native";
import {Platform, StyleSheet} from "react-native";
import {Toast} from "react-native-toast-message/lib/src/Toast";
import config from "./configure";
import {sign} from "react-native-pure-jwt";

export const EXAMPLE_REACTNATIVE_VERSION = Platform.constants?.reactNativeVersion;

export const init = (manualTracking: boolean) => {
  const installConfig = {
    enableLogging: true,
    manualLifecycleTracking: manualTracking ?? false,
    runtimeVersion: EXAMPLE_REACTNATIVE_VERSION
  };

  installConfig.manualLifecycleTracking = manualTracking;

  const appId = Platform.select({
    android: config.androidPlatformId,
    ios: config.iosPlatformId
  });

  if (appId !== null) {
    install(appId ?? "", config.domain, installConfig);
  } else {
    Toast.show({
      type: "error",
      text1: "Install call failed please check its params value"
    });
  }
};

export const isIos = Platform.OS === "ios";

export const isAndroid = Platform.OS === "android";

export const KEYBOARD_VERTICAL_OFFSET = 50;
export const CIFs = {stock_level: {type: "number", value: "1505"}};
export const DEFAULT_CONFIG = {
  tags: [] as string[],
  enableInAppNotification: true,
  fullPrivacy: false,
  cifs: CIFs,
  conversationPrefillText: "",
  initialUserMessage: "",
  initiateChatOnLoad: false,
  presentFullScreenOniPad: false,
  enableContactUs: "ALWAYS"
};

export const cifTypes = ["singleline", "multiline", "number", "dropdown", "date", "checkbox"];

export const contactUsValues = [
  "ALWAYS",
  "AFTER_MARKING_ANSWER_UNHELPFUL",
  "AFTER_VIEWING_FAQS",
  "NEVER"
];

const styles = StyleSheet.create({
  textStyle: {
    textDecorationLine: "none"
  }
});

export const commonCheckboxProps = {
  size: 22,
  fillColor: "green",
  unfillColor: "#FFFFFF",
  textStyle: styles.textStyle,
  innerIconStyle: {borderWidth: 2}
};

export const generateJWT = async (data: object, secret: string) => {
  console.log("generating jwt for the data", JSON.stringify(data));
  try {
    const token = await sign(data, secret, {alg: "HS256"});
    return token;
  } catch (error) {
    return null;
  }
};
