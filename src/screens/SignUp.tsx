import { Box, Heading, HStack, Icon, IconButton, useTheme, VStack } from 'native-base';
import { Envelope, Key, SignOut } from 'phosphor-react-native';
import Logo from '../assets/logo_primary.svg';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const { colors } = useTheme();
  const { navigate } = useNavigation();

  function handleCreateAccount() {
    // verifica se os campos estão vazios
    if (!email || !password || !repeatPassword) {
      return Alert.alert('SignUp Error', 'Enter email, password and repeat password.');
    }

    // verifica se senha e repetir senha são iguais
    if (password !== repeatPassword) {
      return Alert.alert('SignUp Error', 'Password and repeat password are not the same.');
    }

    setLoading(true);

    // criar o usuario no firebase
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert('SignUp', 'Create account successfully.');
      navigate('signin');
    })
    .catch((error) => {
      console.log(error.code);
      setLoading(false)

      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert('SignUp Error', 'There is already a user with this email.');
          break;
        case 'auth/weak-password':
          Alert.alert('SignUp Error', 'Password must contain at least 6 characters.');
          break;
        default:
          Alert.alert('SignUp Error', 'problem creating account, try again.');
      }
    })
  }

  return (
    <>
      <Box bg="gray.600" px={4}>
        <Header title="Create your account"/>
      </Box>
      <VStack flex={1} alignItems="center" bg="gray.600" px={8}>   
        <Box mb={10} mt={5}>
          <Logo  />
        </Box>
      
        <Input
          mb={4}
          placeholder="E-Mail" 
          keyboardType="email-address"
          InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
          onChangeText={setEmail}
        />
        <Input 
          mb={4}
          placeholder="Password" 
          InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
          secureTextEntry
          onChangeText={setPassword}
        />
        <Input 
          mb={8}
          placeholder="Repeat password" 
          InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
          secureTextEntry
          onChangeText={setRepeatPassword}
        />

        <Button
          title="Create account"
          w="full"
          mb={4}
          onPress={handleCreateAccount}
          isLoading={loading}
        />
      </VStack>
    </>
  );
}