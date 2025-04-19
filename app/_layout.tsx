import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4295c8',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // Replace the default title with a custom Text component
        headerTitle: () => (
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
            Taskify with React Native
          </Text>
        ),
      }}>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="app" options={{}} />
    </Stack>
  );
}
