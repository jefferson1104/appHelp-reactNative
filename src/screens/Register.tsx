import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';


export function Register() {
  const [loading, setLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert('Register Error', 'Filling in all fields is mandatory.');
    }

    setLoading(true);

    // gravando dados no firestore
    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Request', 'Order registered successfully.');
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      return Alert.alert('Request Error', 'Unable to register order')
    })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="New order" />
      <Input 
        placeholder="Patrimony number"
        mt={4}
        onChangeText={setPatrimony}
      />
      <Input 
        placeholder="Problem description"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />
      <Button 
        title="Register"
        mt={5}
        isLoading={loading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}
