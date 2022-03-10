import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  modalCoverBottom: {
    height: '50%',
    width: '100%',
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentBottom: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#FFFF',
    height: 200,
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: '#393939',
    elevation: 5,
  },
  buttonWrapper: {flexDirection: 'row', justifyContent: 'center'},
  buttonPrimary: {
    backgroundColor: '#d7dadd',
    width: '80%',
    marginHorizontal: 'auto',
    padding: 10,
    borderRadius: 7,
    marginVertical: 7,
  },
  textBtnPrimary: {textAlign: 'center', color: '#393939', fontSize: 16},
  buttonSecondary: {
    backgroundColor: '#7a8793',
    width: '80%',
    marginHorizontal: 'auto',
    padding: 10,
    borderRadius: 7,
    marginVertical: 7,
  },
  textBtnSecondary: {textAlign: 'center', color: '#FFFF', fontSize: 16},
});
export default styles;
