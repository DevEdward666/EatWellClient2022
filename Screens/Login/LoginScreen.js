import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Card} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {action_Login_user} from '../../Services/Actions/LoginActions';
import {Actions} from 'react-native-router-flux';
import styles from './style';
const LoginScreen = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alerted, setAlerted] = useState(false);

  const dispatch = useDispatch();
  AsyncStorage.getItem('cashier_tokenizer').then(item => {
    let mounted = true;
    const gettoken = () => {
      if (mounted) {
        if (item != null) {
          Actions.index();
        }
      }
    };
    mounted && gettoken();
    return () => {
      mounted = true;
    };
  });
  // AsyncStorage.getItem('cashier_tokenizer').then(item => {
  //   if (item == null) {
  //     Actions.home();
  //   } else {
  //     Actions.index();
  //   }
  // });
  const handleUsernameChange = useCallback(
    value => {
      let mounted = true;
      const set_username = () => {
        if (mounted) {
          setUsername(value);
        }
      };
      mounted && set_username();
      return () => {
        mounted = false;
      };
    },
    [username],
  );
  const handlePasswordChange = useCallback(
    value => {
      let mounted = true;
      const set_password = () => {
        if (mounted) setPassword(value);
      };
      mounted && set_password();
      return () => {
        mounted = false;
      };
    },
    [password],
  );
  const handleSubmit = useCallback(() => {
    let mounted = true;
    const handle_submit = () => {
      if (mounted) {
        dispatch(action_Login_user(username, password));
      }
    };
    mounted && handle_submit();
    return () => {
      mounted = false;
    };
  }, [username, password]);
  const goToSignup = useCallback(() => {
    let mounted = true;
    const goto = () => {
      if (mounted) {
        Actions.signup();
      }
    };

    mounted && goto();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/background/background.jpg')}
      resizeMode="cover"
      blurRadius={2}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/icons/spoon.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.textTitle}>Eat Well</Text>

        <Card containerStyle={styles.cardContainer}>
          <View style={styles.InputContainer}>
            <TextInput
              theme={{
                colors: {
                  primary: '#f7862a',
                  backgroundColor: 'rgba(255,255,355,0.1)',
                  underlineColor: 'rgba(255,255,355,0.4)',
                },
              }}
              mode="flat"
              label="Username"
              onChangeText={text => handleUsernameChange(text)}
              value={username}
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              theme={{
                colors: {
                  primary: '#f7862a',
                  backgroundColor: 'rgba(255,255,355,0.1)',
                  underlineColor: 'rgba(255,255,355,0.4)',
                  overflow: 'hidden',
                },
              }}
              mode="flat"
              label="Password"
              secureTextEntry={true}
              onChangeText={text => handlePasswordChange(text)}
              value={password}
            />
          </View>

          <TouchableHighlight
            style={styles.login}
            underlayColor="#f7862a"
            onPress={() => handleSubmit()}>
            <Text style={styles.submitText}>Login</Text>
          </TouchableHighlight>
          <View style={{marginTop: 60}}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Not Yet Registered?
              <Text
                onPress={() => goToSignup()}
                style={{color: '#f7862a', fontWeight: 'bold'}}>
                Sign Up
              </Text>
            </Text>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
              (For Non-Employees only)
            </Text>
          </View>
          <View style={{height: 200}}>
            <View style={styles.endFooter}>
              <Text style={styles.endTextFooter}>Powered by TUO @ 2021</Text>
            </View>
          </View>
        </Card>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
