import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {deleteHistory, searchHistory} from '../modules/utils/history';
import {useSelector} from 'react-redux';
import {ActivityIndicator, Modal} from 'react-native-paper';
import styles from '../commons/styles/History';
import modalStyle from '../commons/styles/Modals';
import CardHistory from '../commons/components/CardHistory';
import {customToast} from '../modules/helpers/toast';
import {serialize} from '../modules/helpers/serialize';

const History = ({navigation}) => {
  const user = useSelector(state => state.auth.userData);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    keyword: '',
    limit: 5,
    page: 1,
  });
  const [history, setHistory] = useState([]);

  const [selectedItem, setSelectedItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const callback = arr => {
    setSelectedItem(arr);
    console.log('arr callback', arr);
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
            }
          }}>
          <Text style={styles.paginationButton}>{i}</Text>
        </TouchableOpacity>,
      );
    }
    return elements;
  };

  useEffect(() => {
    const getHistory = () => {
      const token = user.token;
      console.log(token);
      const newFilter = '?' + serialize(filter);
      searchHistory(newFilter, token)
        .then(res => {
          console.log(res.data.data, res.data.data.length);
          setHistory(res.data.data);
          setMeta(res.data.meta);
          setSelectedItem([]);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          customToast(
            ToastAndroid,
            'Something went wrong, please try relogin.',
          );
        });
    };
    setIsLoading(true);
    getHistory();
  }, [filter, user.token]);

  return (
    <>
      {user && user.token && user.token !== '' ? (
        <>
          <ScrollView style={styles.viewScroll}>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>History Order</Text>
            </View>
            <View style={styles.subtitleWrapper}>
              <View style={styles.flex3}>
                <Text style={styles.textLeft}>History</Text>
              </View>
              {selectedItem.length > 0 ? (
                <TouchableOpacity
                  style={styles.flex1}
                  onPress={() => {
                    setShowModal(true);
                  }}>
                  <Text style={styles.textRight}>Delete</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.flex1}>
                  <Text style={styles.textRight}>Select</Text>
                </TouchableOpacity>
              )}
            </View>
            {!isLoading && history.length !== 0 ? (
              <>
                <CardHistory
                  navigation={navigation}
                  data={history}
                  callback={callback}
                />
                <View style={styles.pageWrapper}>{showPagination()}</View>
              </>
            ) : !isLoading && history.length === 0 ? (
              <Text>Please add new transaction</Text>
            ) : (
              <View style={styles.marginLoading}>
                <ActivityIndicator size="large" color="#FFCD61" />
              </View>
            )}
          </ScrollView>
        </>
      ) : (
        <>
          <ScrollView style={styles.viewScroll}>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>History Order</Text>
            </View>
            <Text style={styles.loginInfo}>
              You need to login to see history
            </Text>
            <TouchableOpacity
              style={styles.buttonYellow}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.textButtonYellow}>Login</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setShowModal(false);
        }}>
        <TouchableOpacity
          onPress={() => {
            setShowModal(false);
          }}
          style={modalStyle.modalTouchableLayout}>
          <View style={modalStyle.modalCoverMiddle}>
            <View style={modalStyle.modalContentMiddle}>
              <Text style={modalStyle.textMiddleHeader}>
                Delete History Order?
              </Text>
              <View style={modalStyle.buttonMiddleWrapper}>
                <TouchableOpacity
                  style={modalStyle.btnYellowSm}
                  onPress={() => {
                    setShowModal(false);
                    const body = {historyIds: selectedItem};
                    console.log('delete history', selectedItem, body);
                    deleteHistory(body, user.token)
                      .then(res => {
                        customToast(ToastAndroid, 'History Deleted');
                        setFilter({...filter, keyword: ''});
                      })
                      .catch(err => {
                        console.log(err);
                        customToast(ToastAndroid, 'Failed to Delete History');
                      });
                  }}>
                  <Text style={modalStyle.textBtnYellow}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={modalStyle.buttonPrimarySm}
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  <Text style={modalStyle.textBtnPrimary}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default History;
