import * as React from "react";

import {AppState, Linking} from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  showConversation,
  handleProactiveLink,
  helpshiftEmitter,
  onAppBackground,
  onAppForeground,
  helpshiftConstants,
  onEventOccurredListener,
  onUserAuthFailedListener,
  HelpshiftEventData
} from "helpshift-plugin-sdkx-react-native";
import {notificationListenerAndroid, notificationListeneriOS} from "./notificationService";
import {init, isAndroid} from "./util";
import {Notifications} from "react-native-notifications";
import {isIos} from "./util";
import {NavigationContainer} from "@react-navigation/native";
import RootNavigationStack from "./RootNavigationStack";
import {AppProvider, useAppContext} from "./data/AppContext";
import CustomModal from "./component/EventLoggerModal";

const App = () => {
  const installCallDelayed = React.useRef(false);
  const appState = React.useRef(AppState.currentState);
  const {addEvent, setEventModalPresented, eventModalPresented} = useAppContext();

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        console.log("App has come to the foreground!");
        if (installCallDelayed.current) {
          onAppForeground();
        }
      }

      appState.current = nextAppState;
      console.log("AppState", appState.current);
      if (appState.current === "background" && installCallDelayed.current) {
        onAppBackground();
      }
    });

    init(installCallDelayed.current);
    getStorage();
    registerNotification();
    const helpshiftEvent = onEventOccurredListener(handleEvent);
    const onUserAuthFailed = onUserAuthFailedListener(handleUserAuthFailed);
    handleDeeplink();
    return () => {
      helpshiftEvent.remove();
      onUserAuthFailed.remove();
      subscription.remove();
      Linking.removeAllListeners("url");
    };
  }, []);

  // 3. Wrap listeners in useCallback if they have dependencies
  const handleEvent = React.useCallback((payload: HelpshiftEventData) => {
    addEvent({
      eventName: payload.eventName,
      eventData: payload.eventData
    });
  }, []);

  const handleUserAuthFailed = React.useCallback((payload: HelpshiftEventData) => {
    addEvent({
      eventName: payload.eventName,
      eventData: payload.eventData
    });
  }, []);

  const handleDeeplink = async () => {
    const apiConfig = {
      presentFullScreenOniPad: false
    };

    /**
     * Linking addEventListener is called when app is already open, app is foregrounded
     */
    Linking.addEventListener("url", (callback) => {
      const path = callback.url.split("//");
      if (path[1] === "chat") {
        showConversation(apiConfig);
      }
    });

    /**
     * Linking.getInitialURL is called when app is closed will return promise
     */
    const initialUrl = await Linking.getInitialURL();
    if (initialUrl !== null) {
      const path = initialUrl.split("//");
      if (path[1] === "chat") {
        showConversation(apiConfig);
      }
    }
  };

  const getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("@ProactiveData");
      if (value !== null) {
        // We have data!!
        console.log("getting storage data", value);
        handleProactiveLink(value, {});
        AsyncStorage.removeItem("@ProactiveData");
      }
    } catch (error: any) {
      // Error retrieving data
      console.error("App error storage:", error.message ?? error);
    }
  };

  const registerNotification = async () => {
    if (isAndroid) {
      notificationListenerAndroid();
    } else {
      Notifications.registerRemoteNotifications();
      notificationListeneriOS();
    }
  };

  return (
    <NavigationContainer>
      <CustomModal visible={eventModalPresented} onClose={() => setEventModalPresented(false)} />
      <RootNavigationStack />
    </NavigationContainer>
  );
};

const WrappedApp = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default WrappedApp;
