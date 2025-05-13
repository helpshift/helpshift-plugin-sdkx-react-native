# helpshift-plugin-sdkx-react-native

Helpshift SDK X plugin for React Native.

## Getting Started

Follow the [Getting Started page of Helpshift Developer Guide](https://developers.helpshift.com/sdkx-react-native/getting-started/) for details like app ID, domain, etc.

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Helpshift APIs

### Initialize

Initialize SDK by calling install method before any other interaction with the Helpshift SDK in App.tsx.(It should be used in the useEffect hook in react native call). [For more details click here](/blob/main/src/util.ts)

For details on install API, follow [Helpshift Developer Guide](https://developers.helpshift.com/sdkx-react-native/getting-started/#initializing).

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

- additionaly for iOS platform there is a requirement to link the native parts of the library:
  `$ npx pod-install`

### showConversation

The showConversation API launches the Helpshift in-app chat interface, allowing users to start or continue a support conversation. The optional config parameter lets you customize the behavior of the conversation screen—for example, setting tags, custom issue fields (CIFs). Make sure the Helpshift SDK is initialized before calling this function.[more info](/blob/main/src/component/Conversation.tsx)

For details on showConversation API, follow [Helpshift Developer Guide](https://developers.helpshift.com/sdkx-react-native/support-tools/#conversation-view).

```
const config = {<SDK_CONFIGRATION_OBJECT_MAP>};
showConversation(config);
```

## Helpcenter

You can use this API to provide a way for the user to invoke the purpose-built help/support section in your app. This is the easiest approach to enable help in your app as it bundles all the capabilities of the Helpshift SDK in a simple and intuitive interface. You can wire this API call to a "Help" or "Support" action in your app. [more info](helpshift-plugin-sdkx-react-native/blob/main/src/component/Helpcenter.tsx)

For more details on helpcenter integration, follow [Helpshift Developer Guide](https://developers.helpshift.com/sdkx-react-native/support-tools/#faqs-view).

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

Where <SDK_CONFIGRATION_OBJECT_MAP> is config object. you can refer [here](https://developers.helpshift.com/sdkx-react-native/sdk-configuration/) For SDK Configrations.

### setLanguage

You can set the SDK language using this API. By default, the device's preferred language is used by the SDK. [more info](/blob/main/src/component/Language.tsx)

```
setLanguage(<LANGUAGE_CODE>)
```

For <LANGUAGE_CODE> please refer this document [here](https://developers.helpshift.com/sdkx-react-native/i18n/)

## SDK Configuration

For details on SDK Configuration, follow the [SDK Configuration page on Helpshift Developer Guide](https://developers.helpshift.com/sdkx-react-native/sdk-configuration/).

Example Implementation: Refer to the ConfigScreen.tsx [file](/blob/main/src/screens/ConfigScreen.tsx)

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

### CIF Support

```
const cifs = { stock_level: { type: 'number', value: '1505' }, age: { type: 'number', value: '20' } };
const config = {
    customIssueFields: cifs,
};
showConversation(config);
```

## Users

For details on user related APIs, follow [Helpshift Developer Guide](https://developers.helpshift.com/sdkx-react-native/users/).

Example Implementation: Refer to the UserLoginScreen screen [file](/blob/main/src/screens/UserLoginScreen.tsx)

## User Hub

Helpshift’s new User Identity System (User Hub) into our app, replacing the legacy method of user identification. The system uses secure, JWT-based login to authenticate users and improve the agent experience with faster context collection, enhanced security, and spam protection.

For details on user related APIs, follow [Helpshift Developer Guide](https://developers.helpshift.com/sdkx_ios/identity-user-hub/).

Example Implementation: Refer to the UserLoginScreen screen [file](/blob/main/src/screens/UserIdentityLoginScreen.tsx)

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

Example Implementation [Refer](/blob/main/src/notificationService.ts)

For details on setLanguage API, follow [Helpshift Developer Guide for iOS](https://developers.helpshift.com/sdkx-react-native/notifications-ios/) and [Helpshift Developer Guide for Android](https://developers.helpshift.com/sdkx-react-native/notifications-android/).

### Outbound Support

```
handleProactiveLink(<PROACTIVE_LINK> , <USER_LOCAL_CONFIG>);
```

Refer [Helpshift Developer Guide For Outbound Support](https://developers.helpshift.com/sdkx-react-native/outbound-support/) for more details.
