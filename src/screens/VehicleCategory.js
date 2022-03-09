import {ActivityIndicator, View, Text, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import style from '../commons/styles/VehicleCategory';
import {searchVehicle} from '../modules/utils/vehicles';
import CategoryCard from '../commons/components/CategoryCard';
// import {ScrollView} from 'react-native-gesture-handler';
const imagehost = process.env.URL_API + '/vehicles';

const VehicleCategory = ({navigation, route}) => {
  const [list, setList] = useState([]);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [filter, setFilter] = useState({
    category:
      route.params === 'Motorbike' ? '3' : route.params === 'Car' ? '1' : '2',
    limit: '5',
    page: 1,
  });
  const showPagination = () => {
    const elements = [];
    console.log('pagination meta', meta);
    for (let i = 1; i < meta.totalPage + 1; i++) {
      elements.push(
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...style.paginationWrapper,
            backgroundColor: i === filter.page ? '#ededed' : '#FFCD61',
          }}
          key={`pagination-${i}`}
          onPress={() => {
            if (i !== filter.page) {
              const newFilter = {...filter, page: i};
              setFilter(newFilter);
            }
          }}>
          <Text style={style.paginationButton}>{i}</Text>
        </TouchableOpacity>,
      );
    }
    return elements;
  };
  const getList = () => {
    const newFilter = `?keyword=&category=${filter.category}&limit=${filter.limit}&page=${filter.page}&sort=asc`;
    console.log('filter');
    searchVehicle(newFilter)
      .then(res => {
        setList(res.data.data);
        setMeta(res.data.meta);
        setIsloading(false);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title: route.params,
    });
    if (meta === null) {
      getList();
    }
  }, []);
  useEffect(() => {
    getList();
    setIsloading(true);
  }, [filter.page]);
  return (
    <ScrollView style={{backgroundColor: 'white', padding: 10}}>
      {!isLoading ? (
        <>
          <CategoryCard navigation={navigation} data={list} />
          <View style={style.pageWrapper}>{showPagination()}</View>
        </>
      ) : (
        <View style={style.marginLoading}>
          <ActivityIndicator size="large" color="#FFCD61" />
        </View>
      )}
    </ScrollView>
  );
};

export default VehicleCategory;
