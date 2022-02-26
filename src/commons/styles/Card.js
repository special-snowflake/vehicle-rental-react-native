import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  cardVehicles: {
    resizeMode: 'cover',
    width: 240,
    height: 150,
    marginTop: 10,
    marginLeft: 23,
    marginRight: 23,
    borderRadius: 10,
  },
});
