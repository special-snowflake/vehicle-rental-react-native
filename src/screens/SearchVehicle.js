import {View, Text} from 'react-native';
import React, {useState} from 'react';

const SearchVehicle = ({navigation, keyword}) => {
  const [list, setList] = useState([]);
  const [meta, setMeta] = useState(null);
  const [filter, setFilter] = useState({
    keyword: keyword || '',
    limit: 5,
    page: 1,
  });
  console.log(filter);
  return (
    <View>
      <Text>SearchVehicle</Text>
    </View>
  );
};

export default SearchVehicle;
