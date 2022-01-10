import React, {useEffect, useState} from 'react';
import store from './Services/Store';
import Routes from './Hooks/Routes';
import {Provider} from 'react-redux';
import GlobalFont from 'react-native-global-font';
const App = () => {
  useEffect(() => {
    let mounted = true;
    const globalfont = () => {
      let fontName = 'SFUIDisplay-Regular';
      GlobalFont.applyGlobal(fontName);
    };
    mounted && globalfont();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;