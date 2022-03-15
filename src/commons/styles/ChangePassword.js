import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFFF',
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  passwordWrapper: {
    position: 'relative',
    height: 50,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#393939',
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  inputPassword: {
    paddingLeft: 15,
    paddingRight: 55,
    fontSize: 15,
  },
  showPassword: {
    position: 'absolute',
    left: 'auto',
    right: 15,
    top: 13,
  },
  txtShowPassword: {fontSize: 15, color: 'blue'},
  buttonYellow: {
    backgroundColor: '#FFCD61',
    padding: 15,
    marginTop: 150,
    borderRadius: 10,
    marginVertical: 10,
  },
  textButtonYellow: {
    color: '#393939',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    height: 22,
  },
  indicatorWrapper: {
    height: 22,
  },
});
export default styles;
