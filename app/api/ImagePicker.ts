import ImagePicker, {
  ImagePickerOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {Photo} from '../model';

const options: ImagePickerOptions = {
  noData: true,
  mediaType: 'photo',
  storageOptions: {
    path: 'MemoBrowser',
  },
};

export const takeCameraPhoto = (): Promise<Nullable<Photo>> => {
  return new Promise(resolve =>
    ImagePicker.launchCamera(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.error) {
        const photo: Photo = {
          uri: response.uri,
          width: response.width,
          height: response.height,
        };
        resolve(photo);
      } else {
        resolve(null);
      }
    }),
  );
};

export const takeGaleryPhoto = (): Promise<Nullable<Photo>> => {
  return new Promise(resolve =>
    ImagePicker.launchImageLibrary(options, response => {
      if (!response.didCancel && !response.error) {
        const photo: Photo = {
          uri: response.uri,
          width: response.width,
          height: response.height,
        };
        resolve(photo);
      } else {
        resolve(null);
      }
    }),
  );
};
