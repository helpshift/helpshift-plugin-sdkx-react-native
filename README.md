# helpshift-plugin-sdkx-react-native
Helpshift SDK X plugin for React Native.

## Getting Started
Follow the [Getting Started page of Helpshift Developer Guide](https://developers.helpshift.com/sdkx-react-native/getting-started/) for details like app ID, domain, etc.

## Requirements
- Node v16 or above
- Android Studio
- Xcode 10 or above

## Helpshift APIs
### Initialize
```
// Import helpshift API's from the 'helpshift-plugin-sdkx-react-native' plugin.

import {
  install,
  showConversation,
  showFAQsWithConfig,
  showFAQSectionWithConfig,
  logout,
  login
} from 'helpshift-plugin-sdkx-react-native';
```

### Install
```
let installConfig = {
  'enableLogging': true,
  'manualLifecycleTracking': false,
  'runtimeVersion': EXAMPLE_REACTNATIVE_VERSION // Developer need to pass react-native version.
}
let appId = Platform.select({
  android: <Android_Platform_Id>,
  ios: <iOS_Platform_Id>,
});

if (appId != null) {
  install(appId, <domain>, installConfig);
} else {
  //Display your error here.
}
```

* additionaly for iOS platform there is a requirement to link the native parts of the library:
``` $ npx pod-install ```

### showConversation
```
const config = {<SDK_CONFIGRATION_OBJECT_MAP>};  
showConversation(config);
```
### Show FAQs
```
showFAQsWithConfig(<SDK_CONFIGRATION_OBJECT_MAP>);
```
### Showing a Particular FAQ Section
```
showFAQSectionWithConfig(
  <FAQ_SECTION_PUBLISH_ID>, <SDK_CONFIGRATION_OBJECT_MAP>
);
```
### Showing a Particular FAQ
```
showSingleFaqWithConfig(
<FAQ_QUESTION_PUBLISH_ID>, <SDK_CONFIGRATION_OBJECT_MAP>
)
```
Where <SDK_CONFIGRATION_OBJECT_MAP> is config object. you can refer [here]( https://developers.helpshift.com/sdkx-react-native/sdk-configuration/) For SDK Configrations.
### setLanguage
```
setLanguage(<LANGUAGE_CODE>)
```
For <LANGUAGE_CODE> please refer this document [here](https://developers.helpshift.com/sdkx-react-native/i18n/)
## SDK Configuration
For details on SDK Configuration, follow the [SDK Configuration page on Helpshift Developer Guide](https://developers.helpshift.com/sdkx-react-native/sdk-configuration/).

### enableLogging
```
let installConfig = {
  'enableLogging': true,
}
install(<APP_ID>, <domain>, installConfig);
```
### presentFullScreenOniPad
```
const config = {
  presentFullScreenOniPad: false
};
showConversation(config);
```
## Users
For details on user related APIs, follow [Helpshift Developer Guide](https://developers.helpshift.com/sdkx-react-native/users/).

### Login
```
login({
  userEmail: "<USER_EMAIL>",
  userId: "<USER_ID>",
  userName: "<USER_NAME>"
  userAuthToken: "<GENERATED_USER_AUTH_TOKEN>"
});
```
### Logout
```
logout()
```
### Notifications
You need to install your notification plugin to use notifications. Use the `registerPushToken` and `handlePush` APIs for this. Refer [iOS](https://developers.helpshift.com/sdkx-react-native/notifications-ios/) and [Android](https://developers.helpshift.com/sdkx-react-native/notifications-android) Helpshift Developer Guide for more details. 
### CIF Support
```
const cifs = { stock_level: { type: 'number', value: '1505' }, age: { type: 'number', value: '20' } };
const config = {
    customIssueFields: cifs,
};
showConversation(config);
```
Refer [Helpshift Developer Guide CIF Support](https://developers.helpshift.com/sdkx-react-native/tracking/#set-custom-issue-fields) for more details. 
### Outbound Support
```
handleProactiveLink(<PROACTIVE_LINK> , <USER_LOCAL_CONFIG>);
```
Refer [Helpshift Developer Guide For Outbound Support](https://developers.helpshift.com/sdkx-react-native/outbound-support/) for more details.