import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../commons/styles/SearchFilter';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetFilterSearch,
  changeFilter as changeFilerRedux,
} from '../redux/actions/filter';

import {getCategory} from '../modules/utils/category';
import {getCity} from '../modules/utils/city';
import {Picker} from '@react-native-picker/picker';

const nextIcon = require('../commons/assets/icons/next.png');
const downIcon = require('../commons/assets/icons/down.png');

const SearchFilter = ({navigation}) => {
  const filter = useSelector(state => state.filter);
  const [listCategory, setListCategory] = useState(null);
  const [listCity, setListCity] = useState(null);
  const [dataFilter, setDataFilter] = useState(filter);
  const [selectedLocation, setSelectedLocation] = useState(filter.city);
  const [selectedCategory, setSelectedCategory] = useState(filter.category);
  const [selectedOrderBy, setSelectedOrderBy] = useState(filter.orderBy);
  const [selectedSort, setSelectedSort] = useState(filter.sort);
  const [price, setPrice] = useState({
    priceMin: filter.priceMin,
    priceMax: filter.priceMax,
  });
  const [showPicker, setShowPicker] = useState({
    location: false,
    type: false,
    order: false,
    sort: false,
    price: false,
  });

  const dispatch = useDispatch();
  const changeShow = key => {
    const value = !showPicker[key];
    console.log(showPicker[key]);
    const tmp = {...showPicker, [key]: value};
    setShowPicker(tmp);
  };

  const changeFilter = (key, value) => {
    setDataFilter({...dataFilter, [key]: value});
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => {
            dispatch(resetFilterSearch());
            console.log('reset page');
            navigation.navigate('SearchVehicle');
          }}>
          <Text style={styles.fs16}>Reset</Text>
        </TouchableOpacity>
      ),
    });
    if (listCity === null && listCategory === null) {
      getCategory()
        .then(res => {
          console.log(res);
          setListCategory(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
      getCity()
        .then(res => {
          console.log(res);
          setListCity(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

  return (
    <ScrollView style={styles.scrollView}>
      {listCategory !== null && listCity !== null ? (
        <>
          <View style={styles.menuWrapper}>
            <View style={{...styles.menuText}}>
              <Text style={styles.menuTextContent}>Location</Text>
            </View>
            <View style={styles.menuImageWrapper}>
              <View style={styles.pickerWrapper}>
                <Picker
                  accessibilityLabel="Select Location"
                  selectedValue={selectedLocation}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedLocation(itemValue);
                    changeFilter('city', itemValue);
                  }}>
                  <Picker.Item label={'All'} value="" />
                  {listCity.map((element, idx) => {
                    return (
                      <Picker.Item
                        label={element.city}
                        value={element.id}
                        key={`city-${idx}`}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.menuWrapper}>
            <View style={styles.menuText}>
              <Text style={styles.menuTextContent}>Type</Text>
            </View>
            <View style={styles.menuImageWrapper}>
              <View style={styles.pickerWrapper}>
                <Picker
                  accessibilityLabel="Select Type"
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedCategory(itemValue);
                    changeFilter('category', itemValue);
                  }}>
                  <Picker.Item label={'All'} value="" />
                  {listCategory.map((element, idx) => {
                    return (
                      <Picker.Item
                        label={element.category}
                        value={element.id}
                        key={`category-${idx}`}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              changeShow('price');
            }}>
            <View style={styles.menuWrapper}>
              <View style={styles.menuText}>
                <Text style={styles.menuTextContent}>Price</Text>
              </View>
              <View style={styles.menuImageWrapper}>
                <Image
                  source={!showPicker.price ? nextIcon : downIcon}
                  resizeMethod="scale"
                  resizeMode="cover"
                  style={
                    !showPicker.price ? styles.menuImage : styles.menuImageDown
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
          {showPicker.price && (
            <View style={styles.menuImageWrapper}>
              <View style={styles.inputPriceWrapper}>
                <TextInput
                  placeholder="Min. Price"
                  keyboardType="number-pad"
                  onChange={text => {
                    const data = text.nativeEvent.text.replace(/[^0-9]/g, '');
                    if (data.length > 0) {
                      setPrice({...price, priceMin: data});
                      changeFilter('priceMin', data);
                    }
                  }}
                  style={styles.inputPrice}
                />
                <Text style={styles.inputPriceDevider}>—</Text>
                <TextInput
                  placeholder="Max. Price"
                  keyboardType="number-pad"
                  onChange={text => {
                    const data = text.nativeEvent.text.replace(/[^0-9]/g, '');
                    if (data.length > 0) {
                      setPrice({...price, priceMax: data});
                      changeFilter('priceMax', data);
                    }
                  }}
                  style={styles.inputPrice}
                />
              </View>
            </View>
          )}
          <View style={styles.menuWrapper}>
            <View style={styles.menuText}>
              <Text style={styles.menuTextContent}>Order</Text>
            </View>
            <View style={styles.menuImageWrapper}>
              <View style={styles.pickerWrapper}>
                <Picker
                  accessibilityLabel="Select Type"
                  selectedValue={selectedOrderBy}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedOrderBy(itemValue);
                    changeFilter('orderBy', itemValue);
                  }}>
                  <Picker.Item label={'Default'} value="" />
                  <Picker.Item label={'Name'} value="name" />
                  <Picker.Item label={'Price'} value="price" />
                  <Picker.Item label={'City'} value="city" />
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.menuWrapper}>
            <View style={styles.menuText}>
              <Text style={styles.menuTextContent}>Sort</Text>
            </View>
            <View style={styles.menuImageWrapper}>
              <View style={styles.pickerWrapper}>
                <Picker
                  accessibilityLabel="Select Sort"
                  selectedValue={selectedSort}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedSort(itemValue);
                    changeFilter('sort', itemValue);
                  }}>
                  <Picker.Item label={'ASC'} value="asc" />
                  <Picker.Item label={'DESC'} value="desc" />
                </Picker>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={
              !showPicker.price ? styles.btnYellow : styles.btnYellowLessMargin
            }
            onPress={() => {
              console.log('Min Max', dataFilter.priceMin, dataFilter.priceMax);
              if (dataFilter.priceMin > dataFilter.priceMax) {
                ToastAndroid.showWithGravity(
                  'Invalid Price Range',
                  ToastAndroid.LONG,
                  ToastAndroid.TOP,
                );
              } else {
                const data = {...dataFilter, page: 1};
                dispatch(changeFilerRedux(data));
                console.log('redux filter', filter, dataFilter);
                navigation.navigate('SearchVehicle');
              }
            }}>
            <Text style={styles.textBtnYellow}>Apply</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.marginLoading}>
          <ActivityIndicator size="large" color="#FFCD61" />
        </View>
      )}
    </ScrollView>
  );
};

export default SearchFilter;
