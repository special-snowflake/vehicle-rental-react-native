import {StyleSheet} from 'react-native';
// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  headerWrapper: {
    width: '100%',
    height: 100,
    position: 'relative',
    marginBottom: 20,
  },
  searchInput: {
    padding: 10,
    backgroundColor: '#EDEDED',
    margin: 15,
    borderRadius: 7,
  },
  hr: {borderBottomWidth: 1, borderBottomColor: '#EDEDED'},
  searchIcon: {
    position: 'absolute',
    left: 'auto',
    right: 25,
    top: 25,
    // backgroundColor: 'red',
  },
  filterButtonWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: 15,
    width: '100%',
    height: 50,
  },
  filterText: {
    fontSize: 17,
    marginLeft: 10,
    color: '#616167',
  },
  pageWrapper: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  paginationWrapper: {
    width: 35,
    height: 35,
    marginHorizontal: 5,
    borderRadius: 3,
    textAlignVertical: 'center',
    paddingTop: 5,
  },
  paginationButton: {textAlign: 'center', textAlignVertical: 'center'},
  wh25: {width: 25, height: 25},
  p15: {paddingVertical: 25, paddingHorizontal: 15},
  marginLoading: {marginVertical: 50},
});
export default styles;
