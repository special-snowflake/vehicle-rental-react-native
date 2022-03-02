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
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 5,
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
    width: 20,
    height: 20,
    padding: 0,
    borderRadius: 20 / 2,
  },
  itemLeft: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemRight: {
    flex: 1,
    textAlign: 'right',
    // backgroundColor: 'lightgrey',
    position: 'relative',
    height: 40,
  },
  textSelect: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  textCenter: {textAlign: 'center'},
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
});
export default styles;
