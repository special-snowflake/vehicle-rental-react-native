import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  headerWrapper: {
    width: '100%',
    height: 100,
    position: 'relative',
    marginBottom: 20,
  },
  searchInput: {padding: 15, borderBottomWidth: 1},
  searchIcon: {
    position: 'absolute',
    left: 'auto',
    right: 15,
    top: 20,
  },
  filterButtonWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: 15,
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#616167',
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
});
export default styles;
