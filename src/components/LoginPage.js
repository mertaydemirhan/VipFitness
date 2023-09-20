import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {withNavigation} from 'react-navigation'
import axios from 'axios';

import Trainigs from '../components/TrainingList'


export default function App(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [errorText, setErrorText] = useState(null);

  const apiUrl = 'http://vipfitness.mertay.me/Authentication/login';



  async function authenticate(username, password) {
    try {
      const response = await axios.post(
        apiUrl,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            // 'Content-Type': 'application/json',
          },
        }
      );
  
      let statusCode = response.status;
      let success = response.data.success;
  
      if (success) {
        console.log(response.data.message);
        setErrorText(null);
        setIsLoggedIn(true);
        return true;
      } else {
        console.log(response.data.message);
        setErrorText("Kullanıcı adı veya şifre hatalı");
        setIsLoggedIn(false);
        return false;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error('Yetkisiz Giriş:', error.response.status);
        } else {
          console.error('Sunucu hatası:', error.response.status);
          console.error('Hata mesajı:', error.response.data.message);
        }
      } else if (error.request) {
        console.error('İstek hatası:', error.request);
      } else {
        console.error('Bilinmeyen hata:', error.message);
      }
      setErrorText("Kullanıcı adı veya şifre hatalı");
      setIsLoggedIn(false);
      return false;
    }
  }

  

  const handleLogin = async () => {
    const result = await authenticate(username, password);
    if (result) {
      setErrorText(null);
      setIsLoggedIn(true);
      props.navigation.navigate('Trainigs',{User: username}) //,{ User : username }
    } else {
      setErrorText("Kullanıcı adı veya şifre hatalı");
      setIsLoggedIn(false);
    }
  };


  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        {isLoggedIn ? (
          <View style={styles.loggedInContainer}>
            <Text style={styles.loggedInText}>Giriş Başarılı!</Text>
            <Button title="Çıkış Yap" onPress={handleLogout} />
          </View>
        ) : (
          <View style={styles.loginContainer}>
            <Text style={styles.label}>Kullanıcı Adı</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <Text style={styles.label}>Şifre</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <Text style={styles.errorText}>{errorText}</Text>
            <Button title="Giriş Yap" onPress={handleLogin} />
          </View>
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff', // Arka plan rengi
  },
  loggedInContainer: {
    alignItems: 'center',
  },
  loggedInText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  loginContainer: {
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
  },
  errorText: {
    color: 'red', 
    marginBottom: 10,
  },
});



