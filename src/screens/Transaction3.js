import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import React, {useEffect, useState} from 'react';

import styles from '../commons/styles/Transaction';
import {
  generateBookingCode,
  generatePaymentCode,
  grabLocalYMD,
  numberToRupiah,
} from '../modules/helpers/collection';
import {customToast} from '../modules/helpers/toast';
import {useSelector} from 'react-redux';
import {addHistory} from '../modules/utils/history';

const Transaction3 = ({navigation, route}) => {
  const user = useSelector(state => state.auth.userData);
  console.log('params t3', route);
  const {params} = route;
  const [paymentCode, setPaymentCode] = useState(null);
  const [bookingCode, setBookingCode] = useState(null);
  useEffect(() => {
    if (paymentCode === null || bookingCode === null) {
      setPaymentCode(generatePaymentCode());
      setBookingCode(generateBookingCode(params.dataVehicle.name));
    }
  }, [paymentCode, setPaymentCode, bookingCode, setBookingCode, params]);
  const copyToClipboard = str => {
    console.log(str);
    if (typeof str !== 'string') {
      str = String(str);
    }
    Clipboard.setString(str);
  };
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
        {/* <Timer /> */}
        <Text style={styles.payBefore}>1:59:20</Text>
        <Text style={styles.textPaymentCode}>Bank account information :</Text>
        <Text style={styles.bankAcc}>2020-1212-30219</Text>
      </View>
      <View style={styles.detailInfoWrapper}>
        <Text style={styles.bookingCodeWrapper}>
          Booking code : <Text style={styles.textGreen}>{bookingCode}</Text>
        </Text>
        <Text style={styles.textInfoMid}>
          Use booking code to pick up your vehicle
        </Text>
        <View style={styles.copyBtnWrapper}>
          <TouchableOpacity
            style={{...styles.buttonYellow, ...styles.buttonClip}}
            onPress={() => {
              customToast(ToastAndroid, 'Code Payment Copied');
              copyToClipboard(paymentCode);
            }}>
            <Text style={{...styles.textButtonYellow, ...styles.fs16}}>
              Copy Payment Code
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.copyBtnWrapper}>
          <TouchableOpacity
            style={{...styles.buttonYellow, ...styles.buttonClip}}
            onPress={() => {
              customToast(ToastAndroid, 'Code Booking Copied');
              copyToClipboard(bookingCode);
            }}>
            <Text style={{...styles.textButtonYellow, ...styles.fs16}}>
              Copy Booking Code
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.fs16}>Order Details:</Text>
        <Text style={styles.fs16}>
          {params.counter} {params.dataVehicle.name}
        </Text>
        <Text style={styles.fs16}>{params.paymentMethod}</Text>
        <Text style={styles.fs16}>
          {params.day} {params.day !== '1' ? 'days' : 'day'}
        </Text>
        <Text style={styles.fs16}>
          {params.startDate.slice(4, 15)} to {params.endDate.slice(4, 15)}
        </Text>
      </View>
      <View style={styles.priceBig}>
        <Text style={styles.priceText}>
          Rp. {numberToRupiah(params.totalPrice)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.buttonYellow}
        onPress={() => {
          const dateStart = new Date(params.startDate);
          const rental_date = grabLocalYMD(dateStart);
          const dateEnd = new Date(params.endDate);
          const return_date = grabLocalYMD(dateEnd);

          const body = {
            user_id: params.userId,
            id_card: params.idCardNumber,
            full_name: params.name,
            email: params.email,
            phone: params.phone,
            vehicle_id: params.dataVehicle.id,
            rental_date,
            return_date,
            unit: params.counter,
            payment_code: paymentCode,
            booking_code: bookingCode,
            payment_method: params.paymentMethod,
            return_status: 'Not Returned',
            total_payment: params.totalPrice,
          };
          addHistory(body, user.token)
            .then(res => {
              customToast(ToastAndroid, 'Reservation Success');
              console.log(res);
              const id = res.data.data.id;
              navigation.navigate('DetailHistory', id);
            })
            .catch(err => {
              customToast(ToastAndroid, 'Something went wrong');
              console.log(err);
            });
          console.log(body);
          // navigation.navigate('Transaction2');
        }}>
        <Text style={styles.textButtonYellow}>Finish Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Transaction3;
