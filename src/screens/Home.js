import {View, Text, ScrollView, ImageBackground, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import styles from '../commons/styles/Home';
import {TextInput} from 'react-native-gesture-handler';
import {searchVehicle} from '../modules/utils/vehicles';
import axios from 'axios';
const imagehost = process.env.URL_API + '/vehicles';
const Home = () => {
  const [search, setSearch] = useState(null);
  const [listVehicles, setListVehicles] = useState({
    dataBike: [],
    dataCar: [],
    dataMotorCycle: [],
    isSuccess: false,
  });

  console.log('list vegicles', listVehicles);
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
    <ScrollView>
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
        <Image
          source={require('../commons/assets/icons/search.png')}
          style={styles.searchLogo}
        />
      </View>
      <View>
        {listVehicles.isSuccess && (
          <>
            <View style={styles.cardWrapper}>
              <View style={styles.headerWrapper}>
                <Text style={styles.itemHeader}>Cars</Text>
                <Text style={styles.more}>View More</Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {listVehicles.dataCar.map(element => {
                  return (
                    <Image
                      source={{uri: imagehost + element.image}}
                      style={styles.cardVehicles}
                      key={`car-${element.id}`}
                    />
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.cardWrapper}>
              <View style={styles.headerWrapper}>
                <Text style={styles.itemHeader}>Motorbike</Text>
                <Text style={styles.more}>View More</Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {listVehicles.dataMotorCycle.map(element => {
                  return (
                    <Image
                      source={{uri: imagehost + element.image}}
                      style={styles.cardVehicles}
                      key={`motor-${element.id}`}
                    />
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.cardWrapper}>
              <View style={styles.headerWrapper}>
                <Text style={styles.itemHeader}>Bike</Text>
                <Text style={styles.more}>View More</Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {listVehicles.dataBike.map(element => {
                  return (
                    <Image
                      source={{uri: imagehost + element.image}}
                      style={styles.cardVehicles}
                      key={`bike-${element.id}`}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
