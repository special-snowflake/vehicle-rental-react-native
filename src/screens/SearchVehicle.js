import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {serialize} from '../modules/helpers/serialize';
import {searchVehicle} from '../modules/utils/vehicles';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CategoryCard from '../commons/components/CategoryCard';
import styles from '../commons/styles/SearchVehicle';

const SearchVehicle = ({navigation, route}) => {
  console.log(navigation, route.params);
  const [isLoading, setIsLoading] = useState(true);
  const [searchField, setSearchField] = useState(route.params || '');
  const [list, setList] = useState([]);
  const [meta, setMeta] = useState(null);
  const [filter, setFilter] = useState({
    keyword: route.params || '',
    limit: 5,
    page: 1,
    sort: 'asc',
  });

  useEffect(() => {
    console.log(filter);
    const newFilter = '?' + serialize(filter);
    searchVehicle(newFilter)
      .then(res => {
        setList(res.data.data);
        setMeta(res.data.meta);
        setIsLoading(false);
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    const newFilter = '?' + serialize(filter);
    searchVehicle(newFilter)
      .then(res => {
        setList(res.data.data);
        setMeta(res.data.meta);
        setIsLoading(false);
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, [filter.keyword, filter.page]);

  const debounce = (func, timeout = 2000) => {
    let timer;
    console.log('debounce');
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log('debounce done');
        func.apply(this, args);
      }, timeout);
    };
  };
  const showPagination = () => {
    const elements = [];
    console.log('pagination meta', meta);
    for (let i = 1; i < meta.totalPage + 1; i++) {
      elements.push(
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
              setIsLoading(true);
            }
          }}>
          <Text style={styles.paginationButton}>{i}</Text>
        </TouchableOpacity>,
      );
    }
    return elements;
  };
  const searchHandler = () => {
    const newKeyword = searchField;
    const newFilter = {...filter, keyword: newKeyword, page: 1};
    setFilter(newFilter);
    setIsLoading(true);
  };
  console.log(filter);
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.headerWrapper}>
        <TextInput
          placeholder="Search Vehicle"
          placeholderTextColor="#000000"
          defaultValue={filter.keyword}
          style={styles.searchInput}
          onChange={text => {
            setSearchField(text.nativeEvent.text);
          }}
          onSubmitEditing={() => {
            searchHandler();
          }}
        />
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => {
            searchHandler();
          }}>
          <Image
            source={require('../commons/assets/icons/search.png')}
            style={{width: 25, height: 25}}
            // style={styles.searchLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButtonWrapper}>
          <Image
            source={require('../commons/assets/icons/filter.png')}
            style={{width: 25, height: 25}}
          />
          <Text style={styles.filterText}>Filter Search</Text>
        </TouchableOpacity>
      </View>
      {!isLoading ? (
        <View style={{padding: 15}}>
          <CategoryCard navigation={navigation} data={list} />
          <View style={styles.pageWrapper}>{showPagination()}</View>
        </View>
      ) : (
        <View style={{marginVertical: 50}}>
          <ActivityIndicator size="large" color="#FFCD61" />
        </View>
      )}
    </ScrollView>
  );
};

export default SearchVehicle;
