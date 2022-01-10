import React, {useEffect, useCallback, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
} from 'react-native';
import ListOfLogs from './ListOfLogs';
import {
  action_get_getLogsMast,
  action_get_getLogsDetails,
} from '../../Services/Actions/MenuActions';
import {useDispatch, useSelector} from 'react-redux';
const OrderLogs = () => {
  const users_reducers = useSelector(state => state.DefaultReducers.userinfo);
  const refresh = useSelector(state => state.MenuReducers.refresh);
  const notificationdtls = useSelector(
    state => state.DefaultReducers.notificationdtls,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const loadlog = () => {
      if (mounted) {
        dispatch(action_get_getLogsMast(users_reducers[0]?.username));
      }
      //   dispatch(action_get_getLogsDetails(users_reducers?.username));
    };
    mounted && loadlog();
    return () => {
      mounted = false;
    };
  }, [dispatch, users_reducers, refresh, notificationdtls]);

  return (
    <SafeAreaView>
      <ListOfLogs />
    </SafeAreaView>
  );
};
export default OrderLogs;
