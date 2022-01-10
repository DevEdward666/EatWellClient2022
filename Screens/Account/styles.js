import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 30,
  },
  viewstyle: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    fontFamily: 'SFUIDisplay-Light',
  },
  userimagestyle: {
    marginTop: 10,
    marginStart: 10,
    width: 80,
    height: 80,
    borderRadius: 200 / 2,
    overflow: 'hidden',
    borderWidth: 3,
  },
  textstyle: {
    textAlign: 'left',
    marginStart: 10,
    fontSize: 12,
    alignContent: 'center',
    fontFamily: 'SFUIDisplay-Light',
  },
  footertext: {
    textAlign: 'center',
    marginStart: 10,
    fontSize: 14,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  iconstyle: {
    height: 50,
    width: '100%',
    resizeMode: 'center',
    alignContent: 'flex-start',
  },
  userplate: {
    backgroundColor: 'rgba(255,255,355,0.4)',
    borderColor: 'rgba(255,255,355,0.4)',
    borderWidth: 0.1,
    borderRadius: 15,
  },
});

export default styles;
