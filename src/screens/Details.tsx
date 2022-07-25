import React, { useEffect, useState } from 'react';
import { HStack, Text, VStack, useTheme, ScrollView, Box } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard } from 'phosphor-react-native';
import { Alert } from 'react-native';

import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';

import { Header } from '../components/Header';
import { OrderProps } from '../components/Order';
import { Loading } from '../components/Loading';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const { orderId } = route.params as RouteParams;

  function handleOrderClose() {
    if (!solution) {
      return Alert.alert('Order Error', 'Inform the solution to close the order.')
    }

    // atualizando order no firestore
    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .update({
      status: 'closed',
      solution,
      closed_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Order', 'Order closed successfully.');
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('Order Error', 'Unable to close order.');
    });
  }

  useEffect(() => {
    // pegando a order exata no firestore filtrando pelo orderId
    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .get()
    .then((doc) => {

      // desestruturando os dados do order encontrado no firestore
      const { 
        patrimony, 
        description, 
        status, 
        created_at, 
        closed_at, 
        solution 
      } = doc.data();

      // formatando data para data de closed_at caso exista
      const closed = closed_at ? dateFormat(closed_at) : null;

      // salvando os dados no state order
      setOrder({
        id: doc.id,
        patrimony,
        description,
        status,
        solution,
        when: dateFormat(created_at),
        closed
      });
    })

    setLoading(false)
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Order" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {
          order.status === 'closed'
            ? <CircleWavyCheck size={22} color={colors.green[300]} />
            : <Hourglass size={22} color={colors.secondary[700]} />
        }

        <Text
          fontSize="sm"
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform="uppercase"
        >
          {order.status === 'closed' ? 'finished' : 'in progress'}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails 
          title='equipment'
          description={`Patrimony ${order.patrimony}`}
          icon={DesktopTower} 
          footer={order.when}
        />

        <CardDetails 
          title='problem description'
          description={order.description}
          icon={Clipboard}          
        />

        <CardDetails 
          title='Solution'
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Finished in ${order.closed}`}    
        >
          {
            order.status === 'open' && 
              <Input 
                h={24}
                placeholder='solution description'
                onChangeText={setSolution}
                textAlignVertical="top"
                multiline
              />
          }
        </CardDetails>
      </ScrollView>

      {
        order.status === 'open' && 
          <Button 
            title="Close order" 
            m={5} 
            onPress={handleOrderClose}
          />
      }
    </VStack>
  );
}