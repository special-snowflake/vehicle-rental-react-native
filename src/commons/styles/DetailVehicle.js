import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    minHeight: height,
    width: width,
    backgroundColor: 'white',
  },
  marginLoading: {
    marginTop: 50,
  },
  jumboTronWrapper: {
    position: 'relative',
    height: 250,
    width: width,
    margin: 0,
    padding: 0,
    shadowOffset: {width: 0, height: 2}, //ios
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 5, //android
  },
  jumboTron: {
    padding: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    opacity: 1,
    width: 30,
    height: 30,
    zIndex: 5,
    backgroundColor: '#21212180',
    padding: 5,
    borderRadius: 5,
  },
  iconBack: {
    width: '100%',
    height: '100%',
  },
  contentWrapper: {padding: 10},
  headerWrapper: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  counterWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  counterButton: {
    backgroundColor: '#FFCD61',
    width: 30,
    height: 30,
    padding: 0,
    borderRadius: 30 / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLeft: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemRight: {
    flex: 1,
    textAlign: 'right',
    position: 'relative',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  textSelect: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textCenter: {textAlign: 'center', fontSize: 16, fontWeight: 'bold'},
  contentHeader: {
    fontSize: 22,
    color: 'black',
  },
  buttonYellow: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#FFCD61',
    borderRadius: 10,
  },
  buttonText: {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
  wrapperPicker: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pickerLeft: {
    padding: 12,
    marginHorizontal: 10,
    backgroundColor: 'rgba(57, 57, 57, 0.3)',
    borderRadius: 7,
    width: 200,
    height: 55,
    justifyContent: 'center',
  },
  pickerRight: {
    marginHorizontal: 10,
    backgroundColor: 'rgba(57, 57, 57, 0.3)',
    borderRadius: 7,
    width: 155,
    height: 55,
    justifyContent: 'center',
  },
});
export default styles;
