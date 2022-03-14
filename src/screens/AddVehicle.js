import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';

import {getCategory} from '../modules/utils/category';
import {getCity} from '../modules/utils/city';

import styles from '../commons/styles/AddVehicle';
import modalStyle from '../commons/styles/Modals';
import {useSelector} from 'react-redux';
import {addVehicleFetch} from '../modules/utils/vehicles';

const defaultImage = require('../commons/assets/images/car-default.jpg');

const AddVehicle = ({navigation}) => {
  const user = useSelector(state => state.auth.userData);
  const [listCategory, setListCategory] = useState(null);
  const [listCity, setListCity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isAllowedToSubmit, setIsAllowedToSubmit] = useState(false);

  const [image, setImage] = useState(defaultImage);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [stock, setStock] = useState(1);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => {
            navigation.navigate('Home1');
          }}>
          <Text style={{fontSize: 16}}>Cancel</Text>
        </TouchableOpacity>
      ),
    });
  });

  const options = {
    storageOptions: {
      path: 'images',
      mediaType: 'photo',
    },
    includeBase64: false,
  };
  const openImageLibrary = () => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setSelectedImage(response.assets[0]);
        const source = {uri: response.assets[0].uri};
        setImage(source);
      }
    });
  };
  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('permission camera:', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      launchCamera(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          setSelectedImage(response.assets[0]);
          const source = {uri: response.assets[0].uri};
          setImage(source);
        }
      });
    }
  };

  const handleSubmit = () => {
    setIsFetching(true);
    const body = new FormData();
    body.append('images', {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName,
    });
    console.log(
      'images',
      selectedImage.uri,
      selectedImage.type,
      selectedImage.fileName,
    );
    body.append('name', name);
    body.append('price', price);
    body.append('city_id', selectedCity);
    body.append('category_id', selectedCategory);
    body.append('stock', stock);
    body.append('status', 'Available');
    console.log('body', body);
    addVehicleFetch(body, user.token)
      .then(res => {
        setIsFetching(false);
        console.log('success', res);
        if (res.ok) {
          return res.json();
        }
      })
      .then(response => {
        console.log('hasil akhir', response);
        navigation.navigate('DetailVehicle', response.data.id);
      })
      .catch(e => {
        setIsFetching(false);
        console.log('error', e);
      })
      .done();
    console.log(
      name,
      price,
      selectedImage,
      description,
      selectedCity,
      selectedCategory,
      stock,
    );
  };

  useEffect(() => {
    if (
      name !== null &&
      name !== '' &&
      price !== null &&
      price !== '' &&
      selectedImage !== null &&
      description !== null &&
      description !== '' &&
      selectedCity !== null &&
      selectedCategory !== null &&
      stock !== null
    ) {
      setIsAllowedToSubmit(true);
    } else {
      setIsAllowedToSubmit(false);
    }
  }, [
    name,
    price,
    selectedImage,
    description,
    selectedCity,
    selectedCategory,
    stock,
  ]);

  useEffect(() => {
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
          <View style={styles.addImageWrapper}>
            <Image source={image} style={styles.addImage} />
            <TouchableOpacity
              style={styles.buttonBlack}
              onPress={() => {
                // openCamera();
                setShowModal(true);
              }}>
              <Text style={styles.textButton}>Add Picture</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Type Product Name min. 30 characters"
              style={styles.inputCenter}
              onChange={text => {
                setName(text.nativeEvent.text);
              }}
            />
            <TextInput
              placeholder="Type product price"
              style={styles.inputCenter}
              onChange={text => {
                setPrice(text.nativeEvent.text);
              }}
            />
          </View>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            placeholder="Type Product Description Max 150 characters"
            style={{...styles.inputCenter, ...styles.inputTextLeft}}
            onChange={text => {
              setDescription(text.nativeEvent.text);
            }}
          />
          <Text style={styles.label}>Location:</Text>

          <TouchableOpacity style={styles.pickerWrapper}>
            <Picker
              accessibilityLabel="Select Location"
              selectedValue={selectedCity}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedCity(itemValue);
              }}>
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
          </TouchableOpacity>

          <Text style={styles.label}>Add to:</Text>
          <TouchableOpacity style={styles.pickerWrapper}>
            <Picker
              accessibilityLabel="Choose Category"
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedCategory(itemValue);
              }}>
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
          </TouchableOpacity>
          <View style={styles.stockWrapper}>
            <Text style={{...styles.label, ...styles.stock}}>Stock:</Text>
            <View style={styles.counterWrappper}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => {
                  if (stock > 1) {
                    setStock(stock - 1);
                  }
                }}>
                <Text style={styles.counterBtnText}>—</Text>
              </TouchableOpacity>
              <Text style={styles.counterText}>{stock}</Text>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => {
                  setStock(stock + 1);
                }}>
                <Text style={styles.counterBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={isAllowedToSubmit ? styles.buttonYellow : styles.buttonGrey}>
            {isFetching ? (
              <ActivityIndicator
                size="small"
                color="#393939"
                style={{marginVertical: 3}}
              />
            ) : (
              <Text
                style={styles.textButtonYellow}
                onPress={() => {
                  isAllowedToSubmit && handleSubmit();
                }}>
                Save Product
              </Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.marginLoading}>
          <ActivityIndicator size="large" color="#FFCD61" />
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setShowModal(false);
        }}>
        <View style={modalStyle.modalCoverBottom}>
          <View style={modalStyle.modalContentBottom}>
            <View style={modalStyle.buttonWrapper}>
              <TouchableOpacity
                style={modalStyle.buttonPrimary}
                onPress={() => {
                  openCamera();
                  setShowModal(false);
                }}>
                <Text style={modalStyle.textBtnPrimary}>Use Camera</Text>
              </TouchableOpacity>
            </View>
            <View style={modalStyle.buttonWrapper}>
              <TouchableOpacity
                style={modalStyle.buttonPrimary}
                onPress={() => {
                  openImageLibrary();
                  setShowModal(false);
                }}>
                <Text style={modalStyle.textBtnPrimary}>
                  Choose From Gallery
                </Text>
              </TouchableOpacity>
            </View>
            <View style={modalStyle.buttonWrapper}>
              <TouchableOpacity
                style={modalStyle.buttonSecondary}
                onPress={() => {
                  setShowModal(false);
                }}>
                <Text style={modalStyle.textBtnSecondary}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AddVehicle;
