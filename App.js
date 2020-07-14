import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';

import AuthNavigator from './app/navigation/AuthNavigator';
import theme from './app/navigation/theme';
import AppNavigator from './app/navigation/AppNavigator';
import OfflineNotice from './app/components/OfflineNotice';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import { navigationRef } from './app/navigation/rootNavigation';

export default function App() {
  const [user, setUser] = useState();
  const [isready, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isready)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={theme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
