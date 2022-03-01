import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {searchHistory} from '../modules/utils/history';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import styles from '../commons/styles/History';
import {numberToRupiah} from '../modules/helpers/collection';
import CardHistory from '../commons/components/CardHistory';
const defaultVehicle = require('../commons/assets/images/car-default.jpg');
const imghost = process.env.URL_API + '/vehicles';
const History = () => {
  const user = useSelector(state => state.auth.userData);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    keyword: '',
    page: 1,
  });
  const [history, setHistory] = useState([]);
  const getHistory = () => {
    const token = user.token;
    console.log(token);
    const newFilter = `?keyword=&page=${filter.page}`;
    searchHistory(newFilter, token)
      .then(res => {
        console.log(res.data.data, res['data']['data'].length);
        setHistory(res.data.data);
        setMeta(res.data.meta);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const showPagination = () => {
    const elements = [];
    console.log('pagination meta', meta);
    for (let i = 1; i < meta.totalPage + 1; i++) {
      elements.push(
        <>
          <TouchableOpacity
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...styles.paginationWrapper,
              backgroundColor: i === filter.page ? '#ededed' : '#FFCD61',
            }}
            key={`pagination-${i}`}
            onPress={() => {
              if (i !== filter.page) {
                const newFilter = {...filter, page: i};
                setFilter(newFilter);
              }
            }}>
            <Text style={styles.paginationButton}>{i}</Text>
          </TouchableOpacity>
        </>,
      );
    }
    return elements;
  };

  useEffect(() => {
    getHistory();
  }, []);
  useEffect(() => {
    setIsLoading(true);
    getHistory();
  }, [filter.page]);
  return (
    <ScrollView style={styles.viewScroll}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>History Order</Text>
      </View>
      <View style={styles.subtitleWrapper}>
        <View style={{flex: 3}}>
          <Text style={{textAlign: 'center'}}>A Week Ago</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.textRight}>Select</Text>
        </View>
      </View>
      {history.length > 0 && !isLoading ? (
        <>
          <CardHistory data={history} />
          <View style={styles.pageWrapper}>{showPagination()}</View>
        </>
      ) : (
        <View style={{marginVertical: 50}}>
          <ActivityIndicator size="large" color="#FFCD61" />
        </View>
      )}
    </ScrollView>
  );
};

export default History;
