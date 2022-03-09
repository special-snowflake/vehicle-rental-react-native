import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import styles from '../commons/styles/Transaction';
import {numberToRupiah} from '../modules/helpers/collection';

const Transaction2 = ({navigation}) => {
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
          source={require('../commons/assets/images/car-default.jpg')}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}>
        <Text style={styles.textInfo}>2 Vespa</Text>
        <Text style={styles.textInfo}>Prepayment (no tax)</Text>
        <Text style={styles.textInfo}>4 days</Text>
        <Text style={styles.textInfo}>Jan 18 2021</Text>
        <View
          style={{
            marginTop: 20,
            borderBottomWidth: 1,
            borderColor: '#EDEDED',
          }}></View>
      </View>
      <View style={{paddingHorizontal: 15, marginBottom: 20}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>
          Rp. {numberToRupiah(250000)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.buttonYellow}
        onPress={() => {
          navigation.navigate('Transaction3');
        }}>
        <Text style={styles.textButtonYellow}>Get Payment Code</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Transaction2;
