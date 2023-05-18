import * as React from 'react';

import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TextInput,
  AppState,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  showConversation,
  requestUnreadMessageCount,
  showFAQsWithConfig,
  showFAQSectionWithConfig,
  showSingleFaqWithConfig,
  clearAnonymousUser,
  logout,
  setLanguage,
  login,
  handleProactiveLink,
  helpshiftEmitter,
  onAppBackground,
  onAppForeground,
  clearBreadcrumbs,
  leaveBreadCrumb,
  HelpshiftLog,
} from 'helpshift-plugin-sdkx-react-native';
import {
  notificationListenerAndroid,
  notificationListeneriOS,
} from './notificationService';
import { init, isAndroid } from './util';
import { Notifications } from 'react-native-notifications';
import SelectDropdown from 'react-native-select-dropdown'
import styles from './style';


const DEFAULT_SECTION_ID = '100';
const DEFAULT_FAQ_QUESTION_ID = '546';
const DEFAULT_BREAD_CRUMB = '1234';
const EXAMPLE_PROACTIVE_URL =
  'companyName://helpshift.com/proactive/?payload=eyJhY3Rpb24iOiJjaGF0IiwibWV0YSI6eyJpZCI6Im91dGJvdW5kX2M1Nzg4NTliLTY5NDUtNGUyOC04NGQzLTRkMzBmNDMyNTcyOSIsIm9yaWdpbiI6InByb2FjdGl2ZSJ9LCJjaGF0Q29uZmlnIjp7ImluaXRpYWxVc2VyTWVzc2FnZSI6InRlc3QgaW9zIGFuZCBhbmRyb2lkIiwiY3VzdG9tSXNzdWVGaWVsZHMiOnsiY2l0eSI6eyJ0eXBlIjoic2luZ2xlbGluZSIsInZhbHVlIjoiZGVsaGkifSwiYWJjIjp7InR5cGUiOiJzaW5nbGVsaW5lIiwidmFsdWUiOiJhYmMtdGVzdCJ9fX19';
const KEYBOARD_VERTICAL_OFFSET = Platform.OS == 'ios' ? 140 : 0;
const CIFs = { stock_level: { type: 'number', value: '1505' } };
const DEFAULT_CONFIG = { tags: [] as string[], enableInAppNotification: true, fullPrivacy: false, customIssueFields: CIFs }

