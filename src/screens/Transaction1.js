import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../commons/styles/Transaction';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';
import {getUserDetail} from '../modules/utils/user';
import {customToast} from '../modules/helpers/toast';

const Transaction1 = ({navigation, route}) => {
  console.log(route);
  const [detailUser, setDetailUser] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Prepayment');
  const user = useSelector(state => state.auth.userData);
  useEffect(() => {
    if (detailUser === null) {
      getUserDetail(user.id).then(res => {
        const data = res.data.data;
        setName(data.full_name);
        setPhone(data.phone);
        setEmail(data.email);
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
            <TextInput
              style={styles.inputField}
              placeholder="ID card number"
              onChange={text => {
                setIdCard(text.nativeEvent.text);
              }}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Name"
              defaultValue={name}
              onChange={text => {
                setName(text.nativeEvent.text);
              }}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Mobile phone (must be active)"
              keyboardType="number-pad"
              defaultValue={phone !== '' && phone}
              onChange={text => {
                setPhone(text.nativeEvent.text);
              }}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Email Address"
              keyboardType="email-address"
              onChange={text => {
                setEmail(text.nativeEvent.text);
              }}
              defaultValue={email}
            />
            <TouchableOpacity style={styles.inputSelect}>
              <Picker
                selectedValue={paymentMethod}
                onValueChange={val => {
                  console.log(val);
                  setPaymentMethod(val);
                }}>
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
                if (
                  !idCard ||
                  idCard === '' ||
                  !name ||
                  name === '' ||
                  !phone ||
                  phone === '' ||
                  !email ||
                  email === ''
                ) {
                  customToast(ToastAndroid, 'Fill all the field to continue');
                } else {
                  const params = {
                    ...route.params,
                    idCardNumber: idCard,
                    name,
                    phone,
                    email,
                    paymentMethod,
                    userId: user.id,
                  };
                  navigation.navigate('Transaction2', params);
                }
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
