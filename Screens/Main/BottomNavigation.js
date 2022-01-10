import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import Navigations from './Navigations';
import {
  action_GET_userdetails,
  action_set_device_token,
  action_set_notification,
} from '../../Services/Actions/DefaultsActions';
import {Actions} from 'react-native-router-flux';
import {
  signalr_connection,
  signalr_notify_connection,
  action_app_loaded,
} from '../../Services/Actions/DefaultsActions';
import {useSelector, useDispatch} from 'react-redux';
import {BackgroundImage} from 'react-native-elements/dist/config';
import messaging from "@react-native-firebase/messaging";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance } from "react-native-push-notification";
import DeviceInfo from "react-native-device-info";
import notif_icon from "../../assets/icons/spoon.png";
const BottomNavigation = () => {
  const dispatch = useDispatch();
  const hubconnectnotify = useSelector(
    state => state.DefaultReducers.hubconnectnotify,
  );
  const [fcmtoken, setfcmtoken] = React.useState("");
  const [getdeviceid, setdeviceid] = React.useState("");
  const users_reducers = useSelector(state => state.DefaultReducers.userinfo);
  const [notify, setnotify] = useState([]);
  const [username, setusername] = useState();
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("fcmToken");
    }
  };
  // useEffect(() => {
  //   let mounted = true;
  //   const createHubConnection = () => {
  //     if (mounted) {
  //       try {
  //         hubconnectnotify.on('notifytoreact', async data => {
  //           if (
  //             data?.from === 'Cashier' &&
  //             data?.username === users_reducers[0]?.username
  //           ) {
  //             await setnotify({
  //               Notification: data?.Notification,
  //               from: data?.from,
  //               type: data?.type,
  //               to: data?.to,
  //             });
  //             dispatch(
  //               action_set_notification(
  //                 data?.notification,
  //                 data?.from,
  //                 data?.type,
  //                 data?.to,
  //               ),
  //             );
  //           }
  //           console.log(data);
  //         });
  //       } catch (err) {
  //         // alert(err);
  //         // console.log(err);
  //         console.log(
  //           'Error while establishing connection NotifyReact: ' +
  //             JSON.stringify({err}),
  //         );
  //       }
  //     }
  //   };
  //   mounted && createHubConnection();
  //   return () => {
  //     mounted = false;
  //   };
  // }, [dispatch]);
  AsyncStorage.getItem('cashier_tokenizer').then(item => {
    let mounted = true;
    const gettoken = () => {
      if (mounted) {
        if (item == null) {
          Actions.home();
        }
      }
    };
    mounted && gettoken();
    return () => {
      mounted = true;
    };
  });
  // AsyncStorage.getItem('cashier_username').then(item => {
  //   let mounted = true;
  //   const gettoken = () => {
  //     if (mounted) {
  //       setusername(item);
  //     }
  //   };
  //   mounted && gettoken();
  //   return () => {
  //     mounted = true;
  //   };
  // });

  useEffect(() => {
    let mounted = true;
    const getdefaults = async () => {
      if (mounted) {
        let user = await (
          await AsyncStorage.getItem("cashier_username")
        ).replace(/['"]+/g, "");

        if (user !== " ") {
          dispatch(action_GET_userdetails(user));
          dispatch(action_app_loaded(true));
     
        }
        dispatch(action_app_loaded(false));
        checkToken();
      }
    };
    mounted && getdefaults();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: "eatwell_client", // (required)
        channelName: "Eatwell_Client", // (required)
        // channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.configure({
      onRegister: function (token) {
        setdeviceid(DeviceInfo.getDeviceId());
        setfcmtoken(token);
      },
      onNotification: function (notification) {
        if (notification.foreground) {
          PushNotification.localNotification({
            channelId: "eatwell_client",
            title: notification.title,
            message: notification.message,
            priority: "high",
            ignoreInForeground: false,
            visibility: "public",
            largeIcon: notif_icon,
            showWhen: true,
            allowWhileIdle: true,
          });
        }

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        // console.log("ACTION:", notification.action);
        // console.log("NOTIFICATION:", notification);
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
      requestPermissions: true,
    });
  }, []);
  useEffect(() => {
    let mounted = true;
    const insertdevicetoken = () => {
      if (mounted) {
        if (
          users_reducers[0]?.username !== "" &&
          fcmtoken?.token !== undefined
        ) {
          dispatch(
            action_set_device_token(
              users_reducers[0]?.username,
              fcmtoken?.token,
              getdeviceid
            )
          );
          PushNotification.getChannels(function (channel_ids) {
            console.log(channel_ids); // ['channel_id_1']
          });
        }
      }
    };

    mounted && insertdevicetoken();
    return () => {
      mounted = false;
    };
  }, [dispatch, users_reducers[0]?.username, fcmtoken?.token, getdeviceid]);


  return <Navigations />;
};
export default BottomNavigation;
