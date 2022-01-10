import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, Text, Image, Animated} from 'react-native';
import {
  action_get_allmenu,
  action_get_getcategory,
} from '../../Services/Actions/MenuActions';
import {useDispatch, useSelector} from 'react-redux';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import SearchMenu from './SearchMenu';
import ListofCategory from './ListofCategory';
import ListofMenu from './ListofMenu';
import CustomBottomSheet from '../../Hooks/CustomBottomSheet/CustomBottomSheet';
import Icons from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaskedText} from 'react-native-mask-text';
import styles from '../Menu/styles';
import QuantityPicker from '../../Hooks/CustomQuantityPicker/QuantityPicker';
import {
  action_add_cart,
  action_remove_item,
  action_set_quantity,
} from '../../Services/Actions/MenuActions';
import {
  action_open_bottomsheet,
  action_notify_signal,
} from '../../Services/Actions/DefaultsActions';
const Menu = () => {
  const dispatch = useDispatch();
  const [isDisabled, setisDisabled] = useState(true);
  const search = useSelector(state => state.MenuReducers.search);
  const category = useSelector(state => state.MenuReducers.category);

  const quantity = useSelector(state => state.MenuReducers.quantity);
  const open_bottomsheet = useSelector(
    state => state.DefaultReducers.bottomSheet,
  );
  const selected_menu = useSelector(
    state => state.DefaultReducers.selected_menu,
  );

  const listofcart = useSelector(state => state.MenuReducers.cart);
  const user_qr = useSelector(state => state.MenuReducers.user_qr);
  const remove = useSelector(state => state.MenuReducers.remove);
  const cart = useSelector(state => state.MenuReducers.cart);
  const scroll = useSelector(state => state.MenuReducers.scroll);
  const [addcart, setaddcart] = useState([]);
  const handleAddtoCart = useCallback(async () => {
    let found = false;
    let noqty = false;
    {
      listofcart.map(item => {
        if (item.id === selected_menu?.id) {
          found = true;
        }
      });
    }
    if (!found) {
      if (quantity >= 1) {
        dispatch(
          action_add_cart([
            ...listofcart,
            {
              id: selected_menu?.id,
              name: selected_menu?.name,
              price: selected_menu?.price,
              qty: quantity,
            },
          ]),
        );
        dispatch(action_open_bottomsheet(false));
      }
    } else {
      alert('Item Already in List');
    }

    //   dispatch(action_add_cart())
  }, [dispatch, selected_menu, quantity]);
  useEffect(() => {
    let mounted = true;
    const removemenu = async () => {
      if (mounted) {
        if (remove?.remove) {
          const _itemState = listofcart.filter(
            (_item, _index) => _item?.id !== remove?.id,
          );
          setaddcart(_itemState);
          dispatch(action_remove_item(false, 0));
          console.log('done');
        }
      }
    };
    mounted && removemenu();
    return () => {
      mounted = false;
    };
  }, [dispatch, remove, addcart]);

  useEffect(() => {
    let mounted = true;
    const getallmenu = async () => {
      if (mounted) {
        if (user_qr?.loaded) {
          setaddcart([]);
        }
        dispatch(action_get_allmenu(10, search, category));
      }
    };
    mounted && getallmenu();
    return () => {
      mounted = false;
    };
  }, [dispatch, search, category]);
  console.log(addcart);
  useEffect(() => {
    let mounted = true;
    const getallcategory = async () => {
      if (mounted) {
        dispatch(action_get_getcategory());
        if (quantity > 0) {
          setisDisabled(false);
        }
      }
    };
    mounted && getallcategory();
    return () => {
      mounted = false;
    };
  }, [dispatch, isDisabled]);
  useEffect(() => {
    let mounted = true;
    const getallcategory = async () => {
      if (mounted) {
        if (quantity <= 0) {
          await setisDisabled(true);
        } else {
          await setisDisabled(false);
        }
      }
    };
    mounted && getallcategory();
    return () => {
      mounted = false;
    };
  }, [quantity, isDisabled]);
  const searchBarAnim = useRef(new Animated.Value(-45)).current;
  useEffect(() => {
    if (scroll) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(searchBarAnim, {
        toValue: -105,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [scroll]);
  return (
    <>
      <SafeAreaView>
        <CustomBottomSheet
          isVisible={open_bottomsheet}
          color="rgba(0.5, 0.25, 0, 0.2)"
          UI={
            <Card
              containerStyle={{
                borderTopStartRadius: 15,
                borderTopEndRadius: 15,
              }}>
              <View style={{flex: 5}}>
                <View
                  style={[
                    styles.container,
                    {
                      flexDirection: 'row',
                    },
                  ]}>
                  <View style={{flex: 20}}>
                    <Text style={{fontSize: 18, fontWeight: '900'}}>
                      {selected_menu?.name}
                    </Text>
                  </View>
                  <View style={{flex: 5}}>
                    <MaskedText
                      style={{fontSize: 16, fontWeight: 'bold'}}
                      type="currency"
                      options={{
                        prefix: '₱',
                      }}>
                      {selected_menu?.price}
                    </MaskedText>
                  </View>
                </View>
                <Text style={{fontSize: 12, fontWeight: '900'}}></Text>
              </View>

              <View
                style={[
                  styles.container,
                  {
                    flexDirection: 'row',
                  },
                ]}>
                <View style={{flex: 5}}>
                  <Text style={{fontSize: 18, fontWeight: '900'}}>
                    {selected_menu?.desc}
                  </Text>
                </View>
                <View style={{flex: 3}}>
                  <Image
                    progressiveRenderingEnabled={true}
                    style={styles.image}
                    source={require('../../assets/icons/spoon.png')}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.container,
                  {
                    flexDirection: 'row',
                  },
                ]}>
                <View style={{flex: 5}}>
                  <QuantityPicker />
                </View>
                <View style={{flex: 3}}>
                  <Button
                    disabled={isDisabled}
                    onPress={() => handleAddtoCart()}
                    buttonStyle={{
                      backgroundColor: '#f7862a',
                      borderRadius: 10,
                      alignSelf: 'center',
                    }}
                    icon={{
                      name: 'shopping-cart',
                      size: 15,
                      color: 'white',
                    }}
                    title="Add to Cart"
                  />
                </View>
              </View>
            </Card>
          }
        />
        <Animated.View
          style={{
            marginStart: 25,
            marginTop: scroll ? -20 : -20,
            marginEnd: 25,
            transform: [{translateY: searchBarAnim}],
            top: scroll ? 0 : -150,
          }}>
          {scroll ? <SearchMenu /> : null}
        </Animated.View>
        <Animated.View
          style={{
            transform: [{translateY: searchBarAnim}],
            top: scroll ? 0 : -150,
            marginBottom: scroll ? -60 : 0,
          }}>
          <ListofCategory />
        </Animated.View>
        <Animated.View
          style={{
            marginBottom: 10,
            marginTop: 50,
            marginStart: 25,
            marginEnd: 25,
            top: scroll ? 0 : -110,
          }}>
          {scroll ? null : <SearchMenu />}
        </Animated.View>
        <Animated.View
          style={{
            marginBottom: 20,
            top: scroll ? 0 : -110,
          }}>
          <ListofMenu />
        </Animated.View>
      </SafeAreaView>
    </>
  );
};
export default Menu;
