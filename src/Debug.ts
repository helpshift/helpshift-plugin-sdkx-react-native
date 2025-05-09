import {NativeModules, Platform} from "react-native";
import {isIos} from "./util";

const LINKING_ERROR =
  `The package 'Debug Module' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ios: "- You have run 'pod install'\n", default: ""}) +
  "- You rebuilt the app after installing the package\n";
const Debug = NativeModules.RNDebugModule
  ? NativeModules.RNDebugModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        }
      }
    );

export const setWebSecutiySetting = (isEnabled: boolean) => {
  if (isIos) {
    Debug.setWebSecutiy(isEnabled);
  }
};

export const purge = () => {
  if (isIos) {
    Debug.purge();
  }
};
