import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {serialize} from '../modules/helpers/serialize';
import {searchVehicle} from '../modules/utils/vehicles';
// import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CategoryCard from '../commons/components/CategoryCard';
import styles from '../commons/styles/SearchVehicle';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetFilterSearch,
  changeFilter as changeFilterRedux,
} from '../redux/actions/filter';

const SearchVehicle = ({navigation, route}) => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [searchField, setSearchField] = useState(filter.keyword);
  const [list, setList] = useState([]);
  const [meta, setMeta] = useState(null);

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
    console.log('res of serialize ', newFilter);
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
  }, [filter]);

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
              dispatch(changeFilterRedux(newFilter));
              // setFilter(newFilter);
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
    const newFilter = {...filter, keyword: searchField, page: 1};
    console.log('newfilter', newFilter);
    dispatch(changeFilterRedux(newFilter));
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
            style={styles.wh25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButtonWrapper}
          onPress={() => {
            navigation.navigate('SearchFilter');
          }}>
          <Image
            source={require('../commons/assets/icons/filter.png')}
            style={styles.wh25}
          />
          <Text style={styles.filterText}>Filter Search</Text>
        </TouchableOpacity>
      </View>
      {!isLoading ? (
        <View style={styles.p15}>
          <CategoryCard navigation={navigation} data={list} />
          <View style={styles.pageWrapper}>{showPagination()}</View>
        </View>
      ) : (
        <View style={styles.marginLoading}>
          <ActivityIndicator size="large" color="#FFCD61" />
        </View>
      )}
    </ScrollView>
  );
};

export default SearchVehicle;
