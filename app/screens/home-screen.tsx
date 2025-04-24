import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { RootStackParamList, todoProps } from '../../nav-types/types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [todos, setTodos] = useState<todoProps[]>([]);

  const API_BASE_URL = Platform.OS === 'android' ? 'http://192.168.1.36:3000' : 'http://localhost:3000';

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      fetchTodos();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (todo: todoProps) => {
    navigation.navigate('Add Task', { todo });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/images/one.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Tasks and button take the other half */}
      <View style={styles.contentWrapper}>
        <Text style={styles.hero}>Available Tasks</Text>
        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.task}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>

              <View style={styles.iconRow}>
                <TouchableOpacity
                  onPress={() => handleEdit(item)}
                  style={styles.iconButton}
                >
                  <MaterialIcons name="edit" size={24} color="#4295c8" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item._id)}
                  style={styles.iconButton}
                >
                  <MaterialIcons name="delete" size={24} color="#c44242" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Add Task', {})}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8ebf7',
  },

  imageWrapper: {
    flex: 0.4, // Half the screen height
    width: '100%', // Full width
  },
  image: {
    width: '100%', // Full width of container
    height: '100%', // Full height of wrapper
  },

  contentWrapper: {
    flex: 0.5, // half of the screen
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  hero: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },

  task: {
    flexDirection: 'row',
    backgroundColor: '#f0f4f8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#63b8ed',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskInfo: { flex: 1, marginRight: 10 },
  taskTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 2 },
  iconRow: { flexDirection: 'row' },
  iconButton: { marginLeft: 15 },
  button: {
    backgroundColor: '#4295c8',
    paddingVertical: 12,
    // paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: -12
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});

export default HomeScreen;