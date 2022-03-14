import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getHistoryDetail} from '../modules/utils/history';
import {customToast} from '../modules/helpers/toast';
import {numberToRupiah} from '../modules/helpers/collection';
import styles from '../commons/styles/DetailHistory';

const defaultImage = require('../commons/assets/images/car-default.jpg');

const DetailHistory = ({navigation, route}) => {
  const user = useSelector(state => state.auth.userData);
  const [dataHistory, setDataHistory] = useState(null);
  const [image, setImage] = useState(defaultImage);

  console.log(route.params);
  useEffect(() => {
    const imagehost = process.env.URL_API + '/vehicles';
    getHistoryDetail(route.params, user.token)
      .then(res => {
        console.log(res.data.data[0]);
        if (res.data.data[0].image) {
          const newImage = imagehost + res.data.data[0].image;
          setImage({uri: newImage});
        }
        setDataHistory(res.data.data[0]);
      })
      .catch(err => {
        console.log(err);
        customToast(ToastAndroid, 'Something went wrong, try relogin');
      });
  }, [route, user]);
  return (
    <ScrollView style={styles.scrollView}>
      {dataHistory ? (
        <>
          <Text style={styles.payment}>Payment Success!</Text>
          <View style={styles.imageWrapper}>
            <Image
              source={image}
              resizeMode="cover"
              resizeMethod="resize"
              style={styles.image}
              onError={({currentTarget}) => {
                currentTarget.onerror = null;
                setImage(defaultImage);
              }}
            />
          </View>
          <View style={styles.borderedContentWrapper}>
            <Text style={styles.normalText}>
              {dataHistory.unit} {dataHistory.vehicle_name}
            </Text>
            <Text style={styles.normalText}>{dataHistory.payment_method}</Text>
            <Text style={styles.normalText}>
              {dataHistory.rental_date.slice(0, 10)} to{' '}
              {dataHistory.return_date.slice(0, 10)}
            </Text>
          </View>
          <View style={styles.contentInfo}>
            <Text style={styles.normalText}>ID : {dataHistory.id_card}</Text>
            <Text style={styles.normalText}>
              {dataHistory.full_name} ({dataHistory.email})
            </Text>
            <Text style={styles.normalText}>
              {dataHistory.phone} (<Text style={styles.textGreen}>active</Text>)
            </Text>
            <Text style={styles.normalText}>{dataHistory.city}, Indonesia</Text>
          </View>
          <View style={styles.buttonYellow}>
            <Text style={styles.textButtonYellow}>
              Total : {numberToRupiah(parseInt(dataHistory.total_payment))}
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.marginLoading}>
          <ActivityIndicator size="large" color="#FFCD61" />
        </View>
      )}
    </ScrollView>
  );
};

export default DetailHistory;
