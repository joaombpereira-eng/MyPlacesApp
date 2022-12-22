import {useState} from 'react';
import {
  View,
  Alert,
  PermissionsAndroid,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {Colors} from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';

export default function ImagePicker() {
  const [pickedImage, setPickedImage] = useState();

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
      setPickedImage(image.assets[0].uri);
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{uri: pickedImage}} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});
