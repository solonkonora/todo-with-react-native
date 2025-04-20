import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home-screen';
import AddTaskScreen from './screens/add-task';
import LandingPage from './screens/landing';
import type { RootStackParamList} from '../nav-types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Task" component={AddTaskScreen} />
      </Stack.Navigator>
  );
}

