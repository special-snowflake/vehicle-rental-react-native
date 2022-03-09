import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import styles from '../commons/styles/Transaction';
import {
  generateBookingCode,
  generatePaymentCode,
  numberToRupiah,
} from '../modules/helpers/collection';
const Transaction3 = ({navigation}) => {
  const [paymentCode, setPaymentCode] = useState(null);
  const [bookingCode, setBookingCode] = useState(null);

  useEffect(() => {
    if (paymentCode === null || bookingCode === null) {
      setPaymentCode(generatePaymentCode());
      setBookingCode(generateBookingCode('Aventador'));
    }
  }, [paymentCode, setPaymentCode, bookingCode, setBookingCode]);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pageWrapper}>
        <View style={styles.pageActive}>
          <Text style={styles.pageText}>1</Text>
        </View>
        <View style={styles.pageActive}>
          <Text style={styles.pageText}>2</Text>
        </View>
        <View style={styles.pageActive}>
          <Text style={styles.pageText}>3</Text>
        </View>
      </View>

      <View style={styles.paymentCodeWrapper}>
        <Text style={styles.textPaymentCode}>Payment Code:</Text>
        <Text style={styles.textCodePayment}>{paymentCode}</Text>
        <Text style={styles.textPaymentCode}>
          Insert your payment code while you transfer booking order
        </Text>
        <Text style={styles.textPaymentCode}>Pay before :</Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: 'red',
            marginVertical: 10,
          }}>
          1:59:20
        </Text>
        <Text style={styles.textPaymentCode}>Bank account information :</Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 'bold',
            marginVertical: 10,
          }}>
          2020-1212-30219
        </Text>
      </View>
      <View
        style={{
          margin: 15,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ededed',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            marginVertical: 10,
          }}>
          Booking code : <Text style={{color: 'green'}}>{bookingCode}</Text>
        </Text>
        <Text style={{textAlign: 'center', fontSize: 16}}>
          Use booking code to pick up your vehicle
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{...styles.buttonYellow, padding: 10, width: '80%'}}>
            <Text style={{...styles.textButtonYellow, fontSize: 16}}>
              Copy Payment Code
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={{...styles.buttonYellow, padding: 10, width: '80%'}}>
            <Text style={{...styles.textButtonYellow, fontSize: 16}}>
              Copy Booking Code
            </Text>
          </TouchableOpacity>
        </View>
        <Text>Order Details:</Text>
        <Text>2 Vespa</Text>
        <Text>Prepayment (no tax)</Text>
        <Text>4 days</Text>
        <Text>Jan 18</Text>
      </View>
      <View style={{paddingHorizontal: 15, marginBottom: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
          Rp. {numberToRupiah(250000)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.buttonYellow}
        onPress={() => {
          navigation.navigate('Transaction2');
        }}>
        <Text style={styles.textButtonYellow}>Finish Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Transaction3;
