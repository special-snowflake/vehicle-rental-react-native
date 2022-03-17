import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import CardFavourite from '../commons/components/CardFavourite';
import {getFavourtie} from '../modules/utils/favourite';
import {useSelector} from 'react-redux';
// import {} from '../modules/utils/'

const Favourite = ({navigation}) => {
  const user = useSelector(state => state.auth.userData);
  const isFocused = useIsFocused();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!data) {
      // setIsLoading(true);
      // searchVehicle('?keyword=&sort=asc&limit=5')
      getFavourtie(user.token)
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
  useEffect(() => {
    getFavourtie(user.token)
      .then(res => {
        setData(res.data.data);
        console.log('result fav', res);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [isFocused]);
  const handleCb = isSuccess => {
    if (!isSuccess) {
      console.log('failed delete fav');
    }
    if (isSuccess) {
      console.log('sucess del fav');
      setIsLoading(true);
      getFavourtie(user.token)
        .then(res => {
          setData(res.data.data);
          console.log('result fav', res);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  console.log('this is data', data);
  return (
    <ScrollView style={{backgroundColor: '#FFFF', padding: 15}}>
      <Text style={{textAlign: 'center', fontSize: 16, marginVertical: 20}}>
        Tap Love to Unlike
      </Text>
      {!isLoading ? (
        <>
          <View style={{marginVertical: 15}}>
            <CardFavourite navigation={navigation} data={data} cb={handleCb} />
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
