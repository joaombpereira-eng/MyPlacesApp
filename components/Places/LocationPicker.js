import {StyleSheet, View, Image, Text} from 'react-native';
import {Colors} from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';
import GetLocation from 'react-native-get-location';
import {useEffect, useState} from 'react';
import {getMapPreview} from '../../util/location';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/core';

export default function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  async function getLocationHandler() {
    const location = await GetLocation.getCurrentPosition();
    setPickedLocation({
      lat: location.latitude,
      lng: location.longitude,
    });
  }

  function pickOnMaphandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}
      />
    );
    console.log(getMapPreview(pickedLocation.lat, pickedLocation.lng));
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMaphandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});
