import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  viewScroll: {backgroundColor: 'white', padding: 15},
  userImageWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  userImage: {width: 100, height: 100, position: 'relative'},
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  buttonWrapper: {
    position: 'absolute',
    backgroundColor: '#FFCD61',
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioF: {marginRight: 25},
  imgButton: {
    width: 20,
    height: 20,
  },
  radioWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 7,
    marginBottom: 20,
  },
  buttonSave: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginVertical: 20,
    backgroundColor: '#FFCD61',
    borderRadius: 7,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default styles;