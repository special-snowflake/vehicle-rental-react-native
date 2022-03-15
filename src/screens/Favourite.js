import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import CardFavourite from '../commons/components/CardFavourite';
import {searchVehicle} from '../modules/utils/vehicles';

const Favourite = ({navigation}) => {
  const [data, setData] = useState(null);
  const [isLodaing, setIsLoading] = useState(true);
  useFocusEffect(() => {
    if (!data) {
      // setIsLoading(true);
      searchVehicle('?keyword=&sort=asc&limit=5')
        .then(res => {
          setData(res.data.data);
          console.log('result fav', res);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
  console.log('this is data', data);
  return (
    <ScrollView style={{backgroundColor: '#FFFF', padding: 15}}>
      <Text style={{textAlign: 'center', fontSize: 16, marginVertical: 20}}>
        Tap Love to Unlike
      </Text>
      {!isLodaing ? (
        <>
          <View style={{marginVertical: 15}}>
            <CardFavourite navigation={navigation} data={data} />
          </View>
        </>
      ) : (
        <View style={{marginVertical: 50}}>
          <ActivityIndicator size="large" color="#FFCD61" />
        </View>
      )}
    </ScrollView>
  );
};

export default Favourite;
