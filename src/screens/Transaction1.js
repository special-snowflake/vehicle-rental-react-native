import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../commons/styles/Transaction';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';
import {getUserDetail} from '../modules/utils/user';

const Transaction1 = ({navigation, dataVehicle}) => {
  const [detailUser, setDetailUser] = useState(null);
  const user = useSelector(state => state.auth.userData);
  useEffect(() => {
    if (detailUser === null) {
      getUserDetail(user.id).then(res => {
        setDetailUser(res.data.data);
        console.log('detail user', res.data.data);
      });
    }
  });
  return (
    <>
      <ScrollView style={styles.scrollView}>
        {detailUser !== null ? (
          <>
            <View style={styles.pageWrapper}>
              <View style={styles.pageActive}>
                <Text style={styles.pageText}>1</Text>
              </View>
              <View style={styles.pageNonActive}>
                <Text style={styles.pageText}>2</Text>
              </View>
              <View style={styles.pageNonActive}>
                <Text style={styles.pageText}>3</Text>
              </View>
            </View>
            <TextInput style={styles.inputField} placeholder="ID card number" />
            <TextInput
              style={styles.inputField}
              placeholder="Name"
              defaultValue={detailUser.full_name}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Mobile phone (must be active)"
              defaultValue={detailUser.phone !== '' && detailUser.phone}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Email Address"
              defaultValue={detailUser.email}
            />
            <TouchableOpacity style={styles.inputSelect}>
              <Picker>
                <Picker.Item label="Prepayment (No Tax)" value={'Prepayment'} />
                <Picker.Item
                  label="Pay At The End (Include Tax)"
                  value={'Pay At The End'}
                />
                <Picker.Item
                  label="Partial Payment (Include Tax)"
                  value={'Partial Payment'}
                />
              </Picker>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonYellow}
              onPress={() => {
                navigation.navigate('Transaction2');
              }}>
              <Text style={styles.textButtonYellow}>See Order Details</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.marginLoading}>
            <ActivityIndicator size="large" color="#FFCD61" />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Transaction1;
