import React, {useEffect, useCallback, useState} from 'react';
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
} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {action_set_category} from '../../Services/Actions/MenuActions';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
const ListofMenu = () => {
  const listofcategory = useSelector(
    state => state.MenuReducers.listofcategory,
  );
  const dispatch = useDispatch();
  const [selecteditem, setselecteditem] = useState('');
  const [prevselected, setprevselected] = useState('');
  const [caterogyset, setcaterogy] = useState(0);
  const handleSelectedCategory = useCallback(
    async (item, index) => {
      await setselecteditem(item?.categno);
      dispatch(action_set_category(item?.categno));
      await setprevselected(selecteditem);
    },
    [dispatch, selecteditem],
  );
  useEffect(() => {
    let mounted = true;
    const getselected = () => {
      if (prevselected === selecteditem) {
        dispatch(action_set_category(0));
      }
    };
    mounted && getselected();
    return () => {
      mounted = false;
    };
  }, [dispatch, prevselected]);
  return (
    <FlatList
      data={listofcategory?.data}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      renderItem={({item, index}) => (
        <TouchableHighlight
          onPress={() => handleSelectedCategory(item, index)}
          key={index}
          underlayColor="#ffffff00">
          <Card
            containerStyle={
              selecteditem === item?.categno
                ? prevselected === item?.categno
                  ? {
                      borderRadius: 50,
                      backgroundColor: 'white',
                      elevation: 15,

                      justifyContent: 'center',
                      height: 50,
                    }
                  : {
                      backgroundColor: '#f7862a',
                      borderRadius: 50,
                      elevation: 10,
                      justifyContent: 'center',
                      height: 50,
                    }
                : {
                    borderRadius: 50,
                    backgroundColor: 'white',
                    elevation: 15,
                    justifyContent: 'center',
                    height: 50,
                  }
            }>
            <Text
              style={
                selecteditem === item?.categno
                  ? prevselected === item?.categno
                    ? {
                        color: 'black',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 12,
                      }
                    : {
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 12,
                      }
                  : {
                      color: 'black',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 12,
                    }
              }>
              {item?.categdesc}
            </Text>
          </Card>
        </TouchableHighlight>
      )}
    />
  );
};
export default ListofMenu;
