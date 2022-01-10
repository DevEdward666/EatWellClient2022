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
import {
  action_get_getLogsMast,
  action_get_getLogsDetails,
  action_selected_log,
} from '../../Services/Actions/MenuActions';
import {useDispatch, useSelector} from 'react-redux';
import LogCard from '../../Hooks/LogCard/LogCard';
import {Actions} from 'react-native-router-flux';
import wait from '../../Hooks/wait';
import {action_set_refresh} from '../../Services/Actions/MenuActions';
const ListOfLogs = () => {
  const logmaster = useSelector(state => state.MenuReducers.logmaster);
  const [offset, setoffset] = useState(10);
  const [empty, setempty] = useState(false);
  const refresh = useSelector(state => state.MenuReducers.refresh);
  const dispatch = useDispatch();

  const selected_log = useCallback(
    async item => {
      dispatch(action_selected_log(item?.orderno));
      Actions.logdetails();
    },
    [dispatch],
  );
  // useEffect(() => {
  //   let mounted = true;

  //   const totalcost = () => {
  //     {
  //       logdetails?.data.map(i => {
  //         settotal(i?.price);
  //       });
  //     }
  //   };
  //   mounted && totalcost();
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);
  const onRefresh = useCallback(() => {
    let mounted = true;
    if (mounted) {
      dispatch(action_set_refresh(true));
      wait(1000).then(() => {
        dispatch(action_set_refresh(false));
      });
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const checkempty = () => {
      if (logmaster?.data?.length <= 0) {
        setempty(true);
      } else {
        setempty(false);
      }
    };

    mounted && checkempty();
    return () => {
      mounted = false;
    };
  }, [logmaster]);
  return (
    <>
      {empty ? (
        <View style={{justifyContent: 'center', backgroundColor: 'white'}}>
          <Image
            source={require('../../assets/background/oops.png')}
            resizeMode="cover"
            style={{width: '100%', height: '100%', backgroundColor: 'white'}}
          />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
          contentContainerStyle={{paddingBottom: 180}}
          data={logmaster?.data}
          keyExtractor={(item, index) => index.toString()}
          //   onEndReached={loadmore}
          //   onEndReachedThreshold={0.1}
          renderItem={({item, index}) => (
            <View style={styles.row}>
              <View style={{width: '100%'}}>
                <TouchableHighlight
                  onPress={() => selected_log(item)}
                  key={index}
                  underlayColor="#ffffff00">
                  <LogCard
                    color={
                      item?.status === 'Accepted'
                        ? 'green'
                        : item?.status === 'Pending'
                        ? 'orange'
                        : 'red'
                    }
                    description={`${item?.orderno}`}
                    price={item?.totalcost}
                  />
                </TouchableHighlight>
              </View>
            </View>
          )}
        />
      )}
    </>
  );
};
export default ListOfLogs;
