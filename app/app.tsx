import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home-screen';
import AddTaskScreen from './screens/add-task';

// Define the parameter list for the stack
export type RootStackParamList = {
  'Home': undefined; // No parameters for Home
  'Add Task': undefined; // No parameters for Add Task
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Task" component={AddTaskScreen} />
      </Stack.Navigator>
  );
};

export default App;