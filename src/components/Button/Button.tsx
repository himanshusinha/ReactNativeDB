import React, { FC } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  DimensionValue,
} from 'react-native';
import { ButtonProps } from '../../types';

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  width = 150,
  backgroundColor = 'black',
  padding = 15,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: width as DimensionValue, backgroundColor, padding },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
