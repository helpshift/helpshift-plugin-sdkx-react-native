import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  handleProactiveLink,
  handlePush,
  registerPushToken,
} from 'helpshift-plugin-sdkx-react-native';
import {
  Notification,
  Notifications,
  Registered,
  RegistrationError,
} from 'react-native-notifications';
import { Alert } from 'react-native';

export const requestNotificationPermission = async (): Promise<string> => {
  const notificationStatus = await messaging().requestPermission();
  const enabled =
    notificationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    notificationStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    return getFcmToken();
  } else {
    return '';
  }
};

const getFcmToken = async (): Promise<string> => {
  let oldToken = await AsyncStorage.getItem('FCMTOKEN');
  if (oldToken) return oldToken;
  try {
    const newToken = await messaging().getToken();
    AsyncStorage.setItem('FCMTOKEN', newToken);
    return newToken;
  } catch (error) {
    console.log('not able to get fcm token');
    return '';
  }
};

export const notificationListenerAndroid = async (): Promise<
  [Function, Function]
> => {
  const token = await requestNotificationPermission();

  console.log('syncing token is', token);
  if (token !== '') {
    registerPushToken(token);
  }

  const onOpenUnsubscribe = messaging().onNotificationOpenedApp(
    (remoteMessage) => {
      const notificationData = remoteMessage.data;
      if (notificationData != undefined) {
        const isHandleProactiveLink = Object.hasOwn(notificationData, 'helpshift_proactive_link');
        const doesNotificationDataHaveOrigin =
          notificationData.hasOwnProperty('origin') &&
          notificationData?.origin == 'helpshift';
        if (isHandleProactiveLink) {
          handleProactiveLink(notificationData.helpshift_proactive_link || '', {});
        } else if (doesNotificationDataHaveOrigin) {
          handlePush(remoteMessage?.data || {});
        } else {
          //handle your notification
        }
      }
    }
  );

  const onMessageUnsubscribe = messaging().onMessage(async (remoteMessage) => {
    const notificationData = remoteMessage.data;
    if (notificationData != undefined) {
      const isHandleProactiveLink = notificationData != undefined && Object.hasOwn(notificationData, 'helpshift_proactive_link');
      const doesNotificationDataHaveOrigin =
        notificationData.hasOwnProperty('origin') &&
        notificationData?.origin == 'helpshift';
      if (isHandleProactiveLink) {
        proactiveAlert(notificationData.helpshift_proactive_link || '');
      } else if (doesNotificationDataHaveOrigin) {
        handlePush(remoteMessage?.data || {});
      } else {
        //handle your notification
      }
    }
  });

  return [onMessageUnsubscribe, onOpenUnsubscribe];
};

const proactiveAlert = (data: string) =>
  Alert.alert('Helpshift Notify', 'Proactive alert', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'OK', onPress: () => handleProactiveLink(data, {}) },
  ]);


export const notificationListeneriOS = () => {
  Notifications.registerRemoteNotifications();

  Notifications.events().registerRemoteNotificationsRegistered(
    (event: Registered) => {
      registerPushToken(event.deviceToken);
    }
  );

  Notifications.events().registerRemoteNotificationsRegistrationFailed(
    (event: RegistrationError) => {
      console.error(event);
    }
  );

  Notifications.events().registerNotificationReceivedForeground(
    (notification: Notification, completion) => {
      const notificationData = notification.payload;
      console.log('registerNotificationReceivedForeground');

      const doesNotificationDataHaveProactiveLink =
        notificationData.hasOwnProperty('helpshift_proactive_link');
      const doesNotificationDataHaveOrigin =
        notificationData.hasOwnProperty('origin') &&
        notificationData?.origin == 'helpshift';

      if (doesNotificationDataHaveProactiveLink) {
        console.log('helpshift_proactive_link push notification receive');
        completion({ alert: true, sound: false, badge: false });
      } else if (doesNotificationDataHaveOrigin) {
        console.log('doesNotificationDataHaveOrigin');

        handlePush(notificationData, false);
        completion({ alert: false, sound: false, badge: false });
      } else {
        completion({ alert: true, sound: true, badge: false });
      }
    }
  );

  Notifications.events().registerNotificationOpened(
    (notification: Notification, completion: () => void) => {
      console.log('Notification opened', JSON.stringify(notification.payload));

      const notificationData = notification.payload;
      console.log(
        'registerNotificationOpened: registerNotificationReceivedBackground',
        notificationData,
      );
      const doesNotificationDataHaveProactiveLink =
        notificationData.hasOwnProperty('helpshift_proactive_link');
      const doesNotificationDataHaveOrigin =
        notificationData.hasOwnProperty('origin') &&
        notificationData?.origin == 'helpshift';

      if (doesNotificationDataHaveProactiveLink) {
        handleProactiveLink(notificationData.helpshift_proactive_link, {
          proactive: 1,
          link: 2,
        });
      } else if (doesNotificationDataHaveOrigin) {
        handlePush(notificationData);
      } else {
        console.log('registerNotificationOpened: customer-app notification');
      }
      completion();
    }
  );

  Notifications.getInitialNotification()
    .then((notification) => {
      if (!notification) return;

      const notificationData = notification.payload;
      console.log(
        'getInitialNotification called',
        notificationData
      );
      const doesNotificationDataHaveProactiveLink =
        notificationData.hasOwnProperty('helpshift_proactive_link');
      const doesNotificationDataHaveOrigin =
        notificationData.hasOwnProperty('origin') &&
        notificationData?.origin == 'helpshift';

      if (doesNotificationDataHaveProactiveLink) {
        handleProactiveLink(notificationData.helpshift_proactive_link, {
          proactive: 1,
          link: 2,
        });
      } else if (doesNotificationDataHaveOrigin) {
        handlePush(notificationData, true);
      } else {
        console.log('getInitialNotification: customer-app notification');
      }
    })
    .catch((err) => console.error('getInitialNotifiation() failed', err));
};
