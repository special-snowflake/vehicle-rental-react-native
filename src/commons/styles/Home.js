import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  marginLoading: {
    marginTop: 50,
  },
  backgroundWhite: {
    backgroundColor: 'white',
  },
  jumboTronWrapper: {
    height: 250,
    width: width,
    margin: 0,
    padding: 0,
    position: 'relative',
  },
  jumboTron: {
    padding: 0,
    height: '100%',
    width: '100%',
  },
  inputSearch: {
    position: 'absolute',
    top: 35,
    left: 20,
    right: 20,
    padding: 15,
    paddingRight: 40,
    color: '#FFFFFF',
    borderRadius: 8,
    backgroundColor: '#000000B3',
    // opacity: 0.7,
  },
  addNewItem: {
    position: 'absolute',
    top: 110,
    left: 20,
    right: 20,
    padding: 15,
    paddingRight: 40,
    color: '#FFFFFF',
    borderRadius: 8,
    backgroundColor: '#FFCD61',
    // opacity: 0.7,
  },
  searchLogo: {
    position: 'absolute',
    top: 50,
    left: 'auto',
    right: 30,
    width: 25,
    height: 25,
  },
  listWrapper: {
    width: width,
    height: 200,
    padding: 10,
  },
  cardWrapper: {
    width: width,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  itemHeader: {
    flex: 2,
    // backgroundColor: 'lightblue',
    fontWeight: 'bold',
    fontSize: 18,
  },
  more: {
    flex: 1,
    // backgroundColor: 'grey',
    textAlign: 'right',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
  cardVehicles: {
    width: 250,
    height: 170,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 10,
  },
});
export default styles;
