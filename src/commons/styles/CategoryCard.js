import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  left: {
    witdh: 140,
    height: 90,
    flex: 1,
  },
  right: {
    marginLeft: 20,
    paddingLeft: 20,
    flex: 2,
  },
  image: {height: 90, width: 140, borderRadius: 10, borderWidth: 1},
});
export default styles;
