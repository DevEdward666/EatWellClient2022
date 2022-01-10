import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  View,
} from 'react-native';
import {Card, Icon} from 'react-native-elements';
// import TextInputMask from 'react-native-text-input-mask';
import {TextInputMask} from 'react-native-masked-text';
import {HelperText, TextInput} from 'react-native-paper';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {useDispatch, useSelector} from 'react-redux';
import CustomOverlay from '../../Hooks/Overlay/CustomOerlay';
import {
  action_SignUp_user,
  action_GET_usernameExist,
} from '../../Services/Actions/SignUpActions';
import styles from './styles';
import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
const SignUp = () => {
  const dispatch = useDispatch();
  const SignUpReducers = useSelector(state => state.SignUpReducers);
  const data = useSelector(state => state.SignUpReducers.data);
  const [firstname, setfirstname] = useState('');
  const [middlename, setmiddlename] = useState('');
  const [lastname, setlastname] = useState('');
  const [mobile, setmobile] = useState('63');
  const [email, setemail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [stepError, setstepError] = useState(false);
  const [InfoError, setInfoError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessageFirstname, setErrorMessageFirstname] = useState(false);
  const [errorMessageLastname, setErrorMessageLastname] = useState(false);
  const [errorUsernameMessage, setErrorMessageUsername] = useState('');
  const [emailErrorMessage, setemailErrorMessage] = useState(false);
  const [mobileErrorMessage, setmobileErrorMessage] = useState('');
  const [showconfirmpass, setshowconfirmpass] = useState(true);
  const [showpass, setshowpass] = useState(true);
  const [iconpass, seticonpass] = useState(false);
  const [iconconfirmpass, seticonconfirmpass] = useState(false);
  const [passworderrormessage, setpassworderrormessage] = useState('');
  const [firstnameerror, setfirstnameerror] = useState('');
  const [middlenameerror, setmiddlenameerror] = useState('');
  const [lastnameerror, setlastnameerror] = useState('');
  const [overlayvisible, setoverlayvisible] = useState(false);
  const unmaskedmobile = useRef(null);
  const handleUsernameExist = useCallback(
    async usernames => {
      await setUsername(usernames);
      dispatch(action_GET_usernameExist(usernames));
    },
    [dispatch],
  );
  const handlePassword = useCallback(
    password => {
      setPassword(password);
      if (password != confirmpassword) {
        setErrorMessage(true);
        setpassworderrormessage('Password Mismatch');
        setstepError(true);
      } else {
        let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (reg.test(password) === false) {
          setErrorMessage(true);
          setpassworderrormessage(
            'Must be 8 characters long 1 UPPERCASE 1 Numeric',
          );
        } else {
          setmobileErrorMessage();
          setstepError(false);
          setErrorMessage(false);
        }
      }
    },
    [password, confirmpassword],
  );
  const showpassword = useCallback(() => {
    if (showpass == true) {
      setshowpass(false);
      seticonpass(true);
    } else {
      setshowpass(true);
      seticonpass(false);
    }
  }, [showpass, iconpass]);
  const showconfirmpassword = useCallback(() => {
    if (showconfirmpass == true) {
      setshowconfirmpass(false);
      seticonconfirmpass(true);
    } else {
      setshowconfirmpass(true);
      seticonconfirmpass(false);
    }
  }, [showconfirmpass, iconconfirmpass]);
  const handleConfirmPassword = useCallback(
    confirmpassword => {
      setconfirmpassword(confirmpassword);
      if (password != confirmpassword) {
        setErrorMessage(true);
        setpassworderrormessage('Password Mismatch');
        setstepError(true);
      } else {
        let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (reg.test(password) === false) {
          setErrorMessage(true);
          setpassworderrormessage(
            'Must be 8 characters long 1 UPPERCASE 1 Numeric',
          );
        } else {
          setmobileErrorMessage();
          setstepError(false);
          setErrorMessage(false);
        }
      }
    },
    [password, confirmpassword],
  );
  const handleNextInfo = useCallback(() => {
    if (firstname == '') {
      setInfoError(true);
      setErrorMessageFirstname(true);
      setfirstnameerror('Please Input First name');
    } else if (lastname == '') {
      setInfoError(true);
      setErrorMessageLastname(true);
      setlastnameerror('Please Input Last name');
    } else {
      setInfoError(false);
    }
  }, [firstname, lastname]);

  const validate = useCallback(
    email => {
      setemail(email);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        setemailErrorMessage(true);
      } else {
        setemailErrorMessage(false);
        setemail(email);
      }
    },
    [email],
  );
  useEffect(() => {
    let mounted = true;
    const geterrors = () => {
      if (SignUpReducers.username?.username == username) {
        setErrorMessageUsername('Username already Exist');
        setstepError(true);
      } else {
        setErrorMessageUsername(false);
        setstepError(false);
      }
    };
    mounted && geterrors();
    return () => (mounted = false);
  }, [username, SignUpReducers]);
  const handleSubmitCredentials = useCallback(async () => {
    if (email == '') {
      setemailErrorMessage('Please Provide Email');
      setstepError(true);
    } else if (username == '') {
      setErrorMessageUsername('Please Provide Username');
      setstepError(true);
    } else if (password == '') {
      setstepError(true);
      setpassworderrormessage(
        'Password Must be 8 characters long 1 UPPERCASE 1 Numeric',
      );
    } else if (stepError == false) {
      setoverlayvisible(data?.loaded);
      dispatch(
        action_SignUp_user(
          firstname,
          middlename,
          lastname,
          mobile.split(' ').join(''),
          email,
          username,
          password,
        ),
      );
    }
  }, [
    dispatch,
    firstname,
    middlename,
    lastname,
    mobile,
    email,
    username,
    password,
    stepError,
    data,
    overlayvisible,
  ]);
  const handleDoneSignup = useCallback(() => {
    setoverlayvisible(false);
    Actions.home();
  }, []);
  return (
    <>
      <CustomOverlay
        visible={overlayvisible}
        message={data?.message}
        UI={
          <Button
            onPress={() => handleDoneSignup()}
            buttonStyle={{
              backgroundColor: '#c70e05',
              borderRadius: 10,
              width: '70%',

              marginBottom: 80,
              alignSelf: 'center',
              height: 50,
            }}
            title="Done"
          />
        }
      />
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/background/background.jpg')}
        resizeMode="cover"
        blurRadius={2}>
        <ScrollView style={{backgroundScrollViewColor: 'white'}}>
          <View style={styles.container}>
            <View style={{flex: 1}}>
              <ProgressSteps
                activeStepIconBorderColor="#f7862a"
                activeLabelColor="#f7862a"
                activeStepNumColor="white"
                labelColor="white"
                completedProgressBarColor="#f7862a"
                completedStepIconColor="#f7862a"
                completedLabelColor="#f7862a"
                disabledStepNumColor="black">
                <ProgressStep
                  label="Information"
                  nextBtnText="Continue"
                  nextBtnTextStyle={{
                    color: 'white',
                    fontSize: 20,
                  }}
                  onNext={handleNextInfo}
                  errors={InfoError}>
                  <Card containerStyle={styles.cardContainer}>
                    <View style={styles.Inputcontainer}>
                      <TextInput
                        style={{marginTop: 10}}
                        theme={{
                          colors: {
                            primary: '#f7862a',
                            background: 'white',
                            underlineColor: 'transparent',
                          },
                        }}
                        mode="flat"
                        label="First name"
                        onChangeText={text => {
                          setfirstname(text), setErrorMessageFirstname(false);
                        }}
                        error={errorMessageFirstname}
                        value={firstname}
                      />
                      <HelperText type="error" visible={errorMessageFirstname}>
                        {firstnameerror}
                      </HelperText>
                      <TextInput
                        style={{marginTop: 10}}
                        theme={{
                          colors: {
                            primary: '#f7862a',
                            background: 'white',
                            underlineColor: 'transparent',
                          },
                        }}
                        mode="flat"
                        label="Middle name"
                        onChangeText={text => setmiddlename(text)}
                        value={middlename}
                      />
                      <HelperText type="error" visible={false}>
                        {middlenameerror}
                      </HelperText>
                      <TextInput
                        style={{marginTop: 10}}
                        theme={{
                          colors: {
                            primary: '#f7862a',
                            background: 'white',
                            underlineColor: 'transparent',
                          },
                        }}
                        mode="flat"
                        label="Last name"
                        error={errorMessageLastname}
                        onChangeText={text => (
                          setlastname(text), setErrorMessageLastname(false)
                        )}
                        value={lastname}
                      />
                      <HelperText type="error" visible={errorMessageLastname}>
                        {lastnameerror}
                      </HelperText>
                    </View>
                  </Card>
                </ProgressStep>
                <ProgressStep
                  label="Credentials"
                  previousBtnTextStyle={{color: 'white', fontSize: 20}}
                  nextBtnTextStyle={{
                    color: 'white',
                    fontSize: 20,
                  }}
                  onSubmit={() => handleSubmitCredentials()}>
                  <Card containerStyle={styles.cardContainer}>
                    <TextInput
                      theme={{
                        colors: {
                          primary: '#f7862a',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      label="Email"
                      error={emailErrorMessage}
                      onChangeText={text => validate(text)}
                      value={email}
                    />
                    <HelperText type="error" visible={emailErrorMessage}>
                      Email not valid
                    </HelperText>

                    <TextInput
                      render={props => (
                        <TextInputMask
                          {...props}
                          type={'cel-phone'}
                          options={{
                            maskType: 'INTERNATIONAL',
                            dddMask: '(63) ',
                          }}
                          value={mobile}
                          onChangeText={text => setmobile(text)}
                          ref={unmaskedmobile}
                        />
                      )}
                      mode="flat"
                    />

                    <TextInput
                      theme={{
                        colors: {
                          primary: '#f7862a',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      label="Username"
                      error={errorUsernameMessage}
                      onChangeText={text => handleUsernameExist(text)}
                      value={username}
                    />
                    <HelperText type="error" visible={errorUsernameMessage}>
                      {errorUsernameMessage}
                    </HelperText>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={{
                          width: '85%',
                        }}>
                        <TextInput
                          theme={{
                            colors: {
                              primary: '#f7862a',
                              background: 'white',
                              underlineColor: 'transparent',
                            },
                          }}
                          mode="flat"
                          label="Password"
                          secureTextEntry={showpass}
                          error={errorMessage}
                          onChangeText={text => handlePassword(text)}
                          value={password}
                        />
                        <HelperText type="error" visible={errorMessage}>
                          {passworderrormessage}
                        </HelperText>
                      </View>
                      <View
                        style={{
                          width: '25%',
                        }}>
                        <TouchableHighlight
                          underlayColor="white"
                          style={{
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 55,
                            height: 55,
                            backgroundColor: '#fff',
                            borderRadius: 50,
                          }}
                          onPress={showpassword}>
                          {iconpass ? (
                            <Icon name="visibility" />
                          ) : (
                            <Icon name="visibility-off" />
                          )}
                        </TouchableHighlight>
                      </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={{
                          width: '85%',
                        }}>
                        <TextInput
                          theme={{
                            colors: {
                              primary: '#f7862a',
                              background: 'white',
                              underlineColor: 'transparent',
                            },
                          }}
                          mode="flat"
                          label="Confirm Password"
                          secureTextEntry={showpass}
                          error={errorMessage}
                          secureTextEntry={showconfirmpass}
                          onChangeText={text => handleConfirmPassword(text)}
                          value={confirmpassword}
                        />
                        <HelperText type="error" visible={errorMessage}>
                          {passworderrormessage}
                        </HelperText>
                      </View>
                      <View
                        style={{
                          width: '25%',
                        }}>
                        <TouchableHighlight
                          underlayColor="white"
                          style={{
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 55,
                            height: 55,
                            backgroundColor: '#fff',
                            borderRadius: 50,
                          }}
                          onPress={showconfirmpassword}>
                          {iconconfirmpass ? (
                            <Icon name="visibility" />
                          ) : (
                            <Icon name="visibility-off" />
                          )}
                        </TouchableHighlight>
                      </View>
                    </View>
                  </Card>
                </ProgressStep>
              </ProgressSteps>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default SignUp;
