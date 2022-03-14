import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  scrollView: {backgroundColor: '#FFFF', paddingHorizontal: 20},
  payment: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25,
    fontWeight: '600',
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 230,
    borderRadius: 15,
  },
  borderedContentWrapper: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  normalText: {fontSize: 16, lineHeight: 25},
  textGreen: {color: 'green'},
  contentInfo: {marginTop: 15, marginBottom: 15},
  buttonYellow: {
    backgroundColor: '#FFCD61',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  textButtonYellow: {
    color: '#393939',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  marginLoading: {marginVertical: 50},
});
export default styles;
