import {SET_DATA, SETUSERNAME} from '../Types/LoginType';

const pages = {
  data: [],
  username: "",
  loading: false,
};
const Login_Reducer = (data_state = pages, actions) => {
  switch (actions.type) {
    case SET_DATA:
      return {...data_state, data: actions.payload};
    case SETUSERNAME:
      return {...data_state, username: actions.payload};
    default:
      return data_state;
  }
};
export default Login_Reducer;
