import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import styles from '../commons/styles/Transaction';
import {numberToRupiah} from '../modules/helpers/collection';
const defaultImage = require('../commons/assets/images/car-default.jpg');
const Transaction2 = ({navigation, route}) => {
  const {params} = route;
  const [image, setImage] = useState(defaultImage);
  const totalPrice = params.dataVehicle.price * params.day;
  const imghost = process.env.URL_API + '/vehicles';

  useEffect(() => {
    if (params.dataVehicle.images.length > 0) {
      const img = {uri: imghost + params.dataVehicle.images[0]};
      setImage(img);
    }
  }, [params, setImage, imghost]);
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pageWrapper}>
        <View style={styles.pageActive}>
          <Text style={styles.pageText}>1</Text>
        </View>
        <View style={styles.pageActive}>
          <Text style={styles.pageText}>2</Text>
        </View>
        <View style={styles.pageNonActive}>
          <Text style={styles.pageText}>3</Text>
        </View>
      </View>
      <View style={styles.imgWrapper}>
        <Image
          style={styles.transactionImage}
          source={image}
          onError={({currentTarget}) => {
            currentTarget.onerror = null;
            setImage(defaultImage);
          }}
        />
      </View>
      <View style={styles.info2Wrapper}>
        <Text style={styles.textInfo}>
          {params.counter} {params.dataVehicle.name}
        </Text>
        <Text style={styles.textInfo}>{params.paymentMethod}</Text>
        <Text style={styles.textInfo}>
          {params.day} {params.day !== '1' ? 'days' : 'day'}
        </Text>
        <Text style={styles.textInfo}>
          {params.startDate.slice(4, 15)} to {params.endDate.slice(4, 15)}
        </Text>
        <View
          style={{
            marginTop: 20,
            borderBottomWidth: 1,
            borderColor: '#EDEDED',
          }}></View>
      </View>
      <View style={{paddingHorizontal: 15, marginBottom: 20}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>
          Rp. {numberToRupiah(totalPrice)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.buttonYellow}
        onPress={() => {
          const newParams = {
            ...params,
            totalPrice,
          };
          navigation.navigate('Transaction3', newParams);
        }}>
        <Text style={styles.textButtonYellow}>Get Payment Code</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Transaction2;
