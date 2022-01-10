import {BASE_URL} from '../Types/DefaultTypes';
import {SETUSERNAME} from '../Types/LoginType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
export const action_Login_user = (username, password) => async dispatch => {
  var url = `${BASE_URL}/api/user/login`;
  const fetchdata = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const parseData = await fetchdata.json();
  dispatch({
    type: SETUSERNAME,
    payload: username,
  });
  if (parseData.success) {
    await AsyncStorage.setItem(
      'cashier_tokenizer',
      parseData.data.access_token,
    );
    await AsyncStorage.setItem('cashier_username', username);
    Actions.index();
  } else {
    var url = `${BASE_URL}/api/user/loginWalkIn`;
    const fetchdata = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const parseData = await fetchdata.json();
    dispatch({
      type: SETUSERNAME,
      payload: username,
    });
    if (parseData.success) {
      await AsyncStorage.setItem(
        'cashier_tokenizer',
        parseData.data.access_token,
      );
      await AsyncStorage.setItem('cashier_username', username);
      Actions.index();
    }
  }
};
