import React, {FC} from 'react';
import {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  StyleProp,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  iconName: string;
  iconSize: number;
  color: string;
  onPress: () => any;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const IconButton: FC<Props> = props => {
  return Platform.OS == 'android' ? (
    <IconButtonAndroid {...props} />
  ) : (
    <IconButtonIos {...props} />
  );
};

const IconButtonAndroid: FC<Props> = props => {
  const {onPress, disabled, style, iconName, iconSize, color} = props;
  return (
    <TouchableNativeFeedback
      hitSlop={{top: 50, bottom: 50, right: 50, left: 50}}
      onPress={onPress}
      disabled={disabled}
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      useForeground>
      <View style={style}>
        <Icon name={iconName} size={iconSize} color={color} />
      </View>
    </TouchableNativeFeedback>
  );
};

const IconButtonIos: FC<Props> = ({
  onPress,
  disabled,
  style,
  iconName,
  iconSize,
  color,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={style}>
        <Icon name={iconName} size={iconSize} color={color} />
      </View>
    </TouchableOpacity>
  );
};
