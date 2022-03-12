import {StyleSheet} from 'react-native';
// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  scrollView: {backgroundColor: '#FFFF', padding: 15},
  menuWrapper: {
    height: 50,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 15,
    // backgroundColor: 'red',
  },
  menuText: {flex: 1},
  menuTextContent: {fontWeight: 'bold', fontSize: 16},
  menuImageWrapper: {
    flex: 2,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'lightblue',
  },
  pickerWrapper: {
    position: 'absolute',
    right: -15,
    width: '90%',
    height: 50,
    // backgroundColor: 'lightblue',
    textAlign: 'right',
  },
  menuImage: {width: 8, height: 15, position: 'absolute', right: 0},
  menuImageDown: {width: 15, height: 8, position: 'absolute', right: 0},
  selectedItem: {
    fontSize: 15,
    height: 20,
    position: 'absolute',
    right: 17,
  },
  resetButton: {
    marginRight: 15,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#EDEDED',
    borderRadius: 7,
  },
  fs16: {fontSize: 16},
  btnYellow: {
    marginTop: 150,
    padding: 16,
    backgroundColor: '#FFCD61',
    borderRadius: 10,
  },
  btnYellowLessMargin: {
    marginTop: 99,
    padding: 16,
    backgroundColor: '#FFCD61',
    borderRadius: 10,
  },
  textBtnYellow: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#393939',
  },
  marginLoading: {
    marginVertical: 50,
  },
  inputPriceWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  inputPrice: {
    borderWidth: 1,
    width: '45%',
    borderRadius: 8,
    textAlign: 'center',
  },
  inputPriceDevider: {
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 15,
  },
});
export default styles;
