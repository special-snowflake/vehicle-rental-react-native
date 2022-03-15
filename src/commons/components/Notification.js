import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

class Notification {
  configure = () => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      //   requestPermissions: true,
      requestPermissions: Platform.OS === 'ios',
    });
  };
  createChannel = channel => {
    PushNotification.createChannel(
      {
        channelId: channel,
        channelName: 'Vehicle Rental',
        channelDescription: 'A channel to categorise your notifications',
        playSound: false,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  };
  sendNotification = (channel, title, message) => {
    PushNotification.localNotification({
      channelId: channel,
      title: title,
      message: message,
    });
  };

  sendScheduledNotification = (channel, title, message, time = 5) => {
    PushNotification.localNotificationSchedule({
      channelId: channel,
      message: message,
      date: new Date(Date.now() + time * 1000),
      title: title,
    });
  };
}

export const notification = new Notification();
