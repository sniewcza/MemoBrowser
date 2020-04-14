package com.memobrowser.modules.localAuth;

import android.app.Activity;
import android.app.KeyguardManager;
import android.content.Intent;
import android.os.Build;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import androidx.annotation.NonNull;

public class LocalAuthModule extends ReactContextBaseJavaModule {
    private  Promise mPromise;
    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener(){
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if(requestCode == 2){
                if(resultCode == Activity.RESULT_OK){
                    mPromise.resolve(true);
                }
                else{
                    mPromise.resolve(false);
                }
            }
        }
    };
    public LocalAuthModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @NonNull
    @Override
    public String getName() {
        return "LocalAuthModule";
    }

    @ReactMethod
    public void isServiceAvailable(Promise promise){

        final ReactApplicationContext context = getReactApplicationContext();
        KeyguardManager m = (KeyguardManager) context.getSystemService(context.KEYGUARD_SERVICE);

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
            promise.resolve(m.isDeviceSecure());
        }else {
            promise.resolve(false);
        }

    }
    @ReactMethod
    public void authorize(String title ,Promise promise){
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            mPromise = promise;
            final ReactApplicationContext context = getReactApplicationContext();
            KeyguardManager m = (KeyguardManager) context.getSystemService(context.KEYGUARD_SERVICE);
            Intent authIntent = m.createConfirmDeviceCredentialIntent(title, null);
            context.getCurrentActivity().startActivityForResult(authIntent, 2, null);
        }
    }
}
