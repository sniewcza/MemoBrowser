import ImagePicker from 'react-native-image-picker';
import { Photo } from "../model"

interface Options {
    title?: string;
    cancelButtonTitle?: string;
    takePhotoButtonTitle?: string;
    chooseFromLibraryButtonTitle?: string;
    customButtons?: Array<CustomButtonOptions>;
    cameraType?: 'front' | 'back';
    mediaType?: 'photo' | 'video' | 'mixed';
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    videoQuality?: 'low' | 'medium' | 'high';
    durationLimit?: number;
    rotation?: number;
    allowsEditing?: boolean;
    noData?: boolean;
    storageOptions?: StorageOptions;
}

interface StorageOptions {
    skipBackup?: boolean;
    path?: string;
    cameraRoll?: boolean;
    waitUntilSaved?: boolean;
}

interface CustomButtonOptions {
    name?: string;
    title?: string;
}

interface Response {
    customButton: string;
    didCancel: boolean;
    error: string;
    data: string;
    uri: string;
    origURL?: string;
    isVertical: boolean;
    width: number;
    height: number;
    fileSize: number;
    type?: string;
    fileName?: string;
    path?: string;
    latitude?: number;
    longitude?: number;
    timestamp?: string;
}

class ImagePickerService {
    private options: Options = {
        noData: true, mediaType: 'photo', storageOptions: {
            path: "MemoBrowser",
        }
    }

    public takeCameraPhoto(): Promise<Photo | null> {
        return new Promise(resolve =>
            ImagePicker.launchCamera(this.options, (response: Response) => {
                if (!response.didCancel && !response.error) {
                    const photo: Photo = {
                        uri: `file:///${response.path}`,
                        width: response.width,
                        height: response.height
                    }
                    resolve(photo)
                }
                else {
                    resolve(null)
                }
            }))
    }

    public takeGaleryPhoto(): Promise<Photo | null> {
        return new Promise(resolve =>
            ImagePicker.launchImageLibrary(this.options, response => {
                if (!response.didCancel && !response.error) {
                    const photo: Photo = {
                        uri: `file:///${response.path}`,
                        width: response.width,
                        height: response.height
                    }
                    resolve(photo)
                }
                else {
                    resolve(null)
                }
            }))
    }
}

export default new ImagePickerService()