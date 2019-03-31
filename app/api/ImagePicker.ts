import ImagePicker from 'react-native-image-picker';

class ImagePickerService {
    private options = {
        noData: true, mediaType: 'photo', storageOptions: {
            path: "MemoBrowser",
        }

    }

    public takeCameraPhoto(): Promise<any> {
        return new Promise(resolve =>
            ImagePicker.launchCamera(this.options, response => {
                if (!response.didCancel && !response.error) {
                    resolve(response)
                }
                else {
                    resolve(null)
                }
            }))
    }

    public takeGaleryPhoto(): Promise<any> {
        return new Promise(resolve =>
            ImagePicker.launchImageLibrary(this.options, response => {
                if (!response.didCancel && !response.error) {
                    resolve(response)
                }
                else {
                    resolve(null)
                }
            }))
    }
}

export default new ImagePickerService()