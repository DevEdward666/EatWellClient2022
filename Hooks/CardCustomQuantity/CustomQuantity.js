import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {MaskedText} from 'react-native-mask-text';
import styles from './cardstyle';
import {useDispatch} from 'react-redux';
import {action_set_modifiedquantity} from '../../Services/Actions/MenuActions';
import {action_open_bottomsheet_quantity} from '../../Services/Actions/DefaultsActions';
const CustomQuantity = () => {
  const dispatch = useDispatch();
  const [modifyquantity, setmodifyquantity] = useState(0);
  const [submit, setsubmit] = useState(false);
  const handleChangeQuantity = useCallback(
    async e => {
      await setmodifyquantity(e);
      //   if (e !== '') {
      //     dispatch(action_open_bottomsheet_quantity(false));
      //   }

      //   console.log(e);
    },
    [dispatch, modifyquantity],
  );
  useEffect(() => {
    let mounted = true;
    const setquantity = () => {
      if (mounted) {
        dispatch(action_set_modifiedquantity(parseInt(modifyquantity)));
      }
    };
    mounted && setquantity();
    return () => {
      mounted = false;
    };
  }, [dispatch, modifyquantity, submit]);
  return (
    <Card>
      <Text>Input Quantity</Text>
      <TextInput
        style={styles.input}
        onChangeText={e => handleChangeQuantity(e)}
        value={modifyquantity.toString()}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
    </Card>
  );
};
export default CustomQuantity;
