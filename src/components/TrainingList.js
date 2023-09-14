import React, {Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import axios from 'axios'

import TrainingDetail from '../components/TrainingDetail';

class TrainingList extends Component {
constructor() {
  super();

  this.state = { TrainingList: [] };  // başlangıç statesi atıyoruz boş olarak tanımladık.
}

  componentDidMount(){
    axios.get('http://mertay.me/trainings.json')
    .then((response) => {
      this.setState({ TrainingList: response.data }); // setState ile çektik.
    })
  }



  render() {
    var TrainList = this.state.TrainingList;
    return (
      <View style={styles.viewStyle}>
        <FlatList 
          data={TrainList} 
          renderItem={ ({item}) => { 
            return (
                <Text style={styles.textStyle}> {item.title}</Text>
            );
          }}
          keyExtractor={data => data.title}
          />
       </View>
    );
  }
}

const styles = StyleSheet.create({

  textStyle: {
    fontSize: 22,
    marginVertical: 50,
    fontWeight: 'bold'
  },
  viewStyle:{
    backgroundColor: 'gainsboro',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25
  }
});

export default TrainingList;
