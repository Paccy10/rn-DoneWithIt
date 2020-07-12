import React from 'react';
import { StyleSheet, FlatList, Platform } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors';
import routes from '../navigation/routes';

const listings = [
  {
    id: 1,
    title: 'Red Jacket for sale',
    price: 100,
    image: require('../assets/jacket.jpg'),
  },
  {
    id: 2,
    title: 'Couch in great condition',
    price: 1000,
    image: require('../assets/couch.jpg'),
  },
];

const Listings = ({ navigation }) => {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={`$${item.price}`}
            image={item.image}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: Platform.OS === 'android' ? 10 : 20,
    backgroundColor: colors.light,
  },
});

export default Listings;