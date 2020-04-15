import React, {FC, memo} from 'react';
import ViewPager, {
  ViewPagerOnPageSelectedEventData,
} from '@react-native-community/viewpager';
import {Image, View, StyleSheet, NativeSyntheticEvent} from 'react-native';
import {Photo} from '../../model';

type ViewPagerData = NativeSyntheticEvent<ViewPagerOnPageSelectedEventData>;

interface Props {
  photos: Photo[];
  activePhotoIndex: number;
  onIndexChange: (index: number) => any;
}

const Swiper: FC<Props> = ({photos, activePhotoIndex, onIndexChange}) => {
  const onPageSelected = (data: ViewPagerData) => {
    onIndexChange(data.nativeEvent.position);
  };
  return (
    <View style={styles.container}>
      <ViewPager
        key={photos.length}
        style={styles.container}
        initialPage={activePhotoIndex}
        onPageSelected={onPageSelected}
        pageMargin={10}>
        {photos.map((image, index) => {
          return (
            <View style={styles.container} key={index}>
              <Image source={image} style={{width: '100%', height: '100%'}} />
            </View>
          );
        })}
      </ViewPager>
    </View>
  );
};

export const ImageSwiper = memo(Swiper);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
