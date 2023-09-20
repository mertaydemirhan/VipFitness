import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList,Image  } from 'react-native';
import axios from 'axios';

class Trainings extends Component {
  constructor() {
    super();

    this.state = { Trainings: [] };
  }

  componentDidMount() {
    axios.get('http://mertay.me/trainings.json')
      .then((response) => {
        this.setState({ Trainings: response.data });
      });
  }

  render() {
    var Trainings = this.state.Trainings;
    var User = this.props.navigation.state.params.User;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{User} Hoşgeldiniz.</Text>
        <FlatList
          data={Trainings}
          renderItem={({ item }) => (
            <View style={styles.trainingItem}>
              <Text style={styles.title}>{item.title}</Text>
              <Image
                source={{ uri: item.Url }} // Resim URL'sini kaynak olarak kullanın
                style={styles.image}
              />
              {/* Diğer bilgileri buraya ekleyebilirsiniz */}
            </View>
          )}
          keyExtractor={data => data.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  trainingItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 200, // İstenilen genişlik ve yüksekliği ayarlayabilirsiniz
    height: 200,
    alignItems: 'center',
    resizeMode: 'cover', // Resim boyutunu ve ölçeklemeyi ayarlayabilirsiniz
    marginBottom: 10,
  },
  // Diğer stilleri buraya ekleyebilirsiniz
});

export default Trainings;
