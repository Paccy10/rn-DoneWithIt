import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useNetInfo } from '@react-native-community/netinfo';

import AppText from './Text';
import colors from '../config/colors';

const OfflineNotice = () => {
  const netInfo = useNetInfo();

  if (netInfo.type !== 'unkown' && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>No Internet Connection</AppText>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 40,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    top: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
  },
});

export default OfflineNotice;
