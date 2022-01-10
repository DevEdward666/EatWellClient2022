import React, { useEffect, useCallback, useState } from "react";
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
} from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { action_get_allmenu } from "../../Services/Actions/MenuActions";
import {
  action_open_bottomsheet,
  action_open_bottomsheet_quantity,
  action_selected_menu,
  action_notify_signal,
} from "../../Services/Actions/DefaultsActions";
import CustomCard from "../../Hooks/CustomCard";
import CardCart from "../../Hooks/CustomCardCart/CardCart";
import {
  action_add_cart,
  action_remove_item,
} from "../../Services/Actions/MenuActions";
import { action_place_order } from "../../Services/Actions/MenuActions";
import CartFooter from "../../Hooks/CardFooterCart/CartFooter";
import CustomBottomSheet from "../../Hooks/CustomBottomSheet/CustomBottomSheet";
import CustomQuantity from "../../Hooks/CardCustomQuantity/CustomQuantity";
import CustomBottomSheetDetails from "../../Hooks/CustomBottomSheet/CustomBottomSheet";
import OrderDetails from "../OrderDetails/OrderDetails";
import { Button } from "react-native-elements";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { Actions } from "react-native-router-flux";
const ListofCart = () => {
  const listofcart = useSelector((state) => state.MenuReducers.cart);
  const modifiedquantity = useSelector(
    (state) => state.MenuReducers.modifiedquantity
  );
  const open_bottomsheet_quantity = useSelector(
    (state) => state.DefaultReducers.bottomSheetquantity
  );
  const open_bottomsheet_details = useSelector(
    (state) => state.DefaultReducers.bottomSheetdetails
  );
  const userinfo = useSelector((state) => state.DefaultReducers.userinfo);
  const user_qr = useSelector((state) => state.MenuReducers.user_qr);
  const dispatch = useDispatch();
  const [getindex, setindex] = useState(0);
  const [newlistofcart, setnewlistofcart] = useState([]);
  const [gestureName, setgestureName] = useState("");
  const [subtotal, setsubtotal] = useState(0);
  const handlePlaceOrder = useCallback(async () => {
    dispatch(action_place_order(userinfo[0]?.username, subtotal, listofcart));

    await Actions.orderdetails();
  }, [dispatch, userinfo, subtotal, listofcart]);

  const actionaddqty = useCallback(
    async (index) => {
      await setindex(index);
      await setnewlistofcart([...listofcart]);
    },
    [dispatch, modifiedquantity, listofcart]
  );
  useEffect(() => {
    let mounted = true;
    const getquantity = async () => {
      if (mounted) {
        if (newlistofcart?.length > 0) {
          if (newlistofcart[getindex]?.qty !== undefined) {
            dispatch(action_open_bottomsheet_quantity(true));
            let qty = modifiedquantity;
            newlistofcart[getindex].qty = qty;
          }
        }
      }
    };
    mounted && getquantity();
    return () => {
      mounted = false;
    };
  }, [getindex, modifiedquantity, newlistofcart]);
  useEffect(() => {
    let mounted = true;
    const settotal = async () => {
      await setsubtotal(0);
      listofcart?.map(async (item) => {
        await setsubtotal((prev) => prev + item?.qty * item?.price);
      });
    };
    mounted && settotal();
    return () => {
      mounted = false;
    };
  }, [listofcart, modifiedquantity]);

  const onSwipe = useCallback(
    (gestureName, gestureState, item, index) => {
      const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
      setgestureName({ gestureName: gestureName });
      switch (gestureName) {
        case SWIPE_UP:
          break;
        case SWIPE_DOWN:
          break;
        case SWIPE_LEFT:
          break;
        case SWIPE_RIGHT:
          break;
      }
    },
    [dispatch]
  );
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 1000,
  };
  const setFooter = () => {
    return (
      <SafeAreaView style={{ marginTop: 50 }}>
        <CartFooter subtotal={subtotal} Total={subtotal} />
        <Button
          onPress={() => handlePlaceOrder()}
          buttonStyle={{
            backgroundColor: "#c70e05",
            borderRadius: 10,
            width: "70%",
            alignSelf: "center",
            height: 70,
          }}
          icon={{
            name: "shopping-bag",
            size: 20,
            color: "white",
          }}
          title="Place Order"
        />
      </SafeAreaView>
    );
  };
  const handleLongPress = useCallback(
    async (item) => {
      let _itemState = listofcart.filter(
        (_item, _index) => _item?.id !== item?.id
      );

      await setnewlistofcart(_itemState);
      dispatch(action_add_cart(_itemState));
    },
    [dispatch, listofcart]
  );
  return (
    <SafeAreaView>
      <CustomBottomSheet
        isVisible={open_bottomsheet_quantity}
        color="rgba(0.5, 0.25, 0, 0.2)"
        UI={<CustomQuantity />}
      />

      <FlatList
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 30 }}
        data={listofcart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <GestureRecognizer
              onSwipe={(direction, state) =>
                onSwipe(direction, state, item, index)
              }
              config={config}
            >
              <TouchableHighlight
                onPress={() => actionaddqty(index)}
                onLongPress={() => handleLongPress(item)}
                key={item?.id}
                underlayColor="#ffffff00"
              >
                <CardCart
                  title={item?.name}
                  description={item?.name}
                  subtotal={item?.qty * item?.price}
                  price={item?.price}
                  qty={item?.qty}
                />
              </TouchableHighlight>
            </GestureRecognizer>
          );
        }}
        ListFooterComponent={setFooter}
      />
    </SafeAreaView>
  );
};
export default ListofCart;
