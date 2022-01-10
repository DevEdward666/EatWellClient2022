import React, {useCallback, useState, useEffect} from 'react';
import {SearchBar, Card} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';
import {captureScreen} from 'react-native-view-shot';
import {action_searchmenu, send_notif} from '../../Services/Actions/MenuActions';
import styles from './styles';
import {Button} from 'react-native-elements';
import LogCardDtls from '../../Hooks/LogCard/LogCardDtls';
import {
  action_reset_cart,
  action_save_qr,
} from '../../Services/Actions/MenuActions';
import {
  action_app_loaded,
  action_notify_signal,
} from '../../Services/Actions/DefaultsActions';
import {Actions} from 'react-native-router-flux';
import {MaskedText} from 'react-native-mask-text';
const OrderDetails = () => {
  const dispatch = useDispatch();
  const [qrvalue, setqrvalue] = useState('');
  const [total, settotal] = useState(0);
  const user_qr = useSelector(state => state.MenuReducers.user_qr);
  const listofcart = useSelector(state => state.MenuReducers.cart);
  let qruri = 'data:image/png;base64,';
  useEffect(() => {
    let mounted = true;
    const setvaluesandnotif = async () => {
      if (mounted) {
        await settotal(0);
        await setqrvalue(qruri + user_qr?.qrbase64);
   
       
      }
    };
    mounted && setvaluesandnotif();
    return () => {
      mounted = false;
    };
  }, [ user_qr]);
  const handleDoneOrder = useCallback(async () => {
    let data = {
      notification: `New Order Order No.${user_qr?.orderno}`,
      from: 'Customer',
      to: '',
      type: '',
    };
    dispatch(send_notif(user_qr?.orderno))
    dispatch(action_notify_signal(data));
    {
      listofcart.map(i => {
        settotal(prev => prev + i.qty * i.price);
      });
    }
    dispatch(action_reset_cart());
    dispatch(action_app_loaded(true));
    await Actions.index();
  }, [dispatch,user_qr?.orderno]);
  const getHeader = () => {
    return (
      <SafeAreaView>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'row',
              marginBottom: 50,
            },
          ]}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              Order No
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '900',
                textTransform: 'uppercase',
              }}>
              {user_qr?.orderno}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'row',
            },
          ]}>
          <View style={{flex: 1, width: '100%'}}>
            <View
              style={[
                styles.container,
                {
                  flexDirection: 'row',
                },
              ]}>
              <View style={{flex: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '900',
                    textTransform: 'uppercase',
                  }}>
                  Orders
                </Text>
              </View>
              <View style={{flex: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '900',
                    textTransform: 'uppercase',
                  }}>
                  Quantity
                </Text>
              </View>
              <View style={{flex: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '900',
                    textTransform: 'uppercase',
                  }}>
                  Price
                </Text>
              </View>
              <View style={{flex: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '900',
                    textTransform: 'uppercase',
                  }}>
                  Total
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  const getFooter = () => {
    return (
      <>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'row',
              padding: 30,
            },
          ]}>
          <View style={{flex: 12, alignItems: 'flex-end'}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '900',
                textTransform: 'uppercase',
              }}>
              Total
            </Text>
          </View>
          <View style={{flex: 3, alignItems: 'flex-end'}}>
            <MaskedText
              style={{fontSize: 12, fontWeight: 'bold', textAlign: 'right'}}
              type="currency"
              options={{
                prefix: '₱',
              }}>
              {total}
            </MaskedText>
          </View>
        </View>
        <Image
          style={{
            alignSelf: 'center',
            width: 300,
            height: 300,
            borderRadius: 120 / 2,
            overflow: 'hidden',
            borderWidth: 3,
          }}
          source={{uri: qrvalue, scale: 1}}
        />
        <Button
          onPress={() => handleDoneOrder()}
          buttonStyle={{
            backgroundColor: '#c70e05',
            borderRadius: 10,
            width: '70%',

            marginBottom: 80,
            alignSelf: 'center',
            height: 70,
          }}
          icon={{
            name: 'check-circle',
            size: 20,
            color: 'white',
          }}
          title="Done Order"
        />
      </>
    );
  };
  const [savedImagePath, setSavedImagePath] = useState('');
  const [imageURI, setImageURI] = useState('');
  const takeScreenShot = () => {
    // To capture Screenshot
    captureScreen({
      // Either png or jpg (or webm Android Only), Defaults: png
      format: 'jpg',
      // Quality 0.0 - 1.0 (only available for jpg)
      quality: 0.8,
      result: 'base64',
    }).then(
      //callback function to get the result URL of the screnshot
      uri => {
        setSavedImagePath(uri);
        setImageURI(uri);
        dispatch(action_save_qr(uri, user_qr?.orderno));
      },
      error => console.error('Oops, Something Went Wrong', error),
    );
  };
  return (
    <Card containerStyle={{borderRadius: 15, elevation: 50}}>
      <View style={{alignItems: 'flex-end'}}>
        <IconButton
          icon="download"
          color="#c70e05"
          size={20}
          onPress={() => takeScreenShot()}
        />
      </View>
      <FlatList
        data={listofcart}
        keyExtractor={(item, index) => index.toString()}
        //   onEndReached={loadmore}
        //   onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <LogCardDtls
            description={`${item?.name}`}
            qty={item?.qty}
            price={item?.price}
            total={item?.qty * item?.price}
          />
        )}
        ListHeaderComponent={getHeader}
        ListFooterComponent={getFooter}
      />
    </Card>
  );
};
export default OrderDetails;
