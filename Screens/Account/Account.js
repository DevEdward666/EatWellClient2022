import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {action_searchmenu} from '../../Services/Actions/MenuActions';
import {Actions} from 'react-native-router-flux';
import AccountHeader from './AccountHeader';
const Account = () => {
  const dispatch = useDispatch();
  const [search, setsearch] = useState('');
  const removeValue = async () => {
    try {
      await AsyncStorage.getAllKeys().then(
        async KEYS => await AsyncStorage.multiRemove(KEYS),
      );
      await Actions.home();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView>
      <AccountHeader />
      <Button
        onPress={() => removeValue()}
        buttonStyle={{
          marginTop: 20,
          backgroundColor: '#c70e05',
          borderRadius: 10,
          width: '70%',
          alignSelf: 'center',
        }}
        title="Log Out"
      />
    </SafeAreaView>
  );
};
export default Account;
