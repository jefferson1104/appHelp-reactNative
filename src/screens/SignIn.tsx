import { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { colors } = useTheme();

  function handleSignIn() {
    // verifica se os campos estão vazios
    if (!email || !password) {
      return Alert.alert('SignIn', 'Enter email and password.');
    }

    // ativa o estado de loading para verdadeiro
    setIsLoading(true);

    // autenticação via email e password com captura de erro
    auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log(error);
      setIsLoading(false);

      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert('SignIn Error', 'Invalid email format.')
          break;
        case 'auth/wrong-password':
          Alert.alert('SignIn Error', 'Invalid email or password.')
          break;
        case 'auth/user-not-found':
          Alert.alert('SignIn Error', 'unregistered user.')
          break;
        default:
          Alert.alert('SignIn Error', 'unexpected error, try again later')
      }

    });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acess your account
      </Heading>

      <Input 
        mb={4}
        placeholder="E-Mail" 
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setEmail}
      />
      <Input 
        mb={8}
        placeholder="Password" 
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button 
        title="SignIn" 
        w="full"
        onPress={handleSignIn} 
        isLoading={isLoading}
      />
    </VStack>
  );
}
