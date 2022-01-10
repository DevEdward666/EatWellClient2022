import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {action_get_getLogsDetails} from '../../Services/Actions/MenuActions';
import {useDispatch, useSelector} from 'react-redux';
import LogDetails from './LogDetails';
const MainDetails = () => {
  const dispatch = useDispatch();
  const selected_log = useSelector(state => state.MenuReducers.selected_log);
  const users_reducers = useSelector(state => state.DefaultReducers.userinfo);
  const notificationdtls = useSelector(
    state => state.DefaultReducers.notificationdtls,
  );
  useEffect(() => {
    let mounted = true;
    const getdetails = async () => {
      if (mounted) {
        if(selected_log.length>0){
          dispatch(
          action_get_getLogsDetails(
            selected_log[0]?.orderno,
            users_reducers[0]?.username,
            50,
          ),
        );
        }
    
      }
    };
    mounted && getdetails();
    return () => {
      mounted = false;
    };
  }, [dispatch, selected_log , users_reducers, notificationdtls]);
  return (
    <SafeAreaView>
      <LogDetails />
    </SafeAreaView>
  );
};

export default MainDetails;
