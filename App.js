import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';

import Login from '../VipFitness/src/components/LoginPage';
import Trainigs from '../VipFitness/src/components/TrainingList'

const navigator = createStackNavigator(
    {
        Login: Login,
        Trainigs: Trainigs,
        
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: {
            title: 'Vip Fitness',
            headerTitleStyle: {
                textAlign: 'center', // Başlığı merkeze hizala
                flexGrow: 1, // Başlığın genişlemesine izin ver
                alignSelf: 'center', // Kendini merkeze hizala
                fontFamily: 'sans-serif',
                // Diğer stil özelliklerini buraya ekleyebilirsiniz
              }
        }
    }
);

export default createAppContainer(navigator);