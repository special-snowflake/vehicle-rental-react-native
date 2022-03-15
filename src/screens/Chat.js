import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from '../commons/styles/Chat';
const Chat = ({navigation}) => {
  return (
    <>
      <ScrollView style={styles.scrollView}>
        <TextInput style={styles.searchInput} placeholder="Search Chat" />
        <View>
          <TouchableOpacity
            style={styles.chatListWrapper}
            onPress={() => {
              navigation.navigate('ChatDetail');
            }}>
            <View style={styles.chatWrapper}>
              <Text style={styles.userName}>User 1</Text>
              <Text style={styles.fs15}>Just now</Text>
            </View>
            <View style={styles.previewWrapper}>
              <Text style={styles.previewText}>
                Hey, there are 3 vespa left
              </Text>
              <View style={styles.indicatorChat}>
                <Text>2</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatListWrapper}>
            <View style={styles.chatWrapper}>
              <Text style={styles.fs15}>User 2</Text>
              <Text style={styles.fs15}>Yesterday</Text>
            </View>
            <View style={styles.previewWrapper}>
              <Text style={styles.fs15}>Hey, there are 2 vespa left</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.endOfList}>You have no conversation left</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default Chat;
