import React, { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native";
import GcashBody from "./GrabPayBody";
import GcashFooter from "./GrabPayFooter";
import GcashHeader from "./GrabPayHeader";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style";
import { ScrollView, RefreshControl } from "react-native";
import { action_refresh } from "../../../Services/Actions/DefaultsActions";
import GrabPayBody from "./GrabPayBody";
import GrabPayFooter from "./GrabPayFooter";
import GrabPayHeader from "./GrabPayHeader";
const GrabPayPaymentUI = () => {
  const appointment_message = useSelector(
    (state) => state.PaymentReducers.appointment_message
  );
  const selected_log= useSelector((state) => state.MenuReducers.selected_log);
  const users_reducers = useSelector((state) => state.DefaultReducers.userinfo);
  const refresh_payment = useSelector(
    (state) => state.DefaultReducers.refresh_payment
  );

  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const onRefresh = React.useCallback(() => {

    dispatch(action_refresh(true));
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const refresh_payments = () => {
      if (mounted) {
        if (refresh_payment) {
          dispatch(action_refresh(false));
        }
      }
    };
    mounted && refresh_payments();
  }, [dispatch, refresh_payment]);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresh_payment} onRefresh={onRefresh} />
      }
    >
      <GrabPayHeader
        request_code={selected_log[0]?.orderno}
        requested_on={appointment_message?.data[0]?.requested_at}
        requestor_name={`${users_reducers[0]?.first_name} ${users_reducers[0]?.middle_name} ${users_reducers[0]?.last_name} `}
        consultation_cost={selected_log[0]?.totalcost}
      />
      <GrabPayFooter />
      <GrabPayBody
        name={`${users_reducers[0]?.first_name} ${users_reducers[0]?.middle_name} ${users_reducers[0]?.last_name} `}
        line1=""
        line2=""
        mobile={users_reducers[0]?.mobile_no}
        email={users_reducers[0]?.email}
        state=""
        postal=""
        city=""
        country={"PH"}
      />
    </ScrollView>
  );
};
export default GrabPayPaymentUI;
