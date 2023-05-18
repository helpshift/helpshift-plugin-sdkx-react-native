import { install } from "helpshift-plugin-sdkx-react-native";
import { Platform } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import config from "./configure";

export const EXAMPLE_REACTNATIVE_VERSION = '0.68.2';

export const init = (manualTracking: boolean = false) => {

    let installConfig = {
        'enableLogging': true,
        'manualLifecycleTracking': false,
        'runtimeVersion': EXAMPLE_REACTNATIVE_VERSION,
      }
  
       installConfig.manualLifecycleTracking = manualTracking 
  
      let appId = Platform.select({
        android: config.androidPlatformId,
        ios: config.iosPlatformId,
      });

      if (appId != null) {
        install(appId, config.domain, installConfig);
      } else {
        Toast.show({ type: 'error', text1: 'Install call failed please check its params value', });
      }
}

export const isIos = Platform.OS == 'ios';

export const isAndroid = Platform.OS == 'android';