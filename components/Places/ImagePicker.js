import {Button, View, Alert, PermissionsAndroid} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

export default function ImagePicker() {
  requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (e) {
        console.warn(e);
        return false;
      }
    } else return true;
  };

  requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (e) {
        console.warn(e);
        Alert.alert('Write permission err', e);
      }
      return false;
    } else return true;
  };

  async function takeImageHandler() {
    const isCameraPermitted = await this.requestCameraPermission();
    const isStoragePermitted = await this.requestExternalWritePermission();

    if (isCameraPermitted && isStoragePermitted) {
      const image = await launchCamera({
        maxWidth: 540,
        maxHeight: 960,
        quality: 0.5,
      });
      console.log(image);
    }
  }

  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}
