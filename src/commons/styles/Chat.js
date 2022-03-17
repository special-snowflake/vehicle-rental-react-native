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
  previewText: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 5,
  },
  indicatorChat: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#FFCD61',
    // flex: 2,
  },
  endOfList: {textAlign: 'center', marginTop: 50, fontSize: 15},
  buttonYellow: {
    backgroundColor: '#FFCD61',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  textButtonYellow: {
    color: '#393939',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginInfo: {textAlign: 'center', fontSize: 18, marginVertical: 50},
});
export default styles;
