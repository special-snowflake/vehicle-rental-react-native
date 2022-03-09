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
    marginTop: 170,
    marginHorizontal: 5,
  },
  inputForm: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    opacity: 0.75,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginBottom: 15,
  },
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
});

export default styles;
