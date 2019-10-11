import { NativeModules } from "react-native"

//sync this interface with exposed @ReactMethods from LocalAuthModule.java
interface localAuthModule {
    isServiceAvailable: () => Promise<boolean>
    authorize: (title?: string) => Promise<boolean>
}
const localAuthModule: localAuthModule = NativeModules.LocalAuthModule;

export const isDeviceSecured = () => {
    return localAuthModule.isServiceAvailable()
}

export const authorize = (title?: string) => {
    return localAuthModule.authorize(title)
}