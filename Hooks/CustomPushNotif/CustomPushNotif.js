// import * as Notifications from 'expo-notifications';
// import React, {useState, useEffect, useRef} from 'react';
// import {Text, View, Button, Platform} from 'react-native';
// import Constants from 'expo-constants';
// import {useSelector} from 'react-redux';
// const CustomPushNotif = () => {
//   const notificationdtls = useSelector(
//     state => state.DefaultReducers.notificationdtls,
//   );
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();
//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener(notification => {
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener(response => {
//         console.log(response);
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener);
//       Notifications.removeNotificationSubscription(responseListener);
//     };
//   }, []);
//   useEffect(() => {
//     let mounted = true;
//     const triggernotif = () => {
//       if (mounted) {
//         if (notificationdtls?.title !== '' || notificationdtls?.type !== '') {
//           Notifications.setNotificationHandler({
//             handleNotification: () => ({
//               shouldShowAlert: true,
//               shouldPlaySound: true,
//               shouldSetBadge: true,
//             }),
//           });
//           schedulePushNotification(
//             notificationdtls?.title,
//             notificationdtls?.type,
//           );
//         }
//       }
//     };
//     mounted && triggernotif();
//     return () => {
//       mounted = false;
//     };
//   }, [notificationdtls?.title, notificationdtls?.body]);
//   console.log(notificationdtls);
//   return <></>;
// };
// const schedulePushNotification = (notfititle, notifbody) => {
//   Notifications.scheduleNotificationAsync({
//     content: {
//       title: notfititle,
//       body: notifbody,
//     },
//     trigger: {seconds: 1},
//   });
// };

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const {status: existingStatus} = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const {status} = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }
//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.HIGH,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }

// export default CustomPushNotif;
