import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useCallback} from 'react';
import CartFooter from '../../Hooks/CardFooterCart/CartFooter';
import ListofCart from './ListofCart';
import {View, Image, ScrollView, SafeAreaView} from 'react-native';
import {Button} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import styles from '../../Hooks/CustomCardCart/cardstyle';
import Icons from 'react-native-vector-icons/FontAwesome';

import {action_open_bottomsheet_details} from '../../Services/Actions/DefaultsActions';
import {Actions} from 'react-native-router-flux';
import {
  action_add_cart,
  action_remove_item,
} from '../../Services/Actions/MenuActions';
const Cart = () => {
  const listofcart = useSelector(state => state.MenuReducers.cart);

  const modifiedquantity = useSelector(
    state => state.MenuReducers.modifiedquantity,
  );
  const user_qr = useSelector(state => state.MenuReducers.user_qr);
  const dispatch = useDispatch();
  const [subtotal, setsubtotal] = useState(0);
  const [empty, setempty] = useState(false);


  useEffect(() => {
    let mounted = true;
    const checkifempty = async () => {
      if (mounted) {
        if (listofcart?.length <= 0) {
          await setempty(true);
        } else {
          await setempty(false);
        }
      }
    };
    mounted && checkifempty();
    return () => {
      mounted = false;
    };
  }, [listofcart, empty]);

  return (
    <SafeAreaView>
      {empty ? (
        <View style={{justifyContent: 'center'}}>
          <Image
            source={require('../../assets/icons/emptycart.png')}
            resizeMode="cover"
            style={{width: '100%'}}
          />
        </View>
      ) : (
        <>
          <ListofCart />
        </>
      )}
    </SafeAreaView>
  );
};
export default Cart;
