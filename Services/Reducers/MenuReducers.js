import {
  GET_MENU,
  SET_SEARCHMOREMENU,
  SET_CATEGORY,
  GET_CATEGORY,
  SET_QUANTITY,
  ADD_TO_CART,
  SET_MODIFIED_QUANTITY,
  REMOVE_MENU,
  SET_QR_USER,
  GET_LOG_MAST,
  GET_LOG_DETAILS,
  SELECTED_LOG,
  SET_REFRESH,
  SET_REFRESH_MENU,
  SET_SUBTOTAL,
  ONSCROLL,
} from '../Types/MenuTypes';

const menudetails = {
  listofmenu: {data: [], success: false},
  listofcategory: {data: [], success: false},
  search: '',
  category: 0,
  quantity: 1,
  cart: [],
  modifiedquantity: 0,
  remove: {removed: false, id: ''},
  user_qr: {qrbase64: '', orderno: '', loaded: false},
  logmaster: {data: [], loaded: false},
  logdetails: {data: [], message: '', loaded: false},
  selected_log: '',
  refresh: false,
  refreshmenu: false,
  setsubtotal: 0,
  scroll: true,
};
const MenuReducers = (data_state = menudetails, actions) => {
  switch (actions.type) {
    case SET_SUBTOTAL:
      return {...data_state, setsubtotal: actions.payload};
    case SET_REFRESH_MENU:
      return {...data_state, refreshmenu: actions.payload};
    case SET_REFRESH:
      return {...data_state, refresh: actions.payload};
    case SELECTED_LOG:
      return {...data_state, selected_log: actions.payload};
    case GET_LOG_MAST:
      return {...data_state, logmaster: actions.payload};
    case GET_LOG_DETAILS:
      return {...data_state, logdetails: actions.payload};
    case SET_QR_USER:
      return {...data_state, user_qr: actions.payload};
    case REMOVE_MENU:
      return {...data_state, remove: actions.payload};
    case SET_MODIFIED_QUANTITY:
      return {...data_state, modifiedquantity: actions.payload};
    case SET_QUANTITY:
      return {...data_state, quantity: actions.payload};

    case GET_MENU:
      return {...data_state, listofmenu: actions.payload};

    case SET_SEARCHMOREMENU:
      return {...data_state, search: actions.payload};

    case SET_CATEGORY:
      return {...data_state, category: actions.payload};

    case GET_CATEGORY:
      return {...data_state, listofcategory: actions.payload};

    case ADD_TO_CART:
      return {...data_state, cart: actions.payload};
    case ONSCROLL:
      return {...data_state, scroll: actions.payload};

    default:
      return data_state;
  }
};
export default MenuReducers;
