import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from '@microsoft/signalr';
import {
  BASE_URL,
  SIGNALR_CONNECT,
  SIGNALR_CONNECT_NOTIFY,
  SET_OPEN_BOTTOMSHEET,
  SELECTED_MENU,
  SET_OPEN_BOTTOMSHEET_QUANTITY,
  SET_DATA_USERS,
  SET_OPEN_BOTTOMSHEET_DETAILS,
  APP_LOADED,
  SET_NOTIFICATION,
  REFRESH_PAYMENT,
  REQUEST_CALLBACK
} from '../Types/DefaultTypes';
export const action_set_device_token =
  (user_id, token, phone_model) => async (dispatch) => {
   console.log(user_id)
    var url = `${BASE_URL}/api/default/insertFCMToken`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        token: token,
        phone_model: phone_model,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        dispatch({
          type: REQUEST_CALLBACK,
          payload: { message: res.message, success: res.success },
        });
      });
  };
export const signalr_connection = () => async dispatch => {
  const hubConnect = new HubConnectionBuilder()
    .withUrl(`${BASE_URL}/api/notif/notify`)
    .build();
  hubConnect.start();
  dispatch({type: SIGNALR_CONNECT_NOTIFY, payload: hubConnect});
};

export const signalr_notify_connection = () => async dispatch => {
  const hubConnect = new HubConnectionBuilder()
    .withUrl(`${BASE_URL}/api/notif/notify`, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })

    .build();
  hubConnect.start();
  dispatch({type: SIGNALR_CONNECT_NOTIFY, payload: hubConnect});
};
export const action_set_notification =
  (title, body, to, type) => async dispatch => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: {title: title, body: body, to: to, type: type},
    });
  };
export const action_GET_userdetails = username => async dispatch => {
  var url = `${BASE_URL}/api/user/getUserInfo`;
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
    .then(res => {
      console.log(res)
      dispatch({
        type: SET_DATA_USERS,
        payload: res.data,
      });
      console.log(res);
    });
};
export const action_notify_signal = data => async () => {
  var url = `${BASE_URL}/api/clientnotification`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Notification: data.notification,
      from: data.from,
      to: data.to,
      type: data.type,
    }),
  })
    .then(response => response.json())
    .then(res => {
      console.log(res);
    });
};
export const action_open_bottomsheet = open => async dispatch => {
  dispatch({type: SET_OPEN_BOTTOMSHEET, payload: open});
};
export const action_open_bottomsheet_quantity = open => async dispatch => {
  dispatch({type: SET_OPEN_BOTTOMSHEET_QUANTITY, payload: open});
};
export const action_open_bottomsheet_details = open => async dispatch => {
  dispatch({type: SET_OPEN_BOTTOMSHEET_DETAILS, payload: open});
};
export const action_app_loaded = loaded => async dispatch => {
  dispatch({type: APP_LOADED, payload: loaded});
};
export const action_selected_menu =
  (id, name, price, desc) => async dispatch => {
    dispatch({
      type: SELECTED_MENU,
      payload: {id: id, name: name, price: price, desc: desc},
    });
  };
  export const action_refresh = refreshed => async dispatch => {
  dispatch({type: REFRESH_PAYMENT, payload: refreshed});
};