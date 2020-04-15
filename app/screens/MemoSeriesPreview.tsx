import React, {FC, useEffect, useState, useCallback} from 'react';
import {ImageSwiper} from '../components/ImageSwpier/ImageSwiper';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import BottomMenuBar from '../components/ImageSwpier/ImageSwiperBottomBar';
import {MemoDescriptionTextInput} from '../components/TextInputs/MemoDescriptionTextInput';
import * as ImagePicker from '../api/ImagePicker';
import {useDispatch} from 'react-redux';
import {addMemo} from '../store/index';
import {Color} from '../config/ColorTheme';
import {IconButton} from '../components/Buttons/IconButton';
import {Photo} from '../model';
import {appStrings} from '../config/Strings';
import {useNavigation} from '@react-navigation/native';

export const MemoSeriesPreview: FC = props => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [modalActive, setModalActive] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardSub = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );
    return () => {
      keyboardSub && keyboardSub.remove();
    };
  });

  const deletePhoto = () => {
    if (photos.length !== 0) {
      const photosLength = photos.length;
      setPhotos([...photos.filter((item, index) => index !== activeIndex)]);
      setActiveIndex(
        activeIndex === photosLength - 1 ? activeIndex - 1 : activeIndex,
      );
    }
  };

  navigation.setOptions({
    headerRight: () => (
      <IconButton
        onPress={deletePhoto}
        style={styles.headerButton}
        iconName={'md-trash'}
        iconSize={30}
        color={Color.onPrimary}
      />
    ),
  });

  const keyboardDidHide = () => {
    if (modalActive) {
      setModalActive(false);
    }
  };

  const updatePhotoAndIndex = (photo: Photo) => {
    const newPhotos = [...photos, photo];
    setPhotos(newPhotos);
    setActiveIndex(newPhotos.length - 1);
  };

  const takeCameraPhoto = useCallback(async () => {
    const photo = await ImagePicker.takeCameraPhoto();
    if (photo) {
      updatePhotoAndIndex(photo);
    }
  }, [photos]);

  const takeGaleryPhoto = useCallback(async () => {
    const photo = await ImagePicker.takeGaleryPhoto();
    if (photo) {
      updatePhotoAndIndex(photo);
    }
  }, [photos]);

  const handleConfirmButton = useCallback(() => {
    dispatch(addMemo(descriptionText, photos));
    navigation.goBack();
  }, [photos]);

  const handleSwipe = (index: number) => {
    setActiveIndex(index);
  };

  const addDesctiption = useCallback(() => {
    setModalActive(true);
  }, []);

  const onDescriptionTextChange = (text: string) => {
    setDescriptionText(text);
  };

  const onDescriptionAccept = () => {
    setModalActive(false);
  };

  const noPhotoContent = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text adjustsFontSizeToFit={true}>
          {appStrings.emptyPhotoSeriesLabel}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {photos.length === 0 ? (
          noPhotoContent()
        ) : (
          <ImageSwiper
            photos={photos}
            activePhotoIndex={activeIndex}
            onIndexChange={handleSwipe}
          />
        )}
      </View>
      <BottomMenuBar
        iconSize={30}
        addCameraPhotoPress={takeCameraPhoto}
        addGaleryPhotoPress={takeGaleryPhoto}
        addDescriptionPress={addDesctiption}
        donePress={handleConfirmButton}
        doneButtonActive={photos.length !== 0}
      />
      <Modal
        animated
        animationType="slide"
        hardwareAccelerated={true}
        visible={modalActive}
        onRequestClose={() => setModalActive(false)}>
        <MemoDescriptionTextInput
          visible={modalActive}
          text={descriptionText}
          onTextChange={onDescriptionTextChange}
          onAccept={onDescriptionAccept}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    padding: 4,
    marginRight: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
});
