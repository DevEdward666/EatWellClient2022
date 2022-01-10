import {SET_DATA, SET_USERNAME} from '../Types/SignUpTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import {
  BASE_URL,
  REGISTRATION_COMPLETE,
  SPINNER_ALERT,
} from '../Types/DefaultTypes';
import {Platform} from 'react-native';

export const action_GET_usernameExist = username => async dispatch => {
  var url = `${BASE_URL}/api/user/getUsernameExist`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then(response => response.json())
    .then(async res => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_USERNAME,
          payload: res.data,
        });
      }
    });
};

export const action_SignUp_user =
  (firstname, middlename, lastname, mobileno, email, username, password) =>
  async dispatch => {
    const mobile = mobileno.split('+').join('');
    const value = await AsyncStorage.getItem('tokenizer');
    var url = `${BASE_URL}/api/user/addnewuser`;
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        mobileno: mobile,
        usertype: 'customer',
        email: email,
        username: username,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(res => {
        AsyncStorage.setItem('username', username);
        if (res.success) {
          // Actions.home();
          dispatch({
            type: SET_DATA,
            payload: {message: res.message, loaded: true},
          });
        } else {
          alert('Something Went Wrong');
        }
        console.log(res.success);
      });
  };
