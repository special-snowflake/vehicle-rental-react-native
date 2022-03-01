import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import styles from '../commons/styles/Home';
import {TextInput} from 'react-native-gesture-handler';
import {searchVehicle} from '../modules/utils/vehicles';
import axios from 'axios';
import {useSelector} from 'react-redux';
const imagehost = process.env.URL_API + '/vehicles';
const Home = ({navigation}) => {
  const [search, setSearch] = useState(null);
  const user = useSelector(state => state.auth.userData);
  const [listVehicles, setListVehicles] = useState({
    dataBike: [],
    dataCar: [],
    dataMotorCycle: [],
    isSuccess: false,
  });

  console.log('list vegicles', listVehicles);
  console.log('data user', user);
  useEffect(() => {
    const urlBike = searchVehicle('?keyword=&category=2&sort=asc&limit=5');
    const urlCar = searchVehicle('?keyword=&category=1&sort=asc&limit=5');
    const urlMotorCycle = searchVehicle(
      '?keyword=&category=3&sort=asc&limit=5',
    );
    axios
      .all([urlBike, urlCar, urlMotorCycle])
      .then(
        axios.spread((...responses) => {
          setListVehicles({
            dataBike: responses[0].data.data,
            dataCar: responses[1].data.data,
            dataMotorCycle: responses[2].data.data,
            isSuccess: true,
          });
        }),
      )
      .catch(err => {
        console.log('error', err);
      });
  }, []);
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.jumboTronWrapper}>
        <ImageBackground
          source={require('../commons/assets/images/background-home.png')}
          style={styles.jumboTron}
        />
        <TextInput
          style={styles.inputSearch}
          placeholder="Search vehicle"
          placeholderTextColor="#FFFFFF"
          onChange={text => {
            setSearch(text.nativeEvent.text);
          }}
        />
        <TouchableOpacity
          style={styles.searchLogo}
          onPress={navigation.navigate('SearchVehicle', search)}>
          <Image
            source={require('../commons/assets/icons/search.png')}
            style={{width: 25, height: 25}}
            // style={styles.searchLogo}
          />
        </TouchableOpacity>
        {user.roles && user.roles === 'owner' ? (
          <TouchableOpacity
            style={styles.addNewItem}
            onPress={() => {
              console.log('go to AddNewItem');
              // navigation.navigate('AddNewItem');
            }}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
              Add new item
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <View>
        {listVehicles.isSuccess ? (
          <>
            <View style={styles.cardWrapper}>
              <View style={styles.headerWrapper}>
                <Text style={styles.itemHeader}>Cars</Text>
                <Text
                  style={styles.more}
                  onPress={() => {
                    navigation.navigate('VehicleCategory', 'Car');
                  }}>
                  View More
                </Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {listVehicles.dataCar.map(element => {
                  return (
                    <TouchableOpacity
                      key={`car-${element.id}`}
                      onPress={() => {
                        navigation.navigate('DetailVehicle', element.id);
                      }}>
                      <Image
                        source={{uri: imagehost + element.image}}
                        style={styles.cardVehicles}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.cardWrapper}>
              <View style={styles.headerWrapper}>
                <Text style={styles.itemHeader}>Motorbike</Text>
                <Text
                  style={styles.more}
                  onPress={() => {
                    navigation.navigate('VehicleCategory', 'Motorbike');
                  }}>
                  View More
                </Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {listVehicles.dataMotorCycle.map(element => {
                  return (
                    <TouchableOpacity
                      key={`motor-${element.id}`}
                      onPress={() => {
                        navigation.navigate('DetailVehicle', element.id);
                      }}>
                      <Image
                        source={{uri: imagehost + element.image}}
                        style={styles.cardVehicles}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.cardWrapper}>
              <View style={styles.headerWrapper}>
                <Text style={styles.itemHeader}>Bike</Text>
                <Text
                  style={styles.more}
                  onPress={() => {
                    navigation.navigate('VehicleCategory', 'Bike');
                  }}>
                  View More
                </Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {listVehicles.dataBike.map(element => {
                  return (
                    <TouchableOpacity
                      key={`bike-${element.id}`}
                      onPress={() => {
                        navigation.navigate('DetailVehicle', element.id);
                      }}>
                      <Image
                        source={{uri: imagehost + element.image}}
                        style={styles.cardVehicles}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </>
        ) : (
          <View style={styles.marginLoading}>
            <ActivityIndicator size="large" color="#FFCD61" />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
