import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  scrollView: {backgroundColor: 'white', paddingHorizontal: 15},
  searchInput: {
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: '#ededed',
    borderRadius: 10,
    marginBottom: 20,
  },
  chatListWrapper: {
    marginVertical: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
  chatWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {fontSize: 15, fontWeight: 'bold'},
  fs15: {fontSize: 15},
  previewWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  previewText: {fontSize: 15, fontWeight: 'bold'},
  indicatorChat: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#FFCD61',
  },
  endOfList: {textAlign: 'center', marginTop: 50, fontSize: 15},
});
export default styles;
