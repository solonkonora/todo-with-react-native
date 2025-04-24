import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../nav-types/types';

type LandingProps = NativeStackScreenProps<RootStackParamList, 'Landing'>;

const LandingPage: React.FC<LandingProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Your Every Day Tasks Board</Text>

      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/images/two.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 40,
  },
  image: {
    width: 320,
    height: 260,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#4295c8',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 30,
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LandingPage;