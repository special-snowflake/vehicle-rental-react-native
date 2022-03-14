import {Dimensions, StyleSheet} from 'react-native';
// const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  headerWrapper: {paddingTop: 50},
  header: {
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold',
    lineHeight: 45,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  main: {
    padding: 10,
    margin: 0,
    height: height,
  },
  inputWrapper: {
    marginTop: 150,
    marginHorizontal: 5,
  },
  inputForm: {
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    height: 50,
    // opacity: 0.75,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginBottom: 15,
    fontSize: 16,
  },
  inputPassword: {
    position: 'relative',
    // paddingRight: 50,
  },
  showWrapper: {
    position: 'absolute',
    top: 0,
    left: 'auto',
    right: 0,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  showButton: {color: 'blue'},
  forget: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    textDecorationColor: '#FFFFFF',
    marginBottom: 20,
  },
  btnYellow: {
    backgroundColor: '#FFCD61',
    borderRadius: 5,
    fontWeight: 'bold',
    color: '#393939',
    padding: 15,
    marginBottom: 20,
  },
  btnText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  signupWrapper: {
    color: 'white',
    textAlign: 'center',
  },
  signup: {
    textDecorationColor: '#FFFF',
    textDecorationLine: 'underline',
  },
  mv30: {marginVertical: 30},
  indicatorWrapper: {
    height: 25,
  },
});

export default styles;
