import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  scrollView: {backgroundColor: 'white'},
  pageWrapper: {
    marginVertical: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  marginLoading: {
    marginTop: 50,
  },
  pageActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#FFCD61',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNonActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#ededed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageText: {fontSize: 18, color: 'white'},
  inputField: {
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: '#ededed',
    borderRadius: 10,
    fontSize: 16,
    marginVertical: 10,
  },
  inputSelect: {
    marginHorizontal: 15,
    backgroundColor: '#ededed',
    borderRadius: 10,
    fontSize: 16,
    marginVertical: 10,
  },
  buttonBlack: {
    backgroundColor: '#393939',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  textButtonBlack: {
    color: '#FFCD61',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonYellow: {
    backgroundColor: '#FFCD61',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  textButtonYellow: {
    color: '#393939',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imgWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
  },
  transactionImage: {width: '85%', height: 200, borderRadius: 15},
  textInfo: {lineHeight: 30, fontSize: 16},
  paymentCodeWrapper: {
    margin: 15,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  textPaymentCode: {textAlign: 'center', fontSize: 16},
  textCodePayment: {
    textAlign: 'center',
    fontSize: 22,
    marginVertical: 10,
    fontWeight: 'bold',
  },
});
export default styles;