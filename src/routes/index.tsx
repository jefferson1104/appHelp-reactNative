import { NavigationContainer } from '@react-navigation/native';

import { useAuthContext } from '../contexts/AuthContext';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { Loading } from '../components/Loading';

export function Routes() {
  const { loading, isAuthenticated } = useAuthContext();

  if (loading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}