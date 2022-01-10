import React, {useState, useEffect} from 'react';
import {useColorScheme, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AnimatedSplash from 'react-native-animated-splash-screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
  dark: false,
  colors: {
    primary: 'white',
    background: '#ffffff',

    card: '#f7862a',
    text: 'white',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
import Menu from '../Menu/Menu';
import Cart from '../Cart/Cart';
import Account from '../Account/Account';
import OrderLogs from '../CustomerLogs/OrderLogs';
import CustomPushNotif from '../../Hooks/CustomPushNotif/CustomPushNotif';
import {useDispatch, useSelector} from 'react-redux';
import {BackgroundImage} from 'react-native-elements/dist/config';
import {
  signalr_connection,
  signalr_notify_connection,
  action_app_loaded,
} from '../../Services/Actions/DefaultsActions';
export default function Navigations() {
  const apploaded = useSelector(state => state.DefaultReducers.apploaded);
  const users_reducers = useSelector(state => state.DefaultReducers.userinfo);
  const [logoImage, setlogoImage] = useState(
    require('../../assets/icons/spoon.png'),
  );
  const dispatch = useDispatch();
  const [loaded, setloaded] = useState(false);
  useEffect(() => {
    let mounted = true;
    const loaded = () => {
      if (mounted) {
        setloaded(false);
        if(users_reducers.length>0){
          setloaded(true)
        }
      }
    };
    mounted && loaded();
    return () => {
      mounted = false;
    };
  }, [users_reducers]);
  console.log(apploaded)
  const MenuStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Screen_Menu"
        screenOptions={{headerShown: true, headerLeft: null}}>
        <Stack.Screen name="Screen_Menu"  component={Menu} options={{title:"Menu"}}/>
      </Stack.Navigator>
    );
  };
  const CartStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: true, headerLeft: null}}>
        <Stack.Screen name="Screen_Cart" component={Cart} options={{title:"Cart"}} />
      </Stack.Navigator>
    );
  };
  const LogsStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: true, headerLeft: null}}>
        <Stack.Screen name="Screen_Logs" component={OrderLogs} options={{title:"Logs"}}/>
      </Stack.Navigator>
    );
  };
  const ProfileStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: true, headerLeft: null}}>
        <Stack.Screen name="Screen_Account" component={Account} options={{title:"Account"}}/>
      </Stack.Navigator>
    );
  };

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={loaded}
      logoImage={logoImage}
      // background={require('../../assets/background/background.jpg')}
      backgroundColor="#f7862a"
      logoHeight={150}
      logoWidth={150}>
      <NavigationContainer theme={MyTheme}>
        {/* <CustomPushNotif /> */}
        <Tab.Navigator
          initialRouteName="Menu"
          screenOptions={({route}) => ({
            lazyLoad: true,
            style: {backgroundColor: '#c70e05'},
            headerShown: false,
            tabBarIcon: ({color, size}) => {
              const icons = {
                Menu: 'silverware',
                Cart: 'shopping',
                Logs: 'note-text',
                Profile: 'account',
              };

              return (
                <MaterialCommunityIcons
                  name={icons[route.name]}
                  color={color}
                  size={size}
                />
              );
            },
            style: {
              backgroundColor: '#c70e05',
            },
          })}>
          <Tab.Screen name="Menu" component={MenuStack} />
          <Tab.Screen name="Cart" component={CartStack} />
          <Tab.Screen name="Logs" component={LogsStack} />
          <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </AnimatedSplash>
  );
}
