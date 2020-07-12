import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import AppText from '../components/Text';
import { ListItem } from '../components/lists';
import colors from '../config/colors';
import Screen from '../components/Screen';

const ListingDetails = ({ route }) => {
  const listing = route.params;
  return (
    <Screen>
      <Image style={styles.image} source={listing.image} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>${listing.price}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require('../assets/mosh.jpg')}
            title='Fabrice Manzi'
            subTitle='5 Listings'
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetails;
