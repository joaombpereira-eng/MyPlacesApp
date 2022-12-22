import {StyleSheet, View} from 'react-native';
import {Colors} from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';
import GetLocation from 'react-native-get-location';

export default function LocationPicker() {
  async function getLocationHandler() {
    const location = await GetLocation.getCurrentPosition();
    console.log(location);
  }

  function pickOnMaphandler() {}

  return (
    <View>
      <View style={styles.mapPreview}></View>
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
});