const App = () => {
  const [faqSectionId, setFaqSectionId] = React.useState(DEFAULT_SECTION_ID);
  const [shouldClear, setShouldClear] = React.useState(false);
  const [remoteUnreadCountFlag, setRemoteUnreadCountFlag] = React.useState(true);
  const [proactiveUrl, setProactiveUrl] = React.useState(EXAMPLE_PROACTIVE_URL);
  const [faqQuestionId, setFaqQuestionId] = React.useState(
    DEFAULT_FAQ_QUESTION_ID
  );
  const [breadCrumb, setBreadCrumb] = React.useState(DEFAULT_BREAD_CRUMB);
  const [sdkConfig, setSDKConfig] = React.useState(DEFAULT_CONFIG);
  const [langCode, setLangCode] = React.useState("en");

  const [logLevel, setLogLevel] = React.useState("Verbose");
  const [tag, setTag] = React.useState("");
  const [debugMsg, setDebugMsg] = React.useState("");

  const [userId, setUserId] = React.useState(EXAMPLE_PROACTIVE_URL);
  const [userName, setUserName] = React.useState(EXAMPLE_PROACTIVE_URL);
  const [userEmail, setUserEmail] = React.useState(EXAMPLE_PROACTIVE_URL);
  const [userSecret, setUserSecret] = React.useState(EXAMPLE_PROACTIVE_URL);
  const [userAuthentication, setUserAuthentication] = React.useState(true);
  const installCallDelayed = React.useRef(false);

  const appState = React.useRef(AppState.currentState);

  const langCodes = ["en", "fr", "nl", "de"]
  const logLevels = ["Verbose", "Debug", "Info", "Warn", "Error"]


  const setTags = (tag: string) => {
    setSDKConfig(existingValues => ({
      ...existingValues,
      tags: getTagsForConfig(tag)
    }))
  }

  const setFullPrivacy = (privacy: boolean) => {
    setSDKConfig(existingValues => ({
      ...existingValues,
      fullPrivacy: privacy
    }))
  }

  const setInAppNotification = (notify: boolean) => {
    setSDKConfig(existingValues => ({
      ...existingValues,
      enableInAppNotification: notify
    }))
  }

  function getTagsForConfig(tag: string) {
    return tag.split(",");
  }

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        if (installCallDelayed.current) {
          onAppForeground();
        }
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
      if (appState.current == 'background' && installCallDelayed.current) {
        onAppBackground();
      }
    });

    init(installCallDelayed.current);
    getStorage();
    registerNotification();
    handleCallbacks();
    handleDeeplink();
    return () => {
      helpshiftEmitter.removeAllListeners('onEventOccurred');
      helpshiftEmitter.removeAllListeners('onUserAuthenticationFailure');
      subscription.remove();
      Linking.removeAllListeners;
    };
  }, []);

  const handleDeeplink = async () => {
    const apiConfig = {
      presentFullScreenOniPad: false,
    };

    /**
     * Linking addEventListener is called when app is already open, app is foregrounded
     */
    Linking.addEventListener('url', (callback) => {
      const path = callback.url.split('//');
      if ('chat' == path[1]) {
        showConversation(apiConfig);
      }
    });

    /**
     * Linking.getInitialURL is called when app is closed will return promise
     */
    const initialUrl = await Linking.getInitialURL();
    if (initialUrl != null) {
      const path = initialUrl.split('//');
      if ('chat' == path[1]) {
        showConversation(apiConfig);
      }
    }
  };

  const handleCallbacks = () => {
    helpshiftEmitter.addListener('onEventOccurred', (data) => {
      if (data.eventName == 'receivedUnreadMessageCount') {
        try {
          let countData =
            Platform.OS == 'ios' ? data.eventData : JSON.parse(data.eventData);
          Toast.show({ type: 'info', text1: 'Msg Count ' + countData.count }); // show toast to user for count
        } catch (err) {
          console.error('Parsing Error', err);
        }
      } else {
        Toast.show({ type: 'info', text1: JSON.stringify(data) });
      }
    });
    helpshiftEmitter.addListener('onUserAuthenticationFailure', (data) => {
      Toast.show({
        type: 'error',
        text1: JSON.stringify(data),
      });
    });
  };

  async function getStorage() {
    try {
      const value = await AsyncStorage.getItem('@ProactiveData');
      if (value !== null) {
        // We have data!!
        console.log("getting storage data", value);
        handleProactiveLink(value, {});
        AsyncStorage.removeItem('@ProactiveData');
      }
    } catch (error) {
      // Error retrieving data
      console.log("App error storage", error);
    }
  }

  async function registerNotification() {
    if (isAndroid) {
      notificationListenerAndroid();
    } else {
      Notifications.registerRemoteNotifications();
      notificationListeneriOS();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Toast topOffset={0} autoHide={false} />

      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
        >
          <ScrollView>
            <View style={{ left: 20, marginRight: 40 }}>
              {/*User Section */}
              <Text style={styles.lableText}>User</Text>
              <View style={styles.horizontalContainer}>
                <TextInput
                  style={styles.inputForm}
                  onChangeText={setUserId}

                  placeholder="Enter User ID"
                />
                <TextInput
                  style={styles.inputForm}
                  onChangeText={setUserName}

                  placeholder="Enter User Name"
                />

              </View>
              <View style={styles.horizontalContainer}>
                <TextInput
                  style={styles.inputForm}
                  onChangeText={setUserEmail}

                  placeholder="Enter User Email ID"
                />
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Enable Authentication"
                  textStyle={{ textDecorationLine: "none" }}
                  iconStyle={{ borderColor: 'red' }}
                  innerIconStyle={{ borderWidth: 2 }}
                  isChecked={userAuthentication}
                  onPress={(isChecked: boolean) => {
                    setUserAuthentication(isChecked);
                  }}
                />
              </View>
              <View style={styles.horizontalContainer}>
                <TextInput
                  style={[styles.inputForm, { width: '90%' }]}
                  onChangeText={setUserSecret}

                  placeholder="Add your secret key from Dashboard"
                />

              </View>
              <View style={styles.horizontalContainer}>
                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={() => {
                    let userdata = {
                      userID: userId,
                      userEmail: userEmail,
                      userName: userName
                    }
                    if (userAuthentication) {
                      const updatedUserData = { ...userdata, userAuthToken: userSecret }
                      login(updatedUserData);
                    } else {
                      login(userdata);
                    }
                  }}
                >
                  <Text style={styles.appButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.appButtonContainer} onPress={() => logout()}>
                  <Text style={styles.appButtonText}>Logout</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.horizontalContainer}>
                <TouchableOpacity
                  style={{ ...styles.appButtonContainer, width: '75%' }}
                  onPress={() => clearAnonymousUser(shouldClear)}
                >
                  <Text style={styles.appButtonText}>Clear Ananymous User</Text>
                </TouchableOpacity>
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Clear Anon Flag"
                  textStyle={{ textDecorationLine: "none" }}
                  iconStyle={{ borderColor: 'red' }}
                  innerIconStyle={{ borderWidth: 2 }}
                  isChecked={shouldClear}
                  onPress={(isChecked: boolean) => {
                    setShouldClear(isChecked);
                  }}
                />
              </View>
              {/*User Section End*/}
              {/*Config Section */}
              <Text style={styles.lableText}>Config Setup</Text>
              <View style={styles.horizontalContainer}>

                <TextInput
                  style={styles.input1}
                  onChangeText={setTags}
                  placeholder="comma seperated tags"
                />

                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Full Privacy"
                  textStyle={{ textDecorationLine: "none" }}
                  iconStyle={{ borderColor: 'red' }}
                  innerIconStyle={{ borderWidth: 2 }}
                  isChecked={sdkConfig.fullPrivacy}
                  onPress={(isChecked: boolean) => {
                    setFullPrivacy(isChecked);
                  }}
                />

              </View>
              <BouncyCheckbox
                size={25}
                fillColor="red"
                unfillColor="#FFFFFF"
                text="Enable In App Notification"
                textStyle={{ textDecorationLine: "none" }}
                iconStyle={{ borderColor: 'red' }}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={sdkConfig.enableInAppNotification}
                onPress={(isChecked: boolean) => {
                  setInAppNotification(isChecked);
                }}
              />
              {/*Config Section End*/}
              {/*Conversation Section Start*/}
              <Text style={styles.lableText}>Conversation</Text>

              <TouchableOpacity
                style={[styles.appButtonContainer, styles.appButtonContainerSmall]}
                onPress={() => {
                  showConversation(sdkConfig);
                }}
              >
                <Text style={styles.appButtonText} >Open Chat</Text>
              </TouchableOpacity>
              <View style={styles.horizontalContainer}>
                <TouchableOpacity
                  style={[styles.appButtonContainer, styles.appButtonContainerSmall]}
                  onPress={() => requestUnreadMessageCount(remoteUnreadCountFlag)}
                >
                  <Text style={styles.appButtonText} >Unread Message Count</Text>
                </TouchableOpacity>
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="From Remote"
                  textStyle={{ textDecorationLine: "none" }}
                  iconStyle={{ borderColor: 'red' }}
                  innerIconStyle={{ borderWidth: 2 }}
                  isChecked={remoteUnreadCountFlag}
                  onPress={(isChecked: boolean) => {
                    setRemoteUnreadCountFlag(isChecked);
                  }}
                />
              </View>


              {/*Conversation Section End*/}
              {/*Help center Section Start*/}
              <Text style={styles.lableText}>Help Center</Text>

              <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={() => showFAQsWithConfig(sdkConfig)}
              >
                <Text style={styles.appButtonText} >Show FAQs</Text>
              </TouchableOpacity>

              <View style={styles.horizontalContainer}>
                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={() =>
                    showSingleFaqWithConfig(faqQuestionId, sdkConfig)
                  }
                >
                  <Text style={styles.appButtonText} >Show FAQ Question</Text>
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
                  onPress={() =>
                    showFAQSectionWithConfig(faqSectionId, sdkConfig)
                  }
                >
                  <Text style={styles.appButtonText}>Show FAQ Section</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  onChangeText={setFaqSectionId}
                  value={faqSectionId}
                  placeholder="Faq Section Id"
                />
              </View>

              {/*Help center Section End*/}

              {/*Language Section Start*/}
              <Text style={styles.lableText}>Language</Text>
              <View style={styles.horizontalContainer}>
                <SelectDropdown
                  data={langCodes}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setLangCode(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item) => {
                    return item
                  }}
                  buttonStyle={styles.dropdown1BtnStyle} />
                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={() => setLanguage(langCode)}
                >
                  <Text style={styles.appButtonText}>Set Lanugage</Text>
                </TouchableOpacity>
              </View>
              {/*Language Section End*/}
              {/*BreadCrumB Section Start*/}
              <Text style={styles.lableText}>BreadCrumb</Text>
              <View style={styles.horizontalContainer}>
                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={() => clearBreadcrumbs()}
                >
                  <Text style={styles.appButtonText}>Clear Breadcrumbs</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.horizontalContainer}>
                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={() => leaveBreadCrumb(breadCrumb)}
                >
                  <Text style={styles.appButtonText} >Leave BreadCrumb</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  onChangeText={setBreadCrumb}
                  value={breadCrumb}
                  placeholder="Enter leaveBreadCrumb"
                />
              </View>
              {/*BreadCrum Section End*/}
              {/*Debug Log Section Start*/}
              <Text style={styles.lableText}>Debug Logs</Text>
              <View style={styles.horizontalContainer}>
                <SelectDropdown
                  data={logLevels}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setLogLevel(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item) => {
                    return item
                  }}
                  buttonStyle={styles.dropdown1BtnStyle} />

                <TextInput
                  style={styles.input}
                  onChangeText={setTag}
                  value={tag}
                  placeholder="Tag"
                />
                <TextInput
                  style={[styles.input, { width: '30%' }]}
                  onChangeText={setDebugMsg}
                  value={debugMsg}
                  placeholder="Log Message"
                />
              </View>
              <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={() => {
                  if (logLevel == 'Verbose') {
                    console.log('in chexk')
                    HelpshiftLog.v(tag, debugMsg);
                  } else if (logLevel == 'Debug') {
                    HelpshiftLog.d(tag, debugMsg);
                  } else if (logLevel == 'Info') {
                    HelpshiftLog.i(tag, debugMsg);
                  } else if (logLevel == 'Warn') {
                    HelpshiftLog.w(tag, debugMsg);
                  } else if (logLevel == 'Error') {
                    HelpshiftLog.e(tag, debugMsg);
                  }
                }
                }
              >
                <Text style={styles.appButtonText}>Add Debug Log</Text>
              </TouchableOpacity>
              {/*Debug Log Section End*/}
              {/*Misc Section Start*/}
              <Text style={styles.lableText}>Misc</Text>
              <View style={styles.horizontalContainer}>
                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={() =>
                    handleProactiveLink(proactiveUrl, sdkConfig)
                  }
                >
                  <Text style={styles.appButtonText} >Handle Proactive </Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  onChangeText={setProactiveUrl}
                  value={proactiveUrl}
                  placeholder="Handle Proactive"
                />
              </View>
              {/*Misc Section Start*/}

            </View>


          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView >
  );
};

export default App;
