import React, {useEffect, useCallback, useState, useRef} from 'react';
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
  Animated,
} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_get_allmenu,
  action_set_refresh_menu,
  action_set_scroll,
} from '../../Services/Actions/MenuActions';
import {
  action_open_bottomsheet,
  action_selected_menu,
} from '../../Services/Actions/DefaultsActions';
import CustomCard from '../../Hooks/CustomCard';
import wait from '../../Hooks/wait';
const ListofMenu = () => {
  const listofmenu = useSelector(state => state.MenuReducers.listofmenu);
  const search = useSelector(state => state.MenuReducers.search);
  const category = useSelector(state => state.MenuReducers.category);
  const refreshmenu = useSelector(state => state.MenuReducers.refreshmenu);
  const scroll = useSelector(state => state.MenuReducers.scroll);
  const dispatch = useDispatch();
  const [offset, setoffset] = useState(10);
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const loadmore = useCallback(async () => {
    let mounted = true;
    const getmore = () => {
      if (mounted) {
        setoffset(prev => prev + 10);
        dispatch(action_get_allmenu(offset, search, category));
      }
    };
    mounted && getmore();

    return () => {
      mounted = false;
    };
  }, [dispatch, offset, search, category]);

  const selected_menu = useCallback(
    item => {
      dispatch(action_open_bottomsheet(true));
      dispatch(
        action_selected_menu(
          item?.menuno,
          item?.menudesc,
          item?.price,
          `${item?.menudesc} - ${item?.price}`,
        ),
      );
    },
    [dispatch],
  );
  const onRefresh = useCallback(() => {
    let mounted = true;
    if (mounted) {
      dispatch(action_set_refresh_menu(true));
      wait(1000).then(() => {
        dispatch(action_set_refresh_menu(false));
      });
      dispatch(action_set_scroll(true));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);
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
        toValue: -45,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [scroll]);
  const handleScrollTop = useCallback(() => {
    dispatch(action_set_scroll(false));
  }, [dispatch]);
  return (
    <Animated.FlatList
      refreshControl={
        <RefreshControl refreshing={refreshmenu} onRefresh={onRefresh} />
      }
      contentContainerStyle={{paddingBottom: 180}}
      data={listofmenu.data}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={loadmore}
      onEndReachedThreshold={0.1}
      onScrollBeginDrag={() => handleScrollTop()}
      style={{transform: [{translateY: searchBarAnim}]}}
      renderItem={({item, index}) => (
        <View style={styles.row}>
          <View style={{width: '100%'}}>
            <TouchableHighlight
              onPress={() => selected_menu(item)}
              key={index}
              underlayColor="#ffffff00">
              <CustomCard
                title={item?.menudesc}
                description={`${item?.menudesc}`}
                price={item?.price}
              />
            </TouchableHighlight>
          </View>
        </View>
      )}
    />
  );
};
export default ListofMenu;
