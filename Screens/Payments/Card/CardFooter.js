import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-native-elements";
import { Linking, View } from "react-native";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  createsource,
  createpayment,
  retrieve_source,
  create_payment,
  updateToChargeable,
  createCardPaymentIntent,
  create_card_payment_method,
  attach_payment_intent,
  retrieve_intent_paymaya,
  updatetopaid_Card,
} from "../../../Services/Actions/PaymentsActions";
import { action_selected_log } from "../../../Services/Actions/MenuActions";
const CardFooter = () => {
  const dispatch = useDispatch();
  const [billingaddress, setbillinaddress] = useState([]);
  const [billingredirect, setbillingredirect] = useState([]);
  const [constult_pk, setconstult_pk] = useState("");
  const [billingtype, setbillingtype] = useState([]);
  const [billingdata, setbillingdata] = useState([]);
  const [billingcurrency, setbillingcurrency] = useState("");
  const [billingamount, setbillingamount] = useState(0);
  const [billingdescription, setbillingdescription] = useState("");
  const [PayDisabled, setPayDisabled] = useState(false);
  const [paymentmethodallowed, setpaymentmethodallowed] = useState([]);
  const [paymentmethodoptions, setpaymentmethodoptions] = useState([]);
  const [CancelDisabled, setCancelDisabled] = useState(false);
  const [PayEffect, setPayEffect] = useState(false);
  const [DonePayEffect, setDonePayEffect] = useState(0);
  const [billingstatement_descriptor, setbillingstatement_descriptor] =
    useState("");
  const appointment_message = useSelector(
    (state) => state.PaymentReducers.appointment_message
  );
  const selected_log = useSelector((state) => state.MenuReducers.selected_log);
  const users_reducers = useSelector((state) => state.DefaultReducers.userinfo);
  const refresh_payment = useSelector(
    (state) => state.DefaultReducers.refresh_payment
  );
  const sourcedata = useSelector((state) => state.PaymentReducers.sourcedata);
  const payment_intent_callback = useSelector(
    (state) => state.PaymentReducers.payment_intent_callback
  );
  const payment_method_callback = useSelector(
    (state) => state.PaymentReducers.payment_method_callback
  );
  const card_body = useSelector((state) => state.PaymentReducers.card_body);
  const cards = useSelector((state) => state.PaymentReducers);
  const card_header = useSelector((state) => state.PaymentReducers.card_header);
  const retrievesource = useSelector(
    (state) => state.PaymentReducers.retrievesource
  );

  useEffect(() => {
    let mounted = true;
    const paysource = () => {
      if (mounted) {
        if (PayEffect) {
          dispatch(
            createCardPaymentIntent(
              selected_log[0]?.orderno,
              billingtype,
              billingcurrency,
              billingamount,
              paymentmethodallowed,
              paymentmethodoptions,
              billingdescription,
              billingstatement_descriptor,
              billingaddress,
              billingredirect
            )
          );
          setPayEffect(false);
        }
      }
    };
    mounted && paysource();
    return () => {
      mounted = false;
    };
  }, [
    PayEffect,
    selected_log[0]?.orderno,
    billingtype,
    billingcurrency,
    paymentmethodallowed,
    paymentmethodoptions,
    billingamount,
    billingdescription,
    billingstatement_descriptor,
    billingaddress,
    billingredirect,
  ]);
  useEffect(() => {
    let mounted = true;
    const paymentmethod = async () => {
      if (mounted) {
        if (payment_intent_callback !== undefined) {
          dispatch(
            create_card_payment_method("card", billingdata, billingaddress)
          );
        }
      }
    };
    mounted && paymentmethod();
    return () => {
      mounted = false;
    };
  }, [dispatch, payment_intent_callback]);
  useEffect(() => {
    let mounted = true;
    const paymentattch = () => {
      if (mounted) {
        if (payment_method_callback !== undefined) {
          dispatch(
            attach_payment_intent(
              payment_intent_callback?.data?.id,
              payment_method_callback?.id,
              payment_intent_callback?.data?.attributes?.client_key,
              "https://opd.perpetualsuccourcebu.com/payment-feedback/success"
            )
          );
        }
      }
    };
    mounted && paymentattch();
    return () => {
      mounted = false;
    };
  }, [dispatch, payment_method_callback]);

  const handlePay = useCallback(async () => {
    await setconstult_pk(selected_log[0]?.orderno);
    await setbillingtype("card");
    await setbillingamount(100000);
    await setbillingcurrency("PHP");
    await setbillingdescription("EatWell Payment");
    await setbillingstatement_descriptor("EatWell Payment");
    await setpaymentmethodallowed(["card", "paymaya"]);
    await setpaymentmethodoptions({ card: { request_three_d_secure: "any" } });
    await setbillingdata({
      card_number: card_header?.card_number.replace(/ /g, ""),
      exp_month: card_header?.exp_month,
      exp_year: card_header?.exp_year,
      cvc: card_header?.cvc,
    });
    await setbillinaddress({
      address: {
        line1: card_body?.line1,
        state: card_body?.state,
        postal_code: card_body?.postal,
        city: card_body?.city,
        country: card_body?.country,
        line2: card_body?.line2,
      },
      name: card_body?.name,
      phone: card_body?.mobile,
      email: card_body?.email,
    });
    await setbillingredirect({
      success: "https://opd.perpetualsuccourcebu.com/payment-feedback/success",
      failed: "https://opd.perpetualsuccourcebu.com/payment-feedback/failed",
      checkout_url:
        "https://opd.perpetualsuccourcebu.com/payment-feedback/success",
    });
    setPayEffect(true);
  }, [
    dispatch,
    card_header,
    card_body,
    users_reducers,
    selected_log[0]?.orderno,
    selected_log[0]?.totalcost,
  ]);

  const handleDonePayment = useCallback(async () => {
    dispatch(
      updatetopaid_Card(
        selected_log[0]?.paymongo_src_id,
        selected_log[0]?.orderno
      )
    );
  }, [dispatch, selected_log[0]?.orderno, selected_log[0]?.paymongo_src_id]);
  const handleCancel = () => {};

  useEffect(() => {
    let mounted = true;
    const pay = () => {
      if (mounted) {
        dispatch(action_selected_log(selected_log[0]?.orderno));
        dispatch(retrieve_intent_paymaya(selected_log[0]?.paymongo_src_id));
      }
    };
    mounted && pay();
    return () => {
      mounted = false;
    };
  }, [dispatch, refresh_payment, selected_log]);

  // useEffect(() => {
  //   let mounted = true;
  //   const pay = () => {
  //     if (mounted) {
  //       if (
  //         retrievesource?.status === undefined ||
  //         retrievesource?.status !== "chargeable" ||
  //         retrievesource?.status !== "paid"
  //       ) {
  //         dispatch(
  //           createsource(
  //             constult_pk,
  //             billingtype,
  //             billingcurrency,
  //             billingamount,
  //             billingdescription,
  //             billingstatement_descriptor,
  //             billingaddress,
  //             billingredirect
  //           )
  //         );
  //       }
  //     }
  //   };
  //   mounted && pay();
  //   return () => {
  //     mounted = false;
  //   };
  // }, [dispatch, PayEffect, retrievesource?.source, retrievesource?.status]);

  useEffect(() => {
    let mounted = true;
    const donepay = () => {
      if (mounted) {
        if (appointment_message?.data[0]?.sts_desc === "for approval") {
          setPayDisabled(true);
          alert(
            "Your request is being processed please wait for admins approval"
          );
        } else if (appointment_message?.data[0]?.sts_desc === "paid") {
          setPayDisabled(true);
          setCancelDisabled(true);
        } else if (appointment_message?.data[0]?.sts_desc === "approved") {
          setPayDisabled(false);
        }
      }
    };
    mounted && donepay();
    return () => {
      mounted = false;
    };
  }, [appointment_message?.data[0]?.sts_desc]);

  return (
    <View
      style={[
        styles.mainContainer,
        {
          flexDirection: "row",
        },
      ]}
    >
      {retrievesource?.source?.attributes?.status === "succeeded" ? (
        selected_log[0]?.payment_status === "Paid" ? null : (
          <View style={{ flex: 2 }}>
            <Button
              onPress={() => handleDonePayment()}
              buttonStyle={styles.btnpay}
              title="Finish Payment"
            />
          </View>
        )
      ) : CancelDisabled ? null : (
        <>
          <View style={{ flex: 2 }}>
            <Button
              disabled={CancelDisabled}
              onPress={() => handleCancel()}
              buttonStyle={styles.btncancel}
              title="Cancel"
            />
          </View>
          <View style={{ flex: 2 }}>
            <Button
              disabled={PayDisabled}
              onPress={() => handlePay()}
              buttonStyle={styles.btnpay}
              title="Pay Via Card"
            />
          </View>
        </>
      )}
    </View>
  );
};

export default CardFooter;
