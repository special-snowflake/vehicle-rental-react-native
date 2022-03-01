import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  viewScroll: {
    position: 'relative',
    backgroundColor: 'white',
    minHeight: height,
  },
  profileHeader: {
    width: '100%',
    height: 100,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    shadowOffset: {width: 0, height: 3},
    shadowColor: '#000000',
    shadowOpacity: 1,
    elevation: 1,
    marginBottom: 10,
  },
  marginLoading: {
    marginVertical: 50,
  },
  imageWrapper: {
    marginRight: 20,
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {width: 50, height: 50, borderRadius: 25},
  nameWrapper: {
    height: '100%',
    flex: 5,
    display: 'flex',
    justifyContent: 'center',
  },
  name: {fontWeight: 'bold', fontSize: 16},
  menuWrapper: {
    height: 50,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {flex: 1},
  menuTextContent: {fontWeight: 'bold', fontSize: 15},
  menuImageWrapper: {flex: 1, position: 'relative'},
  menuImage: {width: 8, height: 15, position: 'absolute', right: 0},
  buttonLogout: {
    padding: 15,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCD61',
  },
  buttonText: {fontWeight: 'bold', fontSize: 17, flex: 1},
});
export default styles;
