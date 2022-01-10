import {
  SET_REGION,
  SET_BARANGAY,
  SET_CITY,
  SET_NATIONALITY,
  SET_PROVINCE,
  SET_CIVIL_STATUS,
  SET_RELIGION,
  SET_PROCEDURE,
  BASE_URL,
  REMOTE_URL,
  SIGNALR_CONNECT,
  SET_REFRESHING,
  SET_OFFSET,
  GET_NOTIF,
  GET_DEVICE,
  GET_NOTIFICATION_LIST,
  SET_OPEN_BOTTOMSHEET,
  APP_NAME,
  SET_NOTIFICATION_OFFSET,
  REGISTRATION_COMPLETE,
  SPINNER_ALERT,
  SET_DATA_USERS,
  SELECTED_MENU,
  SET_OPEN_BOTTOMSHEET_QUANTITY,
  SET_OPEN_BOTTOMSHEET_DETAILS,
  SIGNALR_CONNECT_NOTIFY,
  APP_LOADED,
  SET_NOTIFICATION,
  REFRESH_PAYMENT,
  REQUEST_CALLBACK
} from '../Types/DefaultTypes';

const defult_values = {
  app_name: 'Premiere',
  region: [],
  barangay: [],
  city: [],
  nationality: [],
  provinces: [],
  civil_status: [],
  religion: [],
  procedures: [],
  base_url: BASE_URL,
  remote_url: BASE_URL,
  loading: false,
  hubconnect: '',
  hubconnect_notify: '',
  refresh: false,
  offset: 0,
  notification: {title: '', body: '', to: '', type: ''},
  notificationlist: {data: [], loading: false},
  device: '',
  bottomSheet: false,
  bottomSheetquantity: false,
  bottomSheetdetails: false,
  notifoffset: 0,
  registrationcomplete: {message: '', success: false},
  spinneralert: false,
  userinfo: [],
  selected_menu: {id: '', name: '', price: 0, qty: 0, desc: ''},
  notificationdtls: {title: '', body: '', to: '', type: ''},
  hubconnectnotify: '',
  apploaded: false,
  refresh_payment: false,
  request_callback:{message:"",success:false},
};
const DefaultReducer = (data_state = defult_values, actions) => {
  switch (actions.type) {
    case REQUEST_CALLBACK:
      return { ...data_state, request_callback: actions.payload };
    case REFRESH_PAYMENT:
      return {...data_state, refresh_payment: actions.payload};
    case SET_NOTIFICATION:
      return {...data_state, notificationdtls: actions.payload};
    case APP_LOADED:
      return {...data_state, apploaded: actions.payload};
    case SET_OPEN_BOTTOMSHEET_DETAILS:
      return {...data_state, bottomSheetdetails: actions.payload};
    case SET_OPEN_BOTTOMSHEET_QUANTITY:
      return {...data_state, bottomSheetquantity: actions.payload};
    case SELECTED_MENU:
      return {...data_state, selected_menu: actions.payload};
    case SET_DATA_USERS:
      return {...data_state, userinfo: actions.payload};
    case SPINNER_ALERT:
      return {...data_state, spinneralert: actions.payload};
    case REGISTRATION_COMPLETE:
      return {...data_state, registrationcomplete: actions.payload};
    case SET_NOTIFICATION_OFFSET:
      return {...data_state, notifoffset: actions.payload};
    case APP_NAME:
      return {...data_state, app_name: actions.payload};
    case SET_REGION:
      return {...data_state, region: actions.payload};
    case SET_BARANGAY:
      return {...data_state, barangay: actions.payload};
    case SET_CITY:
      return {...data_state, city: actions.payload};
    case SET_PROVINCE:
      return {...data_state, provinces: actions.payload};
    case SET_NATIONALITY:
      return {...data_state, nationality: actions.payload};
    case SET_CIVIL_STATUS:
      return {...data_state, civil_status: actions.payload};
    case SET_RELIGION:
      return {...data_state, religion: actions.payload};
    case BASE_URL:
      return {...data_state, base_url: actions.payload};
    case REMOTE_URL:
      return {...data_state, remote_url: actions.payload};
    case SIGNALR_CONNECT:
      return {...data_state, hubconnect: actions.payload};
    case SET_REFRESHING:
      return {...data_state, refresh: actions.payload};
    case SET_OFFSET:
      return {...data_state, offset: actions.payload};
    case GET_NOTIF:
      return {...data_state, notification: actions.payload};
    case GET_DEVICE:
      return {...data_state, device: actions.payload};
    case GET_NOTIFICATION_LIST:
      return {...data_state, notificationlist: actions.payload};
    case SET_OPEN_BOTTOMSHEET:
      return {...data_state, bottomSheet: actions.payload};
    case SIGNALR_CONNECT_NOTIFY:
      return {...data_state, hubconnectnotify: actions.payload};
    default:
      return data_state;
  }
};
export default DefaultReducer;
