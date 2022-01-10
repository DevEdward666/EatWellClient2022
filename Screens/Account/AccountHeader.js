import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements';
import {View, Image, Text} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
const AccountHeader = () => {
  const users_reducers = useSelector(state => state.DefaultReducers.userinfo);
  return (
    <Card containerStyle={styles.userplate}>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            padding: 20,
          }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 13,
              fontFamily: 'SFUIDisplay-Light',
            }}>
            Name: {users_reducers[0]?.fullname}
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 13,
              fontFamily: 'SFUIDisplay-Light',
            }}>
            Username: {users_reducers[0]?.username}
          </Text>
        </View>
      </View>
    </Card>
  );
};
export default AccountHeader;
