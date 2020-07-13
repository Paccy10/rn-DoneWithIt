import React, { useState, useEffect, Fragment } from 'react';
import { StyleSheet, FlatList, Platform, View } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';
import AppButton from '../components/Button';
import colors from '../config/colors';
import routes from '../navigation/routes';

import listingsApi from '../api/listings';
import AppText from '../components/Text';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';

const Listings = ({ navigation }) => {
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingsApi.getListings
  );

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      {error ? (
        <Fragment>
          <View style={styles.error}>
            <AppText>Couldn't retrieve the listings.</AppText>
            <AppButton title='Retry' onPress={loadListings} />
          </View>
        </Fragment>
      ) : (
        <Fragment>
          <ActivityIndicator visible={loading} />
          <FlatList
            data={listings}
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                subTitle={`$${item.price}`}
                imageUrl={item.images[0].url}
                onPress={() =>
                  navigation.navigate(routes.LISTING_DETAILS, item)
                }
              />
            )}
          />
        </Fragment>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: Platform.OS === 'android' ? 10 : 20,
    backgroundColor: colors.light,
  },
  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Listings;
