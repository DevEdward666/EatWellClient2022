import LoginReducers from './LoginReducers';
import DefaultReducers from './DefaultReducers';
import MenuReducers from './MenuReducers';
import SignUpReducers from './SignUpReducers';
import PaymentReducers from './PaymentReducer';
import {combineReducers} from 'redux';

const RootReducers = combineReducers({
  LoginReducers: LoginReducers,
  DefaultReducers: DefaultReducers,
  MenuReducers: MenuReducers,
  SignUpReducers: SignUpReducers,
  PaymentReducers: PaymentReducers,
});
export default RootReducers;
