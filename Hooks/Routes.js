import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import Login from '../Screens/Login/LoginScreen';
import MainDetails from '../Screens/CustomerLogs/MainDetails';
import OrderDetails from '../Screens/OrderDetails/OrderDetails';
import BottomNavigation from '../Screens/Main/BottomNavigation';
import SignUp from '../Screens/SignUp/SignUp';
import MainPayment from '../Screens/Payments/MainPayment';
import GcashPaymentUI from '../Screens/Payments/Gcash/GcashPaymentUI'
import GrabPayPaymentUI from '../Screens/Payments/GrabPay/GrabPayPaymentUI'
import PayMayaPaymentUI from '../Screens/Payments/PayMaya/PayMayaPaymentUI'
import CardPaymentUI from '../Screens/Payments/Card/MainCardUI'
import {useDispatch, useSelector} from 'react-redux';
const Routes = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="home" component={Login} title="Login" hideNavBar={true} />
        <Scene key="index" component={BottomNavigation} hideNavBar={true} initial  />
        <Scene
          key="logdetails"
          title="Log Details"
          component={MainDetails}
          back={true}
        />
        <Scene
          key="payment"
          title="Payment Method"
          component={MainPayment}
          back={true}
        />
                <Scene
          key="gcashpayment"
          component={GcashPaymentUI}
          title="Payment"
          headerTintColor="#0084FF"
        />
        <Scene
          key="grabpayment"
          component={GrabPayPaymentUI}
          title="Payment"
          headerTintColor="#0084FF"
        />
        <Scene
          key="paymayapayment"
          component={PayMayaPaymentUI}
          title="Payment"
          headerTintColor="#0084FF"
        />
      
        <Scene
          key="cardpayment"
          component={CardPaymentUI}
          title="Card Payment"
          headerTintColor="#0084FF"
        />
        <Scene
          key="orderdetails"
          title="Order Summary"
          component={OrderDetails}
        />
        <Scene key="signup" component={SignUp} hideNavBar={true} />
      </Stack>
    </Router>
  );
};
export default Routes;
