import {SET_DATA, SET_USERNAME} from '../Types/SignUpTypes';

const info = {
  data: {message: '', loaded: false},
  username: [],
  loading: false,
};
const SignUpReducers = (data_state = info, actions) => {
  switch (actions.type) {
    case SET_DATA:
      return {...data_state, data: actions.payload};
    case SET_USERNAME:
      return {...data_state, username: actions.payload};
    default:
      return data_state;
  }
};
export default SignUpReducers;
