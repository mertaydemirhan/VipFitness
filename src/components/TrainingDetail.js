import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const TrainingDetail = (props) => {
    console.log("PROPSLAR GELİYOOOOOOOOOORRR......"+ props.name);
  return (
    <View>
      <Text>{props.name}</Text>
     </View>
  );
}
const styles = StyleSheet.create({});

export default TrainingDetail;
