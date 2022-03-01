import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  viewScroll: {backgroundColor: 'white', padding: 15},
  headerWrapper: {
    height: 70,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {fontWeight: 'bold', fontSize: 20},
  subtitleWrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  contentListWrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  contentImageWrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  contentImage: {height: 90, width: 120, borderRadius: 10},
  checkboxWrapper: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  textRight: {
    textAlign: 'right',
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
