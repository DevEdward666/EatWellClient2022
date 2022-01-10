import React, {useState, useCallback, useEffect} from 'react';
import {TextInput, View} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';
import styles from './styles';
import {action_set_quantity} from '../../Services/Actions/MenuActions';
import {useDispatch} from 'react-redux';
const QuantityPicker = () => {
  const [number, setnumber] = useState(1);
  const dispatch = useDispatch();
  const handleAddQuantity = useCallback(async () => {
    await setnumber(number + 1);
  }, [number]);
  const handleLessQuantity = useCallback(async () => {
    if (number <= 0) {
      setnumber(0);
    } else {
      await setnumber(number - 1);
    }
  }, [number]);
  useEffect(() => {
    let mounted = true;
    const getcurrentquantity = () => {
      dispatch(action_set_quantity(number));
    };
    mounted && getcurrentquantity();
    return () => {
      mounted = false;
    };
  }, [dispatch, number]);
  const handleChangeNumber = useCallback(
    async e => {
      await setnumber(e);
    },
    [number],
  );
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'row',
        },
      ]}>
      <View style={{flex: 1}}>
        <IconButton
          icon="minus"
          color={'#f7862a'}
          size={20}
          onPress={() => handleLessQuantity()}
        />
      </View>

      <View style={{flex: 1}}>
        <TextInput
          style={styles.input}
          onChangeText={e => handleChangeNumber(e)}
          editable={false}
          value={number.toString()}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </View>
      <View style={{flex: 2}}>
        <IconButton
          icon="plus"
          color={'#f7862a'}
          size={20}
          onPress={() => handleAddQuantity()}
        />
      </View>
    </View>
  );
};
export default QuantityPicker;
