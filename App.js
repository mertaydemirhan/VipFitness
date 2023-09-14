import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';

import TrainingScreen from '../VipFitness/src/screens/TrainingScreen';

const navigator = createStackNavigator(
    {
        Trainings: TrainingScreen
    },
    {
        initialrouteName: 'Trainings',
        defaultNavigationOptions: {
            title: '                           Vip Fitness'
        }
    }
);

export default createAppContainer(navigator);