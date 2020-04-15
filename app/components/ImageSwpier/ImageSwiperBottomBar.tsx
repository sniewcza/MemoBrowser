import React, {FC, memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Color} from '../../config/ColorTheme';
import {IconButton} from '../Buttons/IconButton';

interface Props {
  iconSize?: number;
  doneButtonActive: boolean;
  addCameraPhotoPress: () => void;
  addGaleryPhotoPress: () => void;
  addDescriptionPress: () => void;
  donePress: () => void;
}

const DEFAULT_ICON_SIZE = 30;

const ImageSwiperBottomBar: FC<Props> = ({
  iconSize,
  doneButtonActive,
  addCameraPhotoPress,
  addDescriptionPress,
  addGaleryPhotoPress,
  donePress,
}) => {
  return (
    <View style={styles.container}>
      <IconButton
        onPress={addCameraPhotoPress}
        iconName={'md-camera'}
        iconSize={iconSize || DEFAULT_ICON_SIZE}
        color={Color.onPrimary}
      />
      <IconButton
        onPress={addGaleryPhotoPress}
        iconName={'md-image'}
        iconSize={iconSize || DEFAULT_ICON_SIZE}
        color={Color.onPrimary}
      />
      <IconButton
        onPress={addDescriptionPress}
        style={doneButtonActive ? null : styles.inAcvtive}
        disabled={!doneButtonActive}
        iconName={'md-create'}
        iconSize={iconSize || DEFAULT_ICON_SIZE}
        color={Color.onPrimary}
      />
      <IconButton
        onPress={donePress}
        style={doneButtonActive ? null : styles.inAcvtive}
        disabled={!doneButtonActive}
        iconName={'md-checkmark'}
        iconSize={iconSize || DEFAULT_ICON_SIZE}
        color={Color.onPrimary}
      />
    </View>
  );
};

export default memo(ImageSwiperBottomBar);
const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    width: '100%',
    backgroundColor: Color.primary,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  inAcvtive: {
    opacity: 0.4,
  },
});
