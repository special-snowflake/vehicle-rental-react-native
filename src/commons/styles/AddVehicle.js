import {StyleSheet} from 'react-native';
// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  scrollView: {backgroundColor: '#FFFFFF', paddingHorizontal: 20},
  addImageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    marginVertical: 20,
  },
  buttonBlack: {
    backgroundColor: '#393939',
    marginVertical: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textButton: {textAlign: 'center', fontSize: 16, color: '#FFCD61'},
  inputCenter: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#393939',
    marginVertical: 10,
    width: '80%',
  },
  inputTextLeft: {
    width: '100%',
  },
  label: {fontSize: 20, fontWeight: 'bold', marginVertical: 5},
  stock: {width: '60%'},
  marginLoading: {
    marginVertical: 50,
  },
  stockWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  counterWrappper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '35%',
  },
  counterBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#FFCD61',
  },
  counterBtnText: {fontSize: 20, fontWeight: 'bold'},
  counterText: {fontSize: 18, fontWeight: 'bold'},
  pickerWrapper: {
    padding: 0,
    borderWidth: 1,
    borderColor: '#393939',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonYellow: {
    backgroundColor: '#FFCD61',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonGrey: {
    backgroundColor: 'lightgrey',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  textButtonYellow: {
    color: '#393939',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default styles;
