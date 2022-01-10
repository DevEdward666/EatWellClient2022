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
} from "../../../Services/Actions/PaymentsActions";
import { action_selected_log } from "../../../Services/Actions/MenuActions";
const GrabPayFooter = () => {
  const dispatch = useDispatch();
  const [billingaddress, setbillinaddress] = useState([]);
  const [billingredirect, setbillingredirect] = useState([]);
  const [constult_pk, setconstult_pk] = useState("");
  const [billingtype, setbillingtype] = useState([]);
  const [billingdata, setbillingdata] = useState([]);
  const [billingcurrency, setbillingcurrency] = useState("");
  const [billingamount, setbillingamount] = useState(0);
  const [billingdescription, setbillingdescription] = useState("");
  const [sourcecreated, setsourcecreated] = useState(false);
  const [PayDisabled, setPayDisabled] = useState(false);
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
  const retrievesource = useSelector(
    (state) => state.PaymentReducers.retrievesource
  );
  useEffect(() => {
    let mounted = true;
    const paysource = () => {
      if (mounted) {
        if (PayEffect) {
          dispatch(
            createsource(
              selected_log[0]?.orderno,
              billingtype,
              billingcurrency,
              billingamount,
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
    billingamount,
    billingdescription,
    billingstatement_descriptor,
    billingaddress,
    billingredirect,
  ]);
  const handlePay = useCallback(async () => {
    await setconstult_pk(selected_log[0]?.orderno);
    await setbillingtype("grab_pay");
    await setbillingamount(100000);
    await setbillingcurrency("PHP");
    await setbillingdescription("EatWell Payment");
    await setbillingstatement_descriptor("EatWell Payment");
    await setbillinaddress({
      address: {
        line1: "",
        state: "",
        postal_code: "",
        city: "",
        country: "PH",
        line2: "",
      },
      name: users_reducers[0]?.fullname,
      phone: users_reducers[0]?.mobile_no,
      email: users_reducers[0]?.email,
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
    users_reducers,
    selected_log[0]?.orderno,
    selected_log[0]?.totalcost,
    billingtype,
    billingcurrency,
    billingaddress,
    billingredirect,
  ]);
  const handleFinishPayment = useCallback(async () => {
    if (retrievesource?.status === "pending") {
      Linking.openURL(retrievesource?.source?.redirect?.checkout_url);
    } else {
      await setconstult_pk(selected_log[0]?.orderno);
      await setbillingtype("grab_pay");
      await setbillingcurrency("PHP");

      await setbillingdescription("EatWell Payment");
      await setbillingstatement_descriptor("EatWell Payment");
      await setbillinaddress({
        address: {
          line1: "",
          state: "",
          postal_code: "",
          city: "",
          country: "PH",
          line2: "",
        },
        name: users_reducers[0]?.fullname,
        phone: users_reducers[0]?.mobile_no,
        email: users_reducers[0]?.email,
      });
      await setbillingredirect({
        success:
          "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success",
        failed:
          "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/failed",
        checkout_url:
          "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success",
      });

      await setbillingdata({
        id: sourcedata?.source,
        attributes: {
          amount: 100000,
          description: "EatWell Payment",
          currency: billingcurrency,
          statement_descriptor: "EatWell Payment",
          type: "source.chargeable",
          data: {
            attributes: {
              source: {
                id: sourcedata?.source,
                type: "grab_pay",
              },
              amount: billingamount,
              bliing: {
                address: {
                  line1: appointment_message?.data[0]?.line1,
                  state: appointment_message?.data[0]?.regiondesc,
                  postal_code: appointment_message?.data[0]?.zipcode,
                  city: appointment_message?.data[0]?.citymundesc,
                  country: "PH",
                  line2: appointment_message?.data[0]?.line2,
                },
                name: `${users_reducers[0]?.first_name} ${users_reducers[0]?.middle_name} ${users_reducers[0]?.last_name} `,
                phone: users_reducers[0]?.mobile_no,
                email: users_reducers[0]?.email,
              },
              type: "grab_pay",
              currency: billingcurrency,
              livemode: false,
              status: "chargeable",
              description: billingdescription,
            },
            type: "source",
          },
        },
      });

      setTimeout(() => {
        dispatch(updateToChargeable(billingdata));
      }, 500);
    }
  }, [
    retrievesource?.source,
    retrievesource?.status,
    sourcedata?.source,
    selected_log[0]?.totalcost,
    selected_log[0]?.orderno,
    users_reducers,
  ]);
  const handleDonePayment = useCallback(async () => {
    await setconstult_pk(selected_log[0]?.orderno);
    await setbillingtype("grab_pay");
    await setbillingcurrency("PHP");

    await setbillingdescription("EatWell Payment");
    await setbillingstatement_descriptor("EatWell Payment");
    await setbillinaddress({
      address: {
        line1: "",
        state: "",
        postal_code: "",
        city: "",
        country: "PH",
        line2: "",
      },
      name: users_reducers[0]?.fullname,
      phone: users_reducers[0]?.mobile_no,
      email: users_reducers[0]?.email,
    });
    await setbillingredirect({
      success:
        "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success",
      failed:
        "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/failed",
      checkout_url:
        "https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success",
    });

    await setbillingdata({
      id: selected_log[0]?.paymongo_src_id,
      attributes: {
        amount: 10000,
        description: "EatWell Payment",
        currency: "PHP",
        statement_descriptor: "EatWell Payment",
        type: "payment.paid",
        data: {
          attributes: {
            source: { id: selected_log[0]?.paymongo_src_id, type: "payment" },
            amount: 10000,
            bliing: {
              address: {
                line1: appointment_message?.data[0]?.line1,
                state: appointment_message?.data[0]?.regiondesc,
                postal_code: appointment_message?.data[0]?.zipcode,
                city: appointment_message?.data[0]?.citymundesc,
                country: "PH",
                line2: appointment_message?.data[0]?.line2,
              },
              name: `${users_reducers[0]?.first_name} ${users_reducers[0]?.middle_name} ${users_reducers[0]?.last_name} `,
              phone: users_reducers[0]?.mobile_no,
              email: users_reducers[0]?.email,
            },
            type: "grab_pay",
            currency: "PHP",
            livemode: false,
            status: "paid",
            description: "EatWell Payment",
          },
          type: "source",
        },
      },
    });
    setTimeout(() => {
      dispatch(createpayment(billingdata));
    }, 500);
  }, [
    dispatch,
    selected_log[0]?.orderno,
    users_reducers[0]?.mobile_no,
    users_reducers[0]?.email,
    users_reducers[0]?.first_name,
    users_reducers[0]?.middle_name,
    users_reducers[0]?.last_name,
    appointment_message,
    billingtype,
    billingcurrency,
    billingamount,
    billingdescription,
    billingstatement_descriptor,
    billingaddress,
    billingredirect,
    billingdata,
    sourcedata?.source,
    selected_log[0]?.paymongo_src_id,
    selected_log[0]?.totalcost,
  ]);
  const handleCancel = () => {};

  useEffect(() => {
    let mounted = true;
    const pay = () => {
      if (mounted) {
        dispatch(retrieve_source(selected_log[0]?.paymongo_src_id));
        dispatch(action_selected_log(selected_log[0]?.orderno));
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
      {retrievesource?.status === "chargeable" ? (
        <View style={{ flex: 2 }}>
          <Button
            onPress={() => handleFinishPayment()}
            buttonStyle={styles.btnpay}
            title="Done Payment"
          />
        </View>
      ) : retrievesource?.status === "paid" ? (
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
              title="Pay Via Grab Pay"
            />
          </View>
        </>
      )}
    </View>
  );
};

export default GrabPayFooter;
